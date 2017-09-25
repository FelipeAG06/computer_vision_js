'use strict';

var canvas = document.getElementById('initCanvas');
var imageWrapper = document.getElementById('imageWrapper');

var theFoos = ['Pat Smear', 'Nate Mendel', 'Dave Grohl', 'Taylor Hawkins', 'Chris Shiftlett'];

var trackFace = function trackFace() {
    var tracker = new tracking.ObjectTracker('face');

    tracker.on('track', function (event) {
        var data = event.data;
        data.sort(function (a, b) {
            return b.x - a.x;
        });

        data = data.filter(function (element) {
            return element.width >= 50;
        });

        _.each(event.data, function (rect) {
            drawRect(rect.x, rect.y, rect.width, rect.height);
        });
    });

    var drawRect = function drawRect(x, y, w, h) {
        var rect = document.createElement('div');
        var name = document.createElement('input');

        name.value = theFoos.pop();
        rect.appendChild(name);

        imageWrapper.appendChild(rect);

        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = image.offsetLeft + x + 'px';
        rect.style.top = image.offsetTop + y + 'px';
        rect.style.position = 'absolute';
        rect.style.border = '3px solid white';
    };

    tracking.track('#image', tracker);
};

window.onload = function () {
    return trackFace();
};