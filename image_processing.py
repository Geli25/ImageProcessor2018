from skimage import util
from skimage import exposure
from skimage.io import imread
import numpy as np
from matplotlib import pyplot as plt


def process_image(image, list_processing_method, actions):
    """
    Function process_image allows user to conduct the following
    image processing methods.
    Author: Haitong Wang
    Date: Dec, 7th, 2018
    Version: 1.0.0

    :param image: 2d grayscale array
    :param list_processing_method:
    :param actions: array of integer indicates the number of
    processing actions
    :return: output image/processed image, actions, size of
    the image

    """
    output = image
    for n in list_processing_method:
        if n is "HE":
            output = exposure.equalize_hist(output)
            output = exposure.rescale_intensity(output, out_range=(0, 255))
            actions[0] += 1
        elif n is "CS":
            p5, p95 = np.percentile(output, (5, 95))
            output = exposure.rescale_intensity(output, in_range=(p5, p95))
            actions[1] += 1
        elif n is "LC":
            output = exposure.adjust_log(output)
            actions[2] += 1
        elif n is "RV":
            output = util.invert(output)
            actions[3] += 1
    size = image.shape

    # add another feature for the phase 2
    return output, actions, size


if __name__ == "__main__":
    image = imread('test.jpg')
    print('image:', image.shape)
    image = image[:, :, 0]
    list_processing_method = ['CS']
    actions = [0, 0, 0, 0]
    output, actions, size = process_image(image, list_processing_method, actions)
    plt.subplot(1, 2, 1)
    plt.imshow(image, interpolation='nearest', cmap='gray')
    plt.subplot(1, 2, 2)
    plt.imshow(output, interpolation='nearest', cmap='gray')
    plt.show()
    print('actions:', actions, 'size', size)
