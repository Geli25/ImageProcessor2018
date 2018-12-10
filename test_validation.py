import pytest
from validation import *


@pytest.mark.parametrize("file_name, expected", [
    ("test_resource/unzip/kk.zip", True),
    ("test_resource/unzip/pic.zip", True),
    ])
def test_un_zip(file_name, expected):
    dir_name = un_zip(file_name)
    response = os.path.isdir(dir_name)
    assert response == expected


@pytest.mark.parametrize("image_file, image_type", [
    ("test_resource/turn_grey/1.jpg", "JPG"),
    ("test_resource/turn_grey/2.jpg", "JPG"),
    ("test_resource/turn_grey/3.jpg", "JPG"),
    ])
def test_image_turn_grey(image_file, image_type):
    encoded = image_turn_grey(image_file, image_type)
    image_bytes = base64.b64decode(encoded)
    decoded = io.BytesIO(image_bytes)
    img = Image.open(decoded).convert('RGB')
    w, h = img.size
    for i in range(w):
        for j in range(h):
            r, g, b = img.getpixel((i, j))
            assert r == g == b


@pytest.mark.parametrize("path, my_data, name, expected", [
    ("test_resource/traverse/test1", [[], [], [], [], [], [], [], []],
     "hh", 7),
    ("test_resource/traverse/test2", [[], [], [], [], [], [], [], []],
     "angelina", 6),
    ("test_resource/traverse/test3", [[], [], [], [], [], [], [], []],
     "Tina", 8),
    ])
def test_traverse_dir(path, my_data, name, expected):
    traverse_dir(path, my_data, name)
    assert expected == len(my_data[0])


def read_file_as_b64(image_path):
    with open(image_path, "rb") as image_file:
        base64_bytes = base64.b64encode(image_file.read())
    return base64_bytes.decode('utf-8')


@pytest.mark.parametrize("database, expected", [
    ({"CS": True,
      "HE": False,
      "LC": False,
      "RV": False,
      "uuid": "1",
      "files": [read_file_as_b64("test_resource/validate/pic.zip"),
                read_file_as_b64("test_resource/validate/holk.jpg"),
                read_file_as_b64("test_resource/validate/ironman.jpg")],
      "fileNames": ["pic.zip", "holk.jpg", "ironman.jpg"]
      }, 4)
    ])
def test_validate(database, expected):
    response = validate(database)
    assert expected == len(response[0])


@pytest.mark.parametrize("new_database, file_names, expected", [
    ({"CS": True,
      "HE": False,
      "LC": False,
      "RV": False,
      "uuid": 1,
      "selectedFilename": ["1.jpg", "hh.zip/2.jpg"]
      },
     ["1.jpg", "2.jpg", "3.jpg", "tina.zip/4.jpg", "hh.zip/2.jpg",
      "angelina.zip/7.jpg"],
     [0, 4]
     ),
    ({"CS": True,
      "HE": False,
      "LC": False,
      "RV": False,
      "uuid": 1,
      "selectedFilename": ["2.jpg", "angelina.zip/7.jpg"]
      },
     ["1.jpg", "2.jpg", "3.jpg", "tina.zip/4.jpg", "hh.zip/2.jpg",
      "angelina.zip/7.jpg"],
     [1, 5])
])
def test_second_validation(new_database, file_names, expected):
    response = second_validation(new_database, file_names)
    assert response[0] == expected
