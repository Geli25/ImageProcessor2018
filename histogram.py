from PIL import Image
import numpy as np
import io
import base64


def is_grey(image_file):
    img = Image.open(image_file).convert('RGB')
    w, h = img.size
    try:
        for i in range(w):
            for j in range(h):
                r, g, b = img.getpixel((i, j))
                assert r == g == b
        return 0
    except AssertionError:
        return 1


def get_histogram(origin_image, processed_image):
    origin_image = base64.b64decode(origin_image)
    processed_image = base64.b64decode(processed_image)
    image_file = io.BytesIO(origin_image)
    src = Image.open(image_file)
    bins = range(0, 257, 2)
    second_bins = range(2, 257, 2)
    data = [[], []]
    if is_grey(image_file) == 1:
        data.append([])
        data.append([])
        r, g, b = src.split()
        ar = np.array(r).flatten()
        heights0, bins0 = np.histogram(ar, bins=bins)
        # plt.hist(ar, bins=bins, density=1, color='r')
        ag = np.array(g).flatten()
        heights1, bins1 = np.histogram(ag, bins=bins)
        # plt.hist(ag, bins=bins, density=1, color='g')
        ab = np.array(b).flatten()
        heights2, bins2 = np.histogram(ab, bins=bins)
        # plt.hist(ab, bins=bins, density=1, color='b')
        # plt.show()
        for i in range(0, 128):
            data[0].append({
                "id": "{}".format(i),
                "bin0": int(bins[i]),
                "bin1": int(second_bins[i]),
                "count": int(heights0[i])
            })
            data[1].append({
                "id": "{}".format(i),
                "bin0": int(bins[i]),
                "bin1": int(second_bins[i]),
                "count": int(heights1[i])
            })
            data[2].append({
                "id": "{}".format(i),
                "bin0": int(bins[i]),
                "bin1": int(second_bins[i]),
                "count": int(heights2[i])
            })
        else:
            img_o = np.array(src)
            arr_o = img_o.flatten()
            # n, bins, patches = plt.hist(arr, bins=bins,
            #  density=1, color='grey', alpha=0.75)
            heights4, bins4 = np.histogram(arr_o, bins=bins)
            for i in range(0, 128):
                data[0].append({
                    "id": "{}".format(i),
                    "bin0": int(bins[i]),
                    "bin1": int(second_bins[i]),
                    "count": int(heights4[i])
                })
    image_file = io.BytesIO(processed_image)
    src = Image.open(image_file)
    img = np.array(src)
    arr = img.flatten()
    # n, bins, patches = plt.hist(arr, bins=bins, density=1,
    #  color='grey', alpha=0.75)
    heights3, bins3 = np.histogram(arr, bins=bins)
    for i in range(0, 128):
        data[-1].append({
            "id": "{}".format(i),
            "bin0": int(bins[i]),
            "bin1": int(second_bins[i]),
            "count": int(heights3[i])
        })
    return data