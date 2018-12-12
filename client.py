import uuid
import requests
from matplotlib import pyplot as plt
import base64
import io
import matplotlib.image as matimage

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

"""

with open("test.jpg", "rb") as image_file:
    encode = base64.b64encode(image_file.read())
data = encode.decode('utf-8')
uuid1 = str(uuid.uuid4())
p1 = {
    "files": [data],
    "HE": True,
    "CS": False,
    "LC": True,
    "RV": False,
    "uuid": uuid1,
    "fileNames": ["test.jpg"]
}
print(uuid1)
r1 = requests.post("http://127.0.0.1:5000/new_user_request", json=p1)
print(r1.text)
"""
uuid1 = 'f6812d6e-8a90-4f11-91fb-e462d658f1d7'
r2 = requests.get("http://127.0.0.1:5000/get_processed_result{0}".format(uuid1))
print(r2.text)
img = r2.json()['img_pair']


def img_compare(img1, img2, img3, img4):
    plt.subplot(2, 2, 1)
    plt.imshow(decode_b64_image(img1, 'jpeg'), interpolation='nearest', cmap='gray')
    plt.subplot(2, 2, 2)
    plt.imshow(decode_b64_image(img2, 'jpeg'), cmap='gray')
    plt.subplot(2, 2, 3)
    plt.imshow(decode_b64_image(img3, 'jpeg'), cmap='gray')
    plt.subplot(2, 2, 4)
    plt.imshow(decode_b64_image(img4, 'jpeg'), cmap='gray')
    plt.show()


img_compare(img[0][0],img[0][1],img[0][2],img[0][3])

