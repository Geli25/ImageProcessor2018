import base64
import zipfile
import os
import datetime as dt
import logging
from PIL import Image
import io
import shutil

all_type = ["JPEG", "JPG", "TIFF", "PNG", "TIF"]


def un_zip(file_name):
    """

    :param file_name: The zip file
    :return: The directory after unzipping
    """
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
    """

    :param image_file: File to be turned grey,
     which can be encoded image or image file
    :param image_type: File type
    :return: Encoded greyscale image file
    """
    if type(image_file) == bytes:
        image_file = io.BytesIO(image_file)
    img = Image.open(image_file)
    img = img.convert('L')
    img_byte_arr = io.BytesIO()
    if image_type == 'JPG' or 'jpg':
        image_type = 'JPEG'
    img.save(img_byte_arr, image_type)
    return base64.b64encode(img_byte_arr.getvalue())


def origin_image(image_file):
    """

    :param image_file: The original image file,
     which can be encoded image or image file
    :return: The encoded original image file
    """
    if type(image_file) == bytes:
        return base64.b64encode(image_file)
    with open(image_file, "rb") as image_file:
        return base64.b64encode(image_file.read())


def traverse_dir(path, my_data, name):
    """

    :param path: Current path
    :param my_data: The data set
    :param name: File name
    :return: The upgraded data set after traversing the whole directory
    """
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
                    my_data[8].append(origin_image(in_file))
                    my_data[1].append(file_type.lower())
                    add_name(my_data, name + "/" + file, 0)
                else:
                    logging.warning(in_file +
                                    " does not have an image type\n")
                    my_data[7].append(in_file +
                                      " does not have an image type")
        else:
            traverse_dir(in_file, my_data, name + "/" + file)


def add_name(access, file_name, i):
    """
    :synopsis: Add name to the data set without the duplicated names
    :param access: The data set
    :param file_name: The name of the file to be added
    :param i: The ordered number
    :return: Appended data set
    """
    try:
        access[2].index(file_name)
        if i == 0:
            add_name(access, file_name + "({})".format(i + 1), i + 1)
        else:
            index = file_name.find("(")
            file_name = file_name[:index + 1] + "{}".format(
                i + 1) + file_name[index + 2:]
            add_name(access, file_name, i + 1)
    except ValueError:
        while file_name.find(".zip") != -1:
            tag = file_name.find(".zip")
            file_name = file_name[:tag] + file_name[tag+4:]
        access[2].append(file_name)


def validate(database):
    """
    :synopsis: Validate the input from the frond end and
    translate it into the data set to be processed
    :param database: The data uploaded by the frontend
    :return: A validated data set, which is a list of list.
    :data[0]: list of greyscale encoded image file
    :data[1]: list of image file types
    :data[2]: list of image file names
    :data[3]: list of image file indexes
    :data[4]: list of processing types
    :data[5]: upload time
    :data[6]: uuid
    :data[7]: list of Errors messages
    :data[8]: list of original encoded image files
    """
    update_time = dt.datetime.now()
    data = [[], [], [], [], [], update_time, database["uuid"], [], []]
    if database["CS"]:
        data[4].append("CS")
    if database["HE"]:
        data[4].append("HE")
    if database["LC"]:
        data[4].append("LC")
    if database["RV"]:
        data[4].append("RV")
    if database["GC"]:
        data[4].append("GC")
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
                data[7].append(file_name + " the uploaded file is broken\n")
            except Exception as e:
                print(e)
                logging.error(file_name + " the uploaded file is broken\n")
                data[7].append(file_name + " the uploaded file is broken\n")
        else:
            try:
                image_bytes = base64.b64decode(binary_image)
                data[0].append(image_turn_grey(image_bytes, data_type))
                data[8].append(origin_image(image_bytes))
                data[1].append(data_type)
                add_name(data, file_name, 0)
            except OSError:
                logging.error(file_name + " the uploaded file is broken\n")
                data[7].append(file_name + " the uploaded file is broken\n")
            except Exception as e:
                print(e)
                logging.error(file_name + " the uploaded file is broken\n")
                data[7].append(file_name + " the uploaded file is broken\n")
    for x in range(0, len(data[0])):
        data[3].append(x)
    return data


def second_validation(new_database):
    """
    :synopsis: Validate the updated input from the frond end and
    translate it into the data set to be processed
    :param new_database: The updated data from the front end
    :return: A validated data set, which is a list of list.
    :new_data[0]: list of Selected File Names
    :new_data[1]: list of processing types
    :new_data[2]: upload time
    :new_data[3]: uuid
    """
    update_time = dt.datetime.now()
    new_data = [[], [], update_time, new_database["uuid"]]
    if new_database["CS"]:
        new_data[1].append("CS")
    if new_database["HE"]:
        new_data[1].append("HE")
    if new_database["LC"]:
        new_data[1].append("LC")
    if new_database["RV"]:
        new_data[1].append("RV")
    if new_database["GC"]:
        new_data[1].append("GC")
    for image_name in new_database["selectedFilename"]:
        new_data[0].append(image_name)
    return new_data
