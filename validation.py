import base64
import zipfile
import os
import datetime as dt
import logging
from PIL import Image
import io
import shutil

all_type = ["JPEG", "JPG", "TIFF", "PNG"]


def un_zip(file_name):
    zip_file = zipfile.ZipFile(file_name)
    dir_name = os.path.splitext(file_name)[0] + "_files"
    if os.path.exists(dir_name):
        shutil.rmtree(dir_name)
        os.mkdir(dir_name)
    else:
        os.mkdir(dir_name)
    for names in zip_file.namelist():
        zip_file.extract(names, dir_name)
    zip_file.close()
    return dir_name


def image_turn_grey(image_file, image_type):
    if type(image_file) == bytes:
        # image_bytes = base64.b64decode(image_file)
        image_file = io.BytesIO(image_file)
    img = Image.open(image_file)
    img = img.convert('L')
    img_byte_arr = io.BytesIO()
    if image_type == 'JPG' or 'jpg':
        image_type = 'JPEG'
    img.save(img_byte_arr, image_type)
    return base64.b64encode(img_byte_arr.getvalue())


def traverse_dir(path, my_data, name):
    files = os.listdir(path)
    for file in files:
        in_file = os.path.join(path, file)
        if not os.path.isdir(in_file):
            file_type = os.path.splitext(file)[-1][1:].upper()
            if file_type == "ZIP":
                in_file = un_zip(in_file)
                traverse_dir(in_file, my_data, name + "/" + file)
            else:
                if file_type in all_type:
                    my_data[0].append(image_turn_grey(in_file, file_type))
                    my_data[1].append(file_type)
                    my_data[2].append(name + "/" + file)
                else:
                    logging.warning(in_file + " does not have an image type\n")
                    my_data[7].append(in_file + " does not have an image type")
        else:
            traverse_dir(in_file, my_data, name + "/" + file)


def validate(database):
    update_time = dt.datetime.now()
    data = [[], [], [], [], [], update_time, database["uuid"], []]
    if database["CS"]:
        data[4].append("CS")
    if database["HE"]:
        data[4].append("HE")
    if database["LC"]:
        data[4].append("LC")
    if database["RV"]:
        data[4].append("RV")
    for index, send_image in enumerate(database["files"]):
        file_name = database["fileNames"][index]
        str_of_image = str(send_image)
        binary_image = send_image[str_of_image.find(',') + 1:]
        data_type = os.path.splitext(file_name)[-1][1:]
        if data_type.find("zip") != -1:
            dir_str = database["uuid"] + ".zip"
            try:
                image_bytes = base64.b64decode(binary_image)
                with open(dir_str, "wb") as zip_file:
                    zip_file.write(image_bytes)
                    dir_name = un_zip(dir_str)
                traverse_dir(dir_name, data, file_name)
                # shutil.rmtree(os.path.splitext(file_name)[0] + "_files")
                # os.remove(dir_str)
            except OSError:
                logging.error(file_name + " the uploaded file is broken\n")
                data[7].append(file_name + " the uploaded file is broken")
            except Exception as e:
                logging.error(file_name + " the uploaded file is broken" +
                              e + "\n")
                data[7].append(file_name + " the uploaded file is broken")
        else:
            try:
                image_bytes = base64.b64decode(binary_image)
                print(type(image_bytes))
                data[0].append(image_turn_grey(image_bytes, data_type))
                data[1].append(data_type)
                data[2].append(file_name)
            except OSError:
                logging.error(file_name + " the uploaded file is broken\n")
                data[7].append(file_name + " the uploaded file is broken")
            except Exception as e:
                logging.error(file_name + " the uploaded file is broken" +
                              e + "\n")
                data[7].append(file_name + " the uploaded file is broken\n")
    for x in range(0, len(data[0])):
        data[3].append(x)
    return data


def second_validation(new_database, file_names):
    update_time = dt.datetime.now()
    new_data = [[], [], update_time, new_database["uuid"], []]
    if new_database["CS"]:
        new_data[1].append("CS")
    if new_database["HE"]:
        new_data[1].append("HE")
    if new_database["LC"]:
        new_data[1].append("LC")
    if new_database["RV"]:
        new_data[1].append("RV")
    for image_name in new_database["selectedFilename"]:
        try:
            new_data[0].append(file_names.index(image_name))
        except ValueError:
            logging.error(image_name + ": this image is not stored.\n")
            new_data[4].append(image_name + ": Can not find this image")
    return new_data


def read_file_as_b64(image_path):
    with open(image_path, "rb") as image_file:
        base64_bytes = base64.b64encode(image_file.read())
    return base64_bytes.decode('utf-8')
