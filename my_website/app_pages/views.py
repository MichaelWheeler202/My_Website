from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.conf import settings
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.cache import cache_page

import os
import json
import numpy as np
#import tensorflow as tf

from tensorflow import keras

digit_reader = keras.models.load_model('./../MNIST-Reader.h5')

def home(request):
    return render(request, 'app_pages/home.html')


def MNISTDigitReader(request):
    return render(request, 'app_pages/MNISTDigitReader.html')


def ReadNumber(request):

    post = json.loads(request.POST['grid'])

    table_list = np.zeros((28, 28))

    for row in range(28):
        for col in range(28):
            table_index = 'row_' + str(row) + '_col_' + str(col)
            table_list[row][col] = post[table_index]

    table_list = CenterDrawing(table_list)

    table_list = table_list.reshape(1, 28, 28, 1)
    predictions = list(digit_reader.predict(table_list)[0])
    predicted_number = predictions.index(max(predictions))

    return HttpResponse(predicted_number)


def ContactInfo(request):
    return render(request, 'app_pages/ContactInfo.html')


def CenterDrawing(drawing):

    # variables for furthest filled pixel
    high = 0
    low = 999
    left = 999
    right = 0

    for i in range(len(drawing)):
        for j in range(len(drawing[i])):
            if drawing[i][j] != 0:
                if i < low:
                    low = i
                if i > high:
                    high = i
                if j < left:
                    left = j
                if j > right:
                    right = j

    length = len(drawing)
    height = len(drawing[0])

    # drawing = np.asarray(drawing)

    left_distance = left
    right_distance = length - right - 1

    drawing = np.roll(drawing, int((right_distance - left_distance)/2), axis=1)

    high_distance = height - high - 1
    low_distance = low

    drawing = np.roll(drawing, int((high_distance - low_distance)/2), axis=0)

    return drawing


