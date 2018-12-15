import pytest
from histogram import *
import base64


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
