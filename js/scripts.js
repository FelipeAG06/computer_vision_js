const videoInput = document.getElementById('inputVideo');
const canvasInput = document.getElementById('buffer');
const canvasOverlay = document.getElementById('overlay');
const debugOverlay = document.getElementById('debug');
const overlayContext = canvasOverlay.getContext('2d');


canvasOverlay.style.position = 'absolute';
canvasOverlay.style.top = '0px';
canvasOverlay.style.zIndex = '100001';
canvasOverlay.style.display = 'block';

let htracker = new headtrackr.Tracker({
    altVideo: {webm: '../video/SteveJobs2005.webm'},
    calcAngles: true,
    ui: true,
    headPosition: true,
    debug: debugOverlay
});


htracker.init(videoInput, canvasInput);
htracker.start();

document.addEventListener('facetrackingEvent', (event) => {
    overlayContext.clearRect(0, 0, 320, 240);
    if (event.detection == 'CS') {
        overlayContext.translate(event.x, event.y);
        overlayContext.rotate(event.angle - (Math.PI / 2));
        overlayContext.strokeStyle = '#00CC00';
        overlayContext.strokeRect((-event.width / 2) >> 0, (-event.height / 2) >> 0, event.width, event.height);
        overlayContext.rotate((Math.PI / 2) - event.angle);
        overlayContext.translate(-event.x, -event.y);
    }
});

let reinitiate = () => {
    htracker.stop(); 
    htracker.start()
};