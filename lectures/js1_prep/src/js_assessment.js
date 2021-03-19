// Write a function, `deepDup(arr)`, that will perform a "deep" duplication of
// the array and any interior arrays. A deep duplication means that the array 
// itself, as well as any nested arrays (no matter how deeply nested) are duped 
// and are completely different objects in memory than those in the original 
// array.

function deepDup(arr) {
  let result = [];

  arr.forEach((el) => {
    if (el instanceof Array) {
      result.push(deepDup(el))
    } else {
      result.push(el);
    }
  })

  return result;
}


// Write an `Array.prototype.twoSum` method, that finds all pairs of positions 
// where the elements at those positions sum to zero.

// NB: ordering matters. Each pair must be sorted with the smaller index
// before bigger index. The array of pairs must be sorted
// "dictionary-wise":
// [0, 2] before [1, 2] (smaller first elements come first)
// [0, 1] before [0, 2] (then smaller second elements come first)

Array.prototype.twoSum = function() {
  const pairs = [];
  
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if ((this[i] + this[j]) === 0) {
        pairs.push([i, j])
      }
    }
  }

  return pairs;
};


// Write a `String.prototype.symmetricSubstrings` method that returns an array
// of substrings which are palindromes in alphabetical order. Only include 
// substrings of length > 1.
// e.g. "cool".symmetricSubstrings() => ["oo"]

String.prototype.symmetricSubstrings = function() {
  const result = [];
  
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = i + 1; j <= this.length; j++) {
      let sub = this.slice(i, j);
      let reversed = sub.split('').reverse().join('');
      if (sub === reversed && sub.length > 1) {
        result.push(sub);
      }
    }
  }

  return result.sort();
};


// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. Do NOT use the built-in
// `Array.prototype.forEach`.
Array.prototype.myEach = function(callback) {
  for (let i = 0;  i < this.length; i++) {
    callback(this[i]);
  }
};


// Write an `Array.prototype.myReduce(callback, acc)` method which takes a 
// callback and an optional argument of a default accumulator. If myReduce only 
// receives one argument, then use the first element of the array as the default 
// accumulator. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call in the built-in `Array.prototype.reduce` or `Array.prototype.forEach` 
// methods.

Array.prototype.myReduce = function(callback, acc) {
  let arr = this.slice();

  if (!acc) {
    acc = arr.shift();
  }

  arr.myEach((el) => {
    acc = callback(acc, el);
  })

  return acc;
};


// Write an `Array.prototype.bubbleSort(callback)` method, that bubble sorts an array.
// It should take an optional callback that compares two elements, returning
// -1 if the first element should appear before the second, 0 if they are
// equal, and 1 if the first element should appear after the second. Do NOT call
// the built-in `Array.prototype.sort` method in your implementation. Also, do NOT
// modify the original array.
//
// Here's a quick summary of the bubble sort algorithm:
//
// Iterate over the elements of the array. If the current element is unsorted
// with respect to the next element, swap them. If any swaps are made before
// reaching the end of the array, repeat the process. Otherwise, return the
// sorted array.
function comp(el1, el2) {
  if (el1 < el2) {
    return -1;
  } else if (el1 === el2) {
    return 0;
  } else {
    return 1;
  }
}

Array.prototype.bubbleSort = function(callback) {
  let arr = this.slice();

  if (!callback) {
    callback = comp;
  }

  let sorted = false;

  while(!sorted) {
    sorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if ((callback(arr[i], arr[j])) === 1) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          sorted = false;
        }
      }
    }
  }

  return arr;
};



// Write a `Function.prototype.inherits(ParentClass)` method. It should extend
// the methods of `ParentClass.prototype` to `ChildClass.prototype`.
//
// **Do NOT use `Object.create`, `Object.assign`, `Object.setPrototypeOf`, or
// modify the `__proto__` property of any object directly.**

Function.prototype.inherits = function(ParentClass) {
  function Surrogate() {}
  Surrogate.prototype = ParentClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};


// Write a `Function.prototype.myCurry(numArgs)` method that collects arguments 
// until the number of arguments collected is equal to the original `numArgs` 
// value and then invokes the curried function.

Function.prototype.myCurry = function(numArgs) {
  const args = [];
  const func = this;

  return function _curry(arg) {
    args.push(arg)

    if (args.length === numArgs) {
      return func.apply(null, args)
    } else {
      return _curry
    }
  }
};



// Write a `Function.prototype.myCall(context)` method, that accepts an object, 
// and any number of additional arguments. It should call the function with the
// passed-in object as `this`, also passing the remaining arguments. Do NOT use
// the built-in `Function.prototype.call` or `Function.prototype.apply` methods 
// in your implementation.

Function.prototype.myCall = function(context, ...args) {
  return this.bind(context)(...args);
};


