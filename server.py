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

"""
Main: this is the server.py file to build the entire image 
processing project. """


app = Flask(__name__)
engine = create_engine("postgresql://hw188:{0}@localhost:5432/bme590finalproject".format('123456'), max_overflow=20)
Session = sessionmaker(bind=engine)
Base = declarative_base()


class UserRequest(Base):
    __tablename__ = "image_processing"
    uuid = Column(UUID, primary_key=True)
    upload_file = Column("upload_file", LargeBinary)
    upload_file_type = Column("upload_file_type", String(32))
    processing_type = Column("image_processing_type", String(32))
    processing_time = Column("processing_time", DateTime)
    processed_file = Column("processed_file", LargeBinary)
    upload_time = Column("upload_time", DateTime)
    actions = Column("user_actions", Integer)
    metrics = Column("processing_metrics", Numeric)
    image_size = Column("image_size", Integer)
    processe_file

    def __init__(self, uuid, upload_file, processing_type, upload_time, file_type):
        self.uuid = uuid
        if isinstance(upload_file, list):
            for n, file in enumerate(upload_file):
                self.upload_file.append(file)
                self.upload_file_type.append(file_type[n])
        else:
            self.upload_file = upload_file
        self.processing_type = processing_type
        self.upload_file_type = file_type
        self.processing_time = []
        self.processing_file = []
        self.upload_time = upload_time
        self.actions = [0, 0, 0, 0]  # [num_hist_eq, num_contr_stre, num_log_com, num_reverse_video]
        self.metrics = []  # processing latency
        self.image_size = []

    def image_processing(self):
        # add an instance that can take multiple processing/ after processing
        #
        if isinstance(self.upload_file, list):
            time_be = time()
            for n, file in enumerate(self.upload_file):
                decode_img = decode_b64_image(file, self.upload_file_type[n])
                img, actions = process_image(decode_img, self.processing_type, self.actions)
                self.processed_file.append(img)
                self.image_size.append(Image.open(img).size)
                self.actions = actions
            time_af = time()
            self.processing_time.append(datetime.datetime.now())
            self.metrics.append(time_af-time_be)

        else:
            time_be = time()
            decode_img = decode_b64_image(self.upload_file, self.upload_file_type)
            img, actions = process_image(decode_img, self.processing_type, self.actions)
            self.processed_file.append(img)
            self.image_size.append(Image.open(img).size)
            self.actions = actions
            time_af = time()
            self.processing_time.append(datetime.datetime.now())
            self.metrics.append(time_af-time_be)

    def to_ui(self):
        img_pair = []
        for n, file in enumerate(self.upload_file):
            img_pair.append([file, self.processed_file])
        return {"uuid": self.uuid,
                "img_pair": img_pair,
                "img_size": self.image_size,
                "processed_time": self.processing_time
        }

    def get_uuid(self):
        return self.uuid

    def update_processing(self, processing_type):
        self.processing_type.append(processing_type)



def decode_b64_image(base64_string, img_format):
    image_bytes = base64.b64decode(base64_string)
    image_buffer = io.BytesIO(image_bytes)
    return matimage.imread(image_buffer, format=img_format)


Base.metadata.create_all(engine)


@app.route("/new_user", methods=['POST'])
def initial_new_image_processing():
    r = request.get_json()
    # add validation
    session = Session()
    process_type = [r['HE'], r['CS'], r['LC'], r['RV']]
    upload_time = datetime.datetime.now()
    type = 'jpeg'

    user = UserRequest(r['uuid'], r['files'], process_type, upload_time, type)
    user.image_processing()
    session.add(user)
    session.commit()
    session.close()
    # if error occurs/ validation output, add a section to output error
    return jsonify(user.to_ui())


@app.route("/new_upload", methods=['POST'])
def add_new_processing_to_exist_user():
    r = request.get_json()
    # update the database with new request for the image processing
    session = Session()
    # try, except and
    user = session.query(UserRequest).filter_by(UUID=r['uuid'])



    user.update_processing(r['processing_type'])
    user.image_processing()
    session.commit()
    session.close()
    return jsonify(user.to_ui())


if __name__ == '__main__':
    app.run(host="0.0.0.0")






