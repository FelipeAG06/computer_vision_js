let matrix = new jsfeat.matrix_t(2, 2, jsfeat.U8_t | jsfeat.C1_t);

matrix.data[1] = 1;
matrix.data[2] = 3;

for(let i = 0; i < matrix.rows; i++) {
    let start =  i * matrix.cols;
    console.log(matrix.data.subarray(start, start + matrix.cols));
}
