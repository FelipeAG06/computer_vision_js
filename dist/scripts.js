'use strict';

var imagePath = '../img/apple.jpg';

var canvas = document.getElementById('initCanvas');
var context = canvas.getContext('2d');
var image = new Image();

image.src = imagePath;

var trackCustom = function trackCustom() {

    var tracker = new tracking.ColorTracker('darkRed');

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

    tracking.track(canvas, tracker);
};

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
    // trackCustom();
};