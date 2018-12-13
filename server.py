from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, String, LargeBinary, DateTime, Integer, Numeric, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from image_processing import process_image
import datetime
from time import time
import base64
import io
import matplotlib.image as matimage
from PIL import Image
from io import BytesIO
from validation import validate, second_validation
import numpy as np
from flask_cors import CORS
from histogram import get_histogram
"""
File name: server.py 
Main: this is the server.py file to build the entire image 
processing project. 
Date: Dec 9th 2018 
"""

app = Flask(__name__)
engine = create_engine("postgresql://hw188:{0}@localhost:5432/bme590finalproject".format('123456'), max_overflow=20,
                       client_encoding='utf8')
CORS(app)
Session = sessionmaker(bind=engine)
Base = declarative_base()


class User(Base):
    """
    UserRequest class initiate an user request instance to
    store data:
        uuid, file, file type, file name, processing type,
        processing time, upload time, image size, actions,
        metrics
    """
    __tablename__ = "users"
    uuid = Column(UUID, primary_key=True)
    uploadFiles = relationship("UploadFiles", back_populates="user")
    processedImage = relationship("ProcessedImage", back_populates="user")

    def __init__(self, uuid):
        self.uuid = uuid


class UploadFiles(Base):
    __tablename__ = "upload_files"
    index = Column("index", Integer)
    upload_file = Column("upload_file", LargeBinary)
    upload_file_name = Column("upload_file_name", String)
    upload_file_type = Column("upload_file_type", String)
    upload_time = Column("upload_time", DateTime)
    image_size_original_row = Column("image_size_original_row", Integer)
    image_size_original_column = Column("image_size_original_column", Integer)
    user_uuid = Column("user_uuid", UUID, ForeignKey("users.uuid"))
    require_processing = Column("require_processing", Boolean)
    file_identifier = Column("file_identifier", String, primary_key=True)
    original_color_image = Column("original_color_image", LargeBinary, index=False)
    processedImage = relationship("ProcessedImage", back_populates="uploadfiles")
    user = relationship("User", back_populates="uploadFiles")

    def __init__(self, upload_file, file_type, file_name, upload_time, uuid, index, image_size,
                 require_processing, file_identifier, original_color):
        self.upload_file = upload_file
        self.upload_file_type = file_type
        self.upload_file_name = file_name
        self.image_size_original_row = image_size[0]
        self.image_size_original_column = image_size[1]
        self.upload_time = upload_time
        self.user_uuid = uuid
        self.index = index
        self.require_processing = require_processing
        self.file_identifier = file_identifier
        self.original_color_image = original_color


class ProcessedImage(Base):
    __tablename__ = "processed_image"
    processing_type = Column("image_processing_type", String)
    processing_time = Column("processing_time", Numeric)
    processed_file = Column("processed_file", LargeBinary, index=False)
    processed_file_type = Column("processed_file_type", String)
    processed_number = Column("processed_number", Integer)
    metrics = Column("processing_metrics", Numeric)
    image_size_processed_row = Column("image_size_original_row", Integer)
    image_size_processed_column = Column("image_size_original_column", Integer)
    num_HE = Column("number_of_histogram_equalization", Integer)
    num_CS = Column("number_of_contrast_stretching", Integer)
    num_LC = Column("number_of_log_compression", Integer)
    num_RV = Column("number_of_reverse_video", Integer)
    processed_file_name = Column("processed_file_name", String, primary_key=True)
    uploadFiles_upload_file_name = Column("uploadFiles_upload_file_name", String)
    uploadFiles_file_identifier = Column("uploadFiles_file_identifier", String,
                                         ForeignKey("upload_files.file_identifier"))
    user_uuid_processed = Column("user_uuid_processed", UUID, ForeignKey("users.uuid"))
    uploadfiles = relationship("UploadFiles", back_populates="processedImage")
    user = relationship("User", back_populates="processedImage")

    def __init__(self, processing_type, processing_time, processed_file, processed_file_type,
                 processing_latency, num_HE, num_CS, num_LC, num_RV, upload_file_name, image_size,
                 processed_number, processed_file_name, uuid, uploadFiles_file_identifier):
        self.processing_type = processing_type
        self.processed_file_type = processed_file_type
        self.processing_time = processing_time
        self.processed_file = processed_file
        self.image_size_processed_row = image_size[0]
        self.image_size_processed_column = image_size[1]
        self.metrics = processing_latency
        self.num_HE = num_HE
        self.num_CS = num_CS
        self.num_LC = num_LC
        self.num_RV = num_RV
        self.uploadFiles_upload_file_name = upload_file_name
        self.processed_number = processed_number
        self.processed_file_name = processed_file_name
        self.user_uuid_processed = uuid
        self.uploadFiles_file_identifier = uploadFiles_file_identifier


Base.metadata.create_all(engine)


class HandleNewUserRequest(object):
    """
    this class functions as a handle to process user request, for each new
    request, including new user and update, will initiate an instance of this class
    to handle processing task
    """

    def __init__(self, uuid, upload_file, processing_type, upload_time, file_type,
                 processed_file_index, file_name):
        self.uuid = uuid
        self.upload_file = upload_file
        self.upload_file_type = file_type
        self.processed_file_index = processed_file_index
        self.upload_file_name = file_name
        self.upload_time = upload_time
        self.processing_type = processing_type
        self.processing_time = 0
        self.processed_file = []
        self.image_size_original = []
        self.image_size_processed = []
        self.actions = [0, 0, 0, 0]  # [num_hist_eq, num_contr_stre, num_log_com, num_reverse_video]
        self.metrics = []  # processing latency

    def image_processing(self):
        """
        image_processing function process the image according
        user's request
        """
        for index in self.processed_file_index:
            time_be = time()
            current_img = self.upload_file[index]
            decode_img = decode_b64_image(current_img, self.upload_file_type[index])
            self.image_size_original.append(decode_img.shape)
            out_img, actions, size = process_image(decode_img, self.processing_type, self.actions)
            time_af = time()
            self.metrics.append(time_af - time_be)
            self.image_size_processed.append(size)
            self.processed_file.append(encode_nparray_to_img(out_img, self.upload_file_type[index]))
        value = datetime.datetime.now() - self.upload_time
        self.actions = actions
        self.processing_time = value.total_seconds()


def encode_nparray_to_img(np_array, img_format):
    """
    encode_nparray_to_img functions encodes the np_array processed
    img to a base64 for front end
    :param np_array: array of processed image
    :param img_format: image type, jpg, png, tiff
    :return: base64 encoded bytes string
    """
    image = Image.fromarray(np_array)
    buffer = BytesIO()
    im2 = image.convert("L")
    ft = 'JPEG' if img_format == 'jpg' or 'JPG' else img_format
    im2.save(buffer, format=ft)
    return base64.b64encode(buffer.getvalue())


def decode_b64_image(base64_string, img_format):
    """
    decode_b64_image decode bytes string into a np array of
    img
    :param base64_string: bytes string
    :param img_format: image type, jpg, png, tiff
    :return: decoded image in np array
    """
    image_bytes = base64.b64decode(base64_string)
    image_buffer = io.BytesIO(image_bytes)
    ft = 'JPEG' if img_format == 'jpg' or 'JPG' else img_format
    decoded_img = matimage.imread(image_buffer, format=ft)
    return decoded_img


def to_ui(uuid, processed_file, upload_file_type, upload_file_name, upload_file, image_size_original,
          image_size_processed, processing_time, original_file, upload_time):
    """
    to_ui method generates return information
    to the front end
    """
    img_pair = []
    his_pair = []
    img_size_pair = []

    for index, files in enumerate(upload_file):
        decode = decode_b64_image(processed_file[index], upload_file_type[index])
        print("original_file.shape",len(original_file))
        decode_his = get_histogram(original_file[index], processed_file[index])
        his_pair.append(decode_his)
        if upload_file_type[index] == "JPEG" or "JPG":
            format1 = encode_nparray_to_img(decode, "PNG").decode('utf-8')
            format2 = encode_nparray_to_img(decode, "TIFF").decode('utf-8')
            img_pair.append([original_file[index].decode('utf-8'), [processed_file[index].decode('utf-8'),
                             format2, format1]])
        elif upload_file_type[index] == "PNG":
            format1 = encode_nparray_to_img(decode, "JPEG").decode('utf-8')
            format2 = encode_nparray_to_img(decode, "TIFF").decode('utf-8')
            img_pair.append([original_file[index].decode('utf-8'), [format1, format2,
                             processed_file[index].decode('utf-8')]])
        else:
            format1 = encode_nparray_to_img(decode, "PNG").decode('utf-8')
            format2 = encode_nparray_to_img(decode, "JPEG").decode('utf-8')
            img_pair.append([original_file[index].decode('utf-8'), [format2,
                             processed_file[index].decode('utf-8')], format1])
        img_size_pair.append([image_size_original[index], image_size_processed[index]])

    return {"uuid": uuid,
            "img_pair": img_pair,
            "histogram_pair": his_pair,
            "img_size": img_size_pair,
            "processed_time": processing_time,
            "fileNames": upload_file_name,
            "upload_time": upload_time
            }


class ValidationError(Exception):
    def __int__(self, message):
        self.message = message


@app.route("/new_user_request", methods=['POST'])
def initial_new_image_processing():
    """
    /new_user_request allows to post a new user request
    :return: error if any error, or successfully add the new user request
    """
    r = request.get_json()
    data = validate(r)
    print("data[2]", data[2])
    print("r", r["fileNames"])
    session = Session()
    try:
        user_uuid_list = session.query(User).all()
        if user_uuid_list:
            for uuid in user_uuid_list[0].uuid:
                if uuid == data[6]:
                    raise ValidationError("duplicate key value: uuid")
    except ValidationError as e:
        return jsonify({"message": e.message}), 500
    user_request = HandleNewUserRequest(data[6], data[0], data[4], data[5], data[1], data[3], data[2])
    user_request.image_processing()
    user = User(user_request.uuid)
    processed_number = 0
    count = 1
    for index in data[3]:
        print(count)
        print("index", data[3])
        file_identifier = data[6] + str(index) + '0'
        original_color = data[8][index]
        files = UploadFiles(user_request.upload_file[index], user_request.upload_file_type[index],
                            user_request.upload_file_name[index], user_request.upload_time, user_request.uuid,
                            index, user_request.image_size_original[index], True, file_identifier, original_color)
        print("user_request.upload_file_name[index]", user_request.upload_file_name[index])
        processed_file_name = data[6] + user_request.upload_file_name[index] + '_' + str(index)
        processed_files = ProcessedImage(user_request.processing_type, user_request.processing_time,
                                         user_request.processed_file[index], user_request.upload_file_type[index],
                                         user_request.metrics[index], user_request.actions[0], user_request.actions[1],
                                         user_request.actions[2], user_request.actions[3],
                                         user_request.upload_file_name[index],
                                         user_request.image_size_processed[index],
                                         processed_number, processed_file_name, user_request.uuid, file_identifier)
        files.processedImage.append(processed_files)
        user.uploadFiles.append(files)
        count += 1
    session.add(user)
    session.commit()
    if not data[7]:
        result = {"message": "Successfully added and processed user request",
                  "file_names": data[2]}
    else:
        result = {data[7]}
    session.close()
    return jsonify(result)


@app.route("/update_user_request", methods=['POST'])
def add_new_processing_to_exist_user():
    r = request.get_json()
    session = Session()
    data = second_validation(r)
    try:
        user_uuid_list = session.query(User).all()
        print("user_uuid_list",user_uuid_list)
        list_id = []
        for row in user_uuid_list:
            list_id.append(row.uuid)
        if data[-1] not in list_id:
            raise ValidationError("Can not find uuid")
    except ValidationError as e:
        return jsonify({"message": e.message}), 500
    query_processedimage = session.query(ProcessedImage).filter(ProcessedImage.user_uuid_processed == data[3]).all()
    query_uploadfiles = session.query(UploadFiles).filter(UploadFiles.user_uuid == data[3]).all()
    if isinstance(query_processedimage, ProcessedImage):
        # single processed image
        new_processed_number = query_processedimage.processed_number + 1
        pre_actions_HE = query_processedimage.num_HE
        pre_actions_CS = query_processedimage.num_CS
        pre_actions_RV = query_processedimage.num_RV
        pre_actions_LC = query_processedimage.num_LC
    else:
        total = []
        total_he = []
        total_cs = []
        total_rv = []
        total_lc = []
        for row in query_processedimage:
            total.append(row.processed_number)
            total_he.append(row.num_HE)
            total_cs.append(row.num_CS)
            total_rv.append(row.num_RV)
            total_lc.append(row.num_LC)
            last_prcessed_file_name = row.processed_file_name
        new_processed_number = max(total) + 1
        print(total_he)
        pre_actions_HE = max(total_he)
        pre_actions_CS = max(total_cs)
        pre_actions_RV = max(total_rv)
        pre_actions_LC = max(total_lc)
    processing_index = []
    old_upload_file = []
    old_upload_file_type = []
    old_upload_file_name = data[0]
    old_upload_file_identifier = []
    for index, i in enumerate(data[0]):
        processing_index.append(index)
        for row in query_uploadfiles:
            if row.upload_file_name == i:
                print("row.upload_file_name", row.upload_file_name)
                print("i", i)
                old_upload_file.append(row.upload_file)
                old_upload_file_type.append(row.upload_file_type)
                old_upload_file_identifier.append(row.file_identifier)
            else:
                row.require_processing = False
                print("index", row.require_processing)
    print("processing_index", processing_index)
    update_ur = HandleNewUserRequest(data[3], old_upload_file, data[1], data[2], old_upload_file_type,
                                     processing_index, old_upload_file_name)
    update_ur.image_processing()
    # for number of file need to be processed
    print("new_processed_number", new_processed_number)
    for index, fn in enumerate(data[0]):
        print("index", index)
        print("len(update_ur.processed_file)",len(update_ur.processed_file))
        print("len(update_ur.upload_file_type)",len(update_ur.upload_file_type))
        print("len(update_ur.upload_file_name)",len(update_ur.upload_file_name))
        print("pre_actions_HE", pre_actions_HE)
        processed_files_name = last_prcessed_file_name[:-1]+str(int(last_prcessed_file_name[-1])+index+1)
        print("processed_files_name",  processed_files_name)
        print("update_ur.actions", update_ur.actions)
        file_id = old_upload_file_identifier[index]
        processed_files = ProcessedImage(update_ur.processing_type, update_ur.processing_time,
                                         update_ur.processed_file[index], update_ur.upload_file_type[index],
                                         update_ur.metrics[index], update_ur.actions[0]+pre_actions_HE,
                                         update_ur.actions[1]+pre_actions_CS,
                                         update_ur.actions[2]+pre_actions_LC, update_ur.actions[3]+pre_actions_RV,
                                         update_ur.upload_file_name[index],
                                         update_ur.image_size_processed[index],
                                         new_processed_number, processed_files_name, data[3], file_id)
        session.add(processed_files)
    session.commit()
    session.close()
    result = {"message": "Successfully updated and processed user request"}
    return jsonify(result)


@app.route("/get_processed_result/<uuid>", methods=['GET'])
def get_processed_result(uuid):
    session = Session()
    info_uploadfiles = session.query(UploadFiles)\
        .filter(UploadFiles.user_uuid == uuid).all()
    info_processedimage = session.query(ProcessedImage).filter(ProcessedImage.user_uuid_processed == uuid).all()
    print("info_uploadfiles", info_uploadfiles, "len", len(info_uploadfiles))
    print("info_processedimage", info_processedimage, "len", len(info_processedimage))
    if isinstance(info_processedimage, ProcessedImage):
        processed_img_index = info_processedimage.processed_number
        print("single image")
    else:
        pro_num = []
        for row in info_processedimage:
            pro_num.append(row.processed_number)
        print("pro_num", pro_num)
        processed_img_index = max(pro_num)
    print("processed_img_index", processed_img_index)
    q = session.query(ProcessedImage).filter(ProcessedImage.user_uuid_processed == uuid)\
        .filter(ProcessedImage.processed_number == processed_img_index).all()
    print("q",len(q))
    out_processed_file = []
    out_processed_image_size = []
    out_original_image_size = []
    out_processed_time = []
    if isinstance(q, ProcessedImage):
        out_processed_file.append(q.processed_file)
        out_processed_image_size.append([q.image_size_processed_row,
                                         q.image_size_processed_column])
        out_processed_time.append(float(q.processing_time))
        out_original_image_size.append([info_uploadfiles.image_size_original_row,
                                        info_uploadfiles.image_size_original_column])
    else:
        print("wow")
        for row in q:
                out_processed_file.append(row.processed_file)
                out_processed_image_size.append([row.image_size_processed_row, row.image_size_processed_column])
                out_processed_time.append(float(row.processing_time))
        for row in info_uploadfiles:
            out_original_image_size.append([row.image_size_original_row, row.image_size_original_column])
    print("processed_img_index", processed_img_index)
    upload_file_type = []
    upload_file_name = []
    upload_file = []
    upload_file_original = []
    for o in info_uploadfiles:
        for b in q:
            if o.upload_file_name == b.uploadFiles_upload_file_name:
                upload_file_type.append(o.upload_file_type)
                upload_file_name.append(o.upload_file_name)
                upload_file.append(o.upload_file)
                upload_file_original.append(o.original_color_image)
                upload_time = o.upload_time
    print("len(upload_file_original)", len(upload_file_original))
    print("len(out_processed_file)", len(out_processed_file))
    output = to_ui(uuid, out_processed_file, upload_file_type, upload_file_name, upload_file,
                   out_original_image_size, out_processed_image_size, out_processed_time[0],
                   upload_file_original, upload_time)
    session.close()
    return jsonify(output)


if __name__ == '__main__':
    app.run(host="0.0.0.0")






