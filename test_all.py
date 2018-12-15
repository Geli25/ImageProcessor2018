from validation import *
import pytest
from histogram import *
import base64
from image_processing import *


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


@pytest.mark.parametrize("image_file", [
    "test_resource/turn_grey/1.jpg",
    "test_resource/turn_grey/2.jpg",
    "test_resource/turn_grey/3.jpg",
    ])
def test_origin_image(image_file):
    encoded = origin_image(image_file)
    image_bytes = base64.b64decode(encoded)
    encoded2 = origin_image(image_bytes)
    assert encoded == encoded2


@pytest.mark.parametrize("path, my_data, name, expected", [
    ("test_resource/traverse/test1", [[], [], [], [], [], [], [], [], []],
     "hh", 7),
    ("test_resource/traverse/test2", [[], [], [], [], [], [], [], [], []],
     "angelina", 6),
    ("test_resource/traverse/test3", [[], [], [], [], [], [], [], [], []],
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
      "GC": False,
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


@pytest.mark.parametrize("new_database, expected", [
    ({"CS": True,
      "HE": False,
      "LC": False,
      "RV": False,
      "GC": False,
      "uuid": 1,
      "selectedFilename": ["1.jpg", "hh.zip/2.jpg"]
      },
     [2, 1]
     ),
    ({"CS": True,
      "HE": True,
      "LC": False,
      "RV": False,
      "GC": False,
      "uuid": 1,
      "selectedFilename": ["2.jpg", "angelina.zip/7.jpg"]
      },
     [2, 2])
])
def test_second_validation(new_database, expected):
    response = second_validation(new_database)
    assert len(response[0]) == expected[0]
    assert len(response[1]) == expected[1]


@pytest.mark.parametrize("access, file_name, expected", [
    ([[], [], ["hh", "kk", "jj"], [], [], [], [], [], []],
     "hh", "hh(1)"),
    ([[], [], ["hh", "kk", "jj"], [], [], [], [], [], []],
     "angelina", "angelina"),
    ([[], [], ["hh", "kk", "jj", "kk(1)"], [], [], [], [], [], []],
     "kk", "kk(2)"),
    ([[], [], ["hh", "kk", "jj", "kk(1)"], [], [], [], [], [], []],
     "kk.zip/hh.zip/j.jpg", "kk/hh/j.jpg"),
    ])
def test_add_name(access, file_name, expected):
    add_name(access, file_name, 0)
    assert access[2][-1] == expected


@pytest.mark.parametrize("image_file, expected", [
    ("test_histogram/1.png", 1),
    ("test_histogram/2.png", 0),
    ])
def test_is_grey(image_file, expected):
    with open(image_file, "rb") as image_file:
        img = base64.b64encode(image_file.read())
    src = base64.b64decode(img)
    image_file = io.BytesIO(src)
    response = is_grey(image_file)
    assert response == expected


@pytest.mark.parametrize("origin_image, processed_image, expected", [
    ("test_histogram/2.png", "test_histogram/2.png", 2),
    ("test_histogram/1.png", "test_histogram/2.png", 4),
    ])
def test_get_histogram(origin_image, processed_image, expected):
    with open(origin_image, "rb") as image_file:
        img_o = base64.b64encode(image_file.read())
    with open(processed_image, "rb") as image_file:
        img_n = base64.b64encode(image_file.read())
    response = get_histogram(img_o, img_n)
    assert len(response) == expected


@pytest.mark.parametrize("image, list_processing_method, actions, expected", [
    ("testImageProcessing/test.jpg", ["HE", "LC", "GC"],
     [0, 0, 0, 0, 0], [1, 0, 1, 0, 1]),
    ("testImageProcessing/test.jpg", ["CS", "RV"],
     [0, 0, 0, 0, 0], [0, 1, 0, 1, 0]),
    ])
def test_image_processing(image, list_processing_method, actions, expected):
    im = imread(image)
    output, actions, size = process_image(im[:, :, 0],
                                          list_processing_method, actions)
    assert actions == expected
