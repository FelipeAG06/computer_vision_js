'use strict';

var canvas = document.getElementById('initCanvas');
var context = canvas.getContext('2d');

var trackVideo = function trackVideo() {
    var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        _.each(event.data, function (rect) {
            drawRect(rect.x, rect.y, rect.width, rect.height, rect.color);
        });
    });

    var drawRect = function drawRect(x, y, w, h, color) {
        context.lineWidth = '4';
        context.strokeStyle = color;
        context.strokeRect(x, y, w, h);
    };

    tracking.track('#video', tracker, { camera: true });
};

window.onload = function () {
    return trackVideo();
};