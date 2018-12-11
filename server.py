from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, String, LargeBinary, DateTime, Integer, Numeric, ForeignKey
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
"""
File name: server.py 
Main: this is the server.py file to build the entire image 
processing project. 
Date: Dec 9th 2018 
"""


app = Flask(__name__)
engine = create_engine("postgresql://hw188:{0}@localhost:5432/bme590finalproject".format('123456'), max_overflow=20,
                       client_encoding='utf8')
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
    uploadFiles = relationship("UploadFiles")

    def __init__(self, uuid):
        self.uuid = uuid


class UploadFiles(Base):
    __tablename__ = "upload_files"
    index = Column("index", Integer, primary_key=True)
    upload_file = Column("upload_file", LargeBinary)
    upload_file_name = Column("upload_file_name", String(32))
    upload_file_type = Column("upload_file_type", String(32))
    upload_time = Column("upload_time", DateTime)
    image_size_original_row = Column("image_size_original_row", Integer)
    image_size_original_column = Column("image_size_original_column", Integer)
    user_uuid = Column("user_uuid", UUID, ForeignKey("users.uuid"))
    processedImage = relationship("ProcessedImage")

    def __init__(self, upload_file, file_type, file_name, upload_time, uuid, index, image_size):
        self.upload_file = upload_file
        self.upload_file_type = file_type
        self.upload_file_name = file_name
        self.image_size_original_row = image_size[0]
        self.image_size_original_column = image_size[1]
        self.upload_time = upload_time
        self.user_uuid = uuid
        self.index = index


class ProcessedImage(Base):
    __tablename__ = "processed_image"
    processing_type = Column("image_processing_type", String(32))
    processing_time = Column("processing_time", Numeric)
    processed_file = Column("processed_file", LargeBinary, primary_key=True)
    processed_file_type = Column("processed_file_type", String)
    metrics = Column("processing_metrics", Numeric)
    image_size_processed = Column("image_size_processed", String)
    num_HE = Column("number_of_histogram_equalization", Integer)
    num_CS = Column("number_of_contrast_stretching", Integer)
    num_LC = Column("number_of_log_compression", Integer)
    num_RV = Column("number_of_reverse_video", Integer)
    uploadFiles_index = Column("upload_file_index", Integer, ForeignKey("upload_files.index"))

    def __init__(self, processing_type, processing_time, processed_file, processed_file_type,
                 processing_latency, num_HE, num_CS, num_LC, num_RV, index, image_size):
        self.processing_type = processing_type
        self.processed_file_type = processed_file_type
        self.processing_time = processing_time
        self.processed_file = processed_file
        self.image_size_processed = image_size
        self.metrics = processing_latency
        self.num_HE = num_HE
        self.num_CS = num_CS
        self.num_LC = num_LC
        self.num_RV = num_RV
        self.uploadFiles_index = index


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
            self.actions = actions
            self.processed_file.append(encode_nparray_to_img(out_img, self.upload_file_type[index]))
        value = datetime.datetime.now() - self.upload_time
        self.processing_time = value.total_seconds()


    def to_ui(self):
        """
        to_ui method generates return information
        to the front end
        """
        img_pair = []
        his_pair = []
        print(len(self.processed_file))
        for index in self.processed_file_index:
            decode = decode_b64_image(self.processed_file[-1][index], self.upload_file_type[index])
            # decode_his = np.histogram(decode, bins=254)
            # upload_decode = decode_b64_image(self.upload_file[index], self.file_type[index])
            # decode_his2 = np.histogram(upload_decode, bins=254)
            # his_pair.append([decode_his2, decode_his])
            if self.upload_file_type[index] == "JPEG" or "JPG":
                format1 = encode_nparray_to_img(decode, "PNG").decode('utf-8')
                format2 = encode_nparray_to_img(decode, "TIFF").decode('utf-8')
                img_pair.append([self.upload_file[index], self.processed_file[-1][index].decode('utf-8'),
                                 format2, format1])
            elif self.upload_file_type[index] == "PNG":
                format1 = encode_nparray_to_img(decode, "JPEG").decode('utf-8')
                format2 = encode_nparray_to_img(decode, "TIFF").decode('utf-8')
                img_pair.append([self.upload_file[index], format1, format2,
                                 self.processed_file[-1][index].decode('utf-8')])
            else:
                format1 = encode_nparray_to_img(decode, "PNG").decode('utf-8')
                format2 = encode_nparray_to_img(decode, "JPEG").decode('utf-8')
                img_pair.append([self.upload_file[index], format2,
                                 self.processed_file[-1][index].decode('utf-8')], format1)

        return {"uuid": self.uuid,
                "img_pair": img_pair,
                "histogram_pair": his_pair,
                "img_size": self.image_size_processed,
                "processed_time": self.processing_time,
                "fileNames": self.upload_file_name
                }


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


@app.route("/new_user_request", methods=['POST'])
def initial_new_image_processing():
    """
    /new_user_request allows to post a new user request
    :return: error if any error, or successfully add the new user request
    """
    r = request.get_json()
    data = validate(r)
    user_request = HandleNewUserRequest(data[6], data[0], data[4], data[5], data[1], data[3], data[2])
    user_request.image_processing()
    session = Session()
    user = User(user_request.uuid)
    for index in data[3]:
        files = UploadFiles(user_request.upload_file[index], user_request.upload_file_type[index],
                            user_request.upload_file_name[index], user_request.upload_time, user_request.uuid,
                            index, user_request.image_size_original[index])
        processed_files = ProcessedImage(user_request.processing_type, user_request.processing_time,
                                         user_request.processed_file[index], user_request.upload_file_type[index],
                                         user_request.metrics[index], user_request.actions[0], user_request.actions[1],
                                         user_request.actions[2], user_request.actions[3], index,
                                         user_request.image_size_processed[index])
        files.processedImage.append(processed_files)
        user.uploadFiles.append(files)
    session.add(user)
    session.commit()
    if not data[7]:
        result = {"message": "Successfully added and processed user data"}
    else:
        result = {data[7]}
    session.close()
    return jsonify(result)


@app.route("/update_user_request", methods=['POST'])
def add_new_processing_to_exist_user():
    r = request.get_json()
    data = second_validation(r)
    session = Session()
    update = (Session.query(User, UploadFiles, ProcessedImage).filter(User.uuid == UploadFiles.user_uuid)
              .filter(UploadFiles.index == ProcessedImage.uploadFiles_index).filter(User.uuid == data[3]).all())

    if not data[4]:
        result = {"message": "Successfully added and processed user data"}
    else:
        result = {data[4]}
    session.commit()
    session.close()
    return jsonify(result)


@app.route("/get_processed_result<uuid>", methods=['GET'])
def get_processed_result(uuid):
    session = Session()
    info = (Session.query(User, UploadFiles, ProcessedImage).filter(User.uuid == UploadFiles.user_uuid)
            .filter(UploadFiles.index == ProcessedImage.uploadFiles_index).filter(User.uuid == uuid).all())
    print(info)

    return


if __name__ == '__main__':
    app.run(host="0.0.0.0")






