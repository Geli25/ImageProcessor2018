from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, String, LargeBinary, DateTime, Integer, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import sessionmaker
from image_processing import process_image
import datetime
from time import time
import base64
import io
import matplotlib.image as matimage
from PIL import Image
from io import BytesIO
from validation import validate, second_validation


"""
File name: server.py 
Main: this is the server.py file to build the entire image 
processing project. 
Date: Dec 9th 2018 
"""


app = Flask(__name__)
engine = create_engine("postgresql://hw188:{0}@localhost:5432/bme590finalproject".format('123456'), max_overflow=20)
Session = sessionmaker(bind=engine)
Base = declarative_base()


class UserRequest(Base):
    """
    UserRequest class initiate an user request instance to
    store data:
        uuid, file, file type, file name, processing type,
        processing time, upload time, image size, actions,
        metrics
    """
    __tablename__ = "image_processor"
    uuid = Column(UUID, primary_key=True)
    upload_file = Column("upload_file", LargeBinary)
    upload_file_name = Column("upload_file_name", String(32))
    upload_file_type = Column("upload_file_type", String(32))
    upload_time = Column("upload_time", DateTime)
    processing_type = Column("image_processing_type", String(32))
    processing_time = Column("processing_time", DateTime)
    processed_file = Column("processed_file", LargeBinary)
    processed_file_index = Column("processed_file_index", Integer)
    image_size = Column("image_size (pixel):", Integer)
    actions = Column("user_actions", Integer)
    metrics = Column("processing_metrics", Numeric)

    def __init__(self, uuid, upload_file, processing_type, upload_time, file_type, processed_file_index, file_name):
        self.uuid = uuid
        self.upload_file = upload_file
        self.upload_file_type = file_type
        self.upload_file_name = file_name
        self.processing_type = []
        self.processing_time = []
        self.processed_file = []
        self.upload_time = []
        self.actions = [0, 0, 0, 0]  # [num_hist_eq, num_contr_stre, num_log_com, num_reverse_video]
        self.metrics = []  # processing latency
        self.image_size = []
        self.processed_file_index = processed_file_index
        self.upload_time.append(upload_time)
        self.processing_type.append(processing_type)

    def image_processing(self):
        """
        image_processing function process the image according
        user's request
        """
        processed = []
        for index in self.processed_file_index:
            time_be = time()
            current_img = self.upload_file[index]
            print('file_type:', self.upload_file_type[index], 'processing_type:', self.processing_type[-1], 'name:', self.upload_file_name[index])
            decode_img = decode_b64_image(current_img, self.upload_file_type[index])
            decode_img = decode_img[:, :, 0] if decode_img.shape[2] == 3 else decode_img
            out_img, actions, size = process_image(decode_img, self.processing_type[-1], self.actions)
            time_af = time()
            self.metrics = time_af - time_be
            print(out_img.shape)
            processed.append(encode_nparray_to_img(out_img, self.upload_file_type[index]))
            self.image_size.append(size)
            self.actions = actions
        self.processed_file.append(processed)
        self.processing_time = datetime.datetime.now() - self.upload_time[-1]

    def to_ui(self):
        """
        to_ui method generates return information
        to the front end
        """
        img_pair = []
        print(len(self.processed_file))
        for index in self.processed_file_index:
            img_pair.append([self.upload_file[index], self.processed_file[-1][index]])
        return {"uuid": self.uuid,
                "img_pair": img_pair,
                "img_size": self.image_size,
                "processed_time": self.processing_time,
                "file_name": self.upload_file_name
                }

    def update_processing_file(self, processing_type, upload_time, file_index):
        """
        update_processing_file updates the
        :param processing_type:
        :param upload_time:
        :param file_index:
        """
        self.processing_type.append(processing_type)
        self.upload_time.append(upload_time)
        self.processed_file_index = file_index


Base.metadata.create_all(engine)


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
    session = Session()
    user = UserRequest(data[6], data[0], data[4], data[5], data[1], data[3], data[2])
    user.image_processing()
    session.add(user)
    session.commit()
    session.close()
    if not data[7]:
        result = {"message": "Successfully added and processed user data"}
    else:
        result = {data[7]}
    return jsonify(result)


@app.route("/update_user_request", methods=['POST'])
def add_new_processing_to_exist_user():
    r = request.get_json()
    data = second_validation(r)
    session = Session()
    user = session.query(UserRequest).filter_by(UUID=data[3])
    user.update_processing(data[1], data[2], data[0])
    user.image_processing()
    session.commit()
    session.close()
    if not data[4]:
        result = {"message": "Successfully added and processed user data"}
    else:
        result = {data[4]}
    return jsonify(result)


@app.route("/get_processed_result<uuid>", methods=['GET'])
def get_processed_result(uuid):
    session = Session()
    user = session.query(UserRequest).filter_by(UUID=uuid)
    result = user.to_ui()
    session.commit()
    session.close()
    return jsonify(result)


if __name__ == '__main__':
    app.run(host="0.0.0.0")






