(function() {
    var canvas = document.getElementById('initCanvas'),
	context = canvas.getContext('2d'),
	image = new Image();

	image.src = '../img/sw01.jpg';

	image.onload = function() {
		var cols = image.width;
        var rows = image.height;
        canvas.width = cols;
        canvas.height = rows;
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, cols, rows);

        var canvasParent = document.getElementById('images');
        var imageData = context.getImageData(0, 0, cols, rows);
        
        
        var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
        var matrix = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

        var grayImage = new jsfeat.matrix_t(matrix.cols, matrix.rows, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(matrix.data, matrix.cols, matrix.rows, grayImage);

        drawMat(grayImage, canvasParent, 'canvas-img');
    }
})();