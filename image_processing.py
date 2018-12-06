from skimage import util
from skimage import exposure
import numpy as np


def process_image(image, list_processing_method, actions):
    output = image
    for n in list_processing_method:
        if n is "HE":
            output = exposure.equalize_hist(output)
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
            actions[2] += 1

    return output, actions






