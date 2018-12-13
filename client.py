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
#img_name = ["ISIC_0000000.jpg", "ISIC_0000001.jpg", "ISIC_0000002.jpg", "ISIC_0000003.jpg", "ISIC_0000004.jpg",
#            "ISIC_0000005.jpg", "ISIC_0000006.jpg", "ISIC_0000007.jpg", "ISIC_0000008.jpg", "ISIC_0000009.jpg"]

cat_img = ["cat1.jpg", "cat2.jpeg"]
files = []
for i in cat_img:
    with open(i, "rb") as image_file:
        encode = base64.b64encode(image_file.read()).decode('utf-8')
    files.append(encode)
uuid1 = str(uuid.uuid4())
p1 = {
    "files": files,
    "HE": True,
    "CS": False,
    "LC": True,
    "RV": False,
    "uuid": uuid1,
    "fileNames": cat_img
}
print(uuid1)
r1 = requests.post("http://127.0.0.1:5000/new_user_request", json=p1)
print(r1.text)
"""
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
"""
uuid1 = '2b2b10cb-9e68-4eca-84c1-aec8369419f5'
img_name = ["ISIC_0000000.jpg", "ISIC_0000002.jpg", "ISIC_0000003.jpg", "ISIC_0000004.jpg",
            "ISIC_0000005.jpg"]
p1 = {
    "HE": False,
    "CS": True,
    "LC": True,
    "RV": True,
    "uuid": uuid1,
    "selectedFilename": img_name
}
r1 = requests.post("http://127.0.0.1:5000/update_user_request", json= p1)
print(r1.text)

"""

uuid1 = '2b2b10cb-9e68-4eca-84c1-aec8369419f5'
r2 = requests.get("http://127.0.0.1:5000/get_processed_result/{0}".format(uuid1))
print(r2.json)
img = r2.json()['img_pair']
his = r2.json()['histogram_pair']
print(len(his))

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

print(len(img))
for number in img:
    img_compare(number[0], number[1][0], number[1][1], number[1][2])

""""""
