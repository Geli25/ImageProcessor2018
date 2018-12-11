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

with open("test.jpg", "rb") as image_file:
    encode = base64.b64encode(image_file.read())
data = encode.decode('utf-8')
print("encode:", encode)
print("data:", data)
print("decode:", decode_b64_image(data, 'jpg'))
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
#r2 = requests.get("http://127.0.0.1:5000/get_processed_result{0}".format(uuid1))


def img_compare(img_be, img_af):
    plt.subplot(1, 2, 1)
    plt.imshow(decode_b64_image(img_be, 'jpeg'), interpolation='nearest', cmap='gray')
    plt.subplot(1, 2, 2)
    plt.imshow(decode_b64_image(img_af, 'jpeg'), cmap='gray')
    plt.show()



for img_pair in r2['img_pair']:
    img_be = img_pair[0]
    img_af = img_pair[1]
    img_compare(img_be, img_af)
