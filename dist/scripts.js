'use strict';

var imgPath = '../img/bulldog.jpg';
var canvasClass = 'canvas-img';

var canvas = document.getElementById('initCanvas');
var context = canvas.getContext('2d');
var image = new Image();

image.src = imgPath;

image.onload = function () {
    var canvasParent = document.getElementById('images');
    var cols = image.width;
    var rows = image.height;
    canvas.width = cols;
    canvas.height = rows;
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, cols, rows);

    var imageData = context.getImageData(0, 0, cols, rows);

    var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
    var matrix = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

    var grayImage = new jsfeat.matrix_t(matrix.cols, matrix.rows, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.grayscale(matrix.data, matrix.cols, matrix.rows, grayImage);

    //Apply Gaussian filter
    var kernelSize = 5;
    var blurredImage = new jsfeat.matrix_t(matrix.cols, matrix.rows, jsfeat.U8C1_t);
    jsfeat.imgproc.gaussian_blur(grayImage, blurredImage, kernelSize);

    drawMat(blurredImage, canvasParent, canvasClass);
};