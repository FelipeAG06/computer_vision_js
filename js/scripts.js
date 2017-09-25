let canvas = document.getElementById('initCanvas');
let context = canvas.getContext('2d'); 

const trackVideo = () => {
    const tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    tracker.on('track', (event) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        _.each(event.data, (rect) => {
            drawRect(rect.x, rect.y, rect.width, rect.height, rect.color);
        });
    });

    const drawRect = (x, y, w, h, color) => {
        context.lineWidth = '4';
        context.strokeStyle = color;
        context.strokeRect(x, y, w, h);
    }

    tracking.track('#video', tracker, {camera: true});
}

window.onload = () => trackVideo();
