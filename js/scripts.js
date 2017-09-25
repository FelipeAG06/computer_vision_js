const imgPath = '../img/bulldog.jpg';
const canvasClass = 'canvas-img';

let canvas = document.getElementById('initCanvas');
let context = canvas.getContext('2d'); 
let image = new Image();

image.src = imgPath;

image.onload = () => {
    const canvasParent = document.getElementById('images');
    const cols = image.width;
    const rows = image.height;
    canvas.width = cols;
    canvas.height = rows;
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, cols, rows);

    const imageData = context.getImageData(0, 0, cols, rows);
    
    
    let dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
    let matrix = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

    let grayImage = new jsfeat.matrix_t(matrix.cols, matrix.rows, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.grayscale(matrix.data, matrix.cols, matrix.rows, grayImage);

    //Apply Gaussian filter
    const kernelSize = 5;
    let blurredImage = new jsfeat.matrix_t(matrix.cols, matrix.rows, jsfeat.U8C1_t);
    jsfeat.imgproc.gaussian_blur(grayImage, blurredImage, kernelSize);
    
    drawMat(blurredImage, canvasParent, canvasClass);
}