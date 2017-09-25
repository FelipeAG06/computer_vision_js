let canvas = document.getElementById('initCanvas');
let context = canvas.getContext('2d');

const trackFace = () => {
    const tracker = new tracking.ObjectTracker('face');
    
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    
    tracker.on('track', (event) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        _.each(event.data, (rect) => {
            drawRect(rect.x, rect.y, rect.width, rect.height);
        });
    });

    const drawRect = (x, y, w, h) => {
        context.lineWidth = '4';
        context.strokeStyle = 'red';
        context.strokeRect(x, y, w, h);
    }

    tracking.track('#video', tracker, {camera: true});
}


window.onload = () => trackFace();