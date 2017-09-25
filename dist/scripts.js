'use strict';

var imgPath = '../img/flowers.jpg';

var canvas = document.getElementById('initCanvas');
var context = canvas.getContext('2d');
var image = new Image();

image.src = imgPath;

var trackColors = function trackColors() {
    var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    tracker.on('track', function (event) {
        _.each(event.data, function (rect) {
            drawRect(rect.x, rect.y, rect.width, rect.height, rect.color);
        });
    });

    var drawRect = function drawRect(x, y, w, h, color) {
        context.lineWidth = '4';
        context.strokeStyle = color;
        context.strokeRect(x, y, w, h);
    };

    tracking.track('#initCanvas', tracker);
};

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
    trackColors();
};