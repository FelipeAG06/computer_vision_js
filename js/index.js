(function() {
    var matrix = new jsfeat.matrix_t(2, 2, jsfeat.U8_t | jsfeat.C1_t);
    
    matrix.data[1] = 1;
    matrix.data[5] = 3;

    for(var i = 0; i < matrix.rows; i++) {
        var start =  i * matrix.cols;
        console.log(matrix.data.subarray(start, start + matrix.cols));
    }
})();