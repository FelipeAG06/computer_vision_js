let canvas = document.getElementById('initCanvas');
let imageWrapper = document.getElementById('imageWrapper');

const theFoos = ['Pat Smear', 'Nate Mendel', 'Dave Grohl', 'Taylor Hawkins',
'Chris Shiftlett']

const trackFace = () => {
    const tracker = new tracking.ObjectTracker('face');

    tracker.on('track', (event) => {
        let data = event.data;
        data.sort((a, b) => {
            return b.x - a.x;
        });

        data = data.filter((element) => {
            return element.width >= 50;
        });

        _.each(event.data, (rect) => {
            drawRect(rect.x, rect.y, rect.width, rect.height);
        });
    });

    const drawRect = (x, y, w, h) => {
        let rect = document.createElement('div');
        let name = document.createElement('input');

        name.value = theFoos.pop();
        rect.appendChild(name);

        imageWrapper.appendChild(rect);

        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (image.offsetLeft + x) + 'px';
        rect.style.top = (image.offsetTop + y) + 'px';
        rect.style.position = 'absolute';
        rect.style.border = '3px solid white';
    }

    tracking.track('#image', tracker);
}

window.onload = () => trackFace();