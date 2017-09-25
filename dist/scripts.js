'use strict';

var canvas = document.getElementById('initCanvas');
var context = canvas.getContext('2d');

var trackFace = function trackFace() {
    var tracker = new tracking.ObjectTracker('face');

    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        _.each(event.data, function (rect) {
            drawRect(rect.x, rect.y, rect.width, rect.height);
        });
    });

    var drawRect = function drawRect(x, y, w, h) {
        context.lineWidth = '4';
        context.strokeStyle = 'red';
        context.strokeRect(x, y, w, h);
    };

    tracking.track('#video', tracker, { camera: true });
};

window.onload = function () {
    return trackFace();
};