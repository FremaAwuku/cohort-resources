function doMathWithNumber(num, cb){
  return cb(num);
}

console.log(doMathWithNumber(5, (num) => {
  return num * num; 
}))

let superAdd = function(num1, num2, cb){
  debugger
  let sum = num1 + num2;
  let res = cb(sum);
  return res;
};

let doubler = function(n){
  debugger
  return 2 * n; 
};

let negate = function(n){
  return -1 * n;
};

superAdd(3, 2, doubler); //don't invoke cb 
// console.log(superAdd(1, 2, negate)); //don't invoke cb 












































