const imagePath = '../img/apple.jpg';

let canvas = document.getElementById('initCanvas');
let context = canvas.getContext('2d');
let image = new Image();

image.src = imagePath;

const trackCustom = () => {
    tracking.ColorTracker.registerColor('darkRed', (r, g, b) => {
        return r > 110 && g < 90 && b < 90;
    });

    const tracker = new tracking.ColorTracker('darkRed');

    tracker.on('track', (event) => {
        _.each(event.data, (rect) => {
            drawRect(rect.x, rect.y, rect.width, rect.height, rect.color);
        });
    });

    const drawRect = (x, y, w, h, color) => {
        context.lineWidth = '4';
        context.strokeStyle = color;
        context.strokeRect(x, y, w, h);
    }

    tracking.track(canvas, tracker);
}

image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
    trackCustom();
};