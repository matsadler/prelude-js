// # Haskell-ish functions for javascript.
// 

// ## not :: a -> Boolean
// 
function not(x) {
	return !x;
}

// ## compare :: a -> a -> Number
// 
// Returns -1 if the first argument is less than the second, 1 if greater, 0
// otherwise.
// 
function compare(x, y) {
	if (x < y) {
		return -1;
	}
	if (x > y) {
		return 1;
	}
	return 0;
}

// ## max :: a -> a -> a
// 
// Returns the greater of the two arguments.
// 
function max(x, y) {
	if (x > y) {
		return x;
	}
	return y;
}

// ## min :: a -> a -> a
// 
// Returns the lesser of the two arguments.
// 
function min(x, y) {
	if (x < y) {
		return x;
	}
	return y;
}

// ## negate :: Number -> Number
// 
function negate(x) {
	return -x;
}

// ## abs :: Number -> Number
// 
var abs = Math.abs;

// ## signum :: Number -> Number
// 
function signum(x) {
	if (x > 0) {
		return 1;
	}
	if (x === 0) {
		return 0;
	}
	return -1;
}

// ## quot :: Number -> Number -> Number
// 
// Interger devision truncated towards zero, e.g. `quot(-3, 2) //=> -1`.
// 
function quot(x, y) {
	return truncate(x / y);
}

// ## rem :: Number -> Number -> Number
// 
// Integer remainder such that `quot(x, y) * y + rem(x, y) === x`.
// 
// This is the same as the standard Javascript `%` operator.
// 
function rem(x, y) {
	return x % y;
}

// ## div :: Number -> Number -> Number
// 
// Interger devision truncated towards negative infinity, e.g.
// `quot(-3, 2) //=> -2`
// 
function div(x, y) {
	return floor(x / y);
}

// ## mod :: Number -> Number -> Number
// 
// Integer modulus such that `div(x, y) * y + mod(x, y) === x`.
// 
// This is not quite the same as the Javascript `%`, see `rem`.
// 
function mod(x, y) {
	return x - div(x, y) * y;
}

// ## quotRem :: Number -> Number -> [Number, Number]
// 
function quotRem(x, y) {
	return [quot(x, y), rem(x, y)];
}

// ## divMod :: Number -> Number -> (Number, Number)
// 
function divMod(x, y) {
	return [div(x, y), mod(x, y)];
}

// ## recip :: Number -> Number
// 
function recip(x) {
	return 1 / x;
}

// ## pi :: Number
// 
var pi = Math.pi;

// ## exp :: Number -> Number
// 
var exp = Math.exp;

// ## sqrt :: Number -> Number
// 
var sqrt = Math.sqrt;

// ## log :: Number -> Number
// 
var log = Math.log;

// ## sin :: Number -> Number
// 
var sin = Math.sin;

// ## tan :: Number -> Number
// 
var tan = Math.tan;

// ## cos :: Number -> Number
// 
var cos = Math.cos;

// ## asin :: Number -> Number
// 
var asin = Math.asin;

// ## atan :: Number -> Number
// 
var atan = Math.atan;

// ## acos :: Number -> Number
// 
var acos = Math.acos;

// ## truncate :: Number -> Number
// 
// `truncate(x)` returns the integer nearest `x`, between 0 and `x`, e.g.
// 
//     truncate(1.5)    //=> 1
//     truncate(-1.5)   //=> -1
// 
function truncate(x) {
	if (x > 0) {
		return floor(x);
	}
	return ceiling(x);
}

// ## round :: Number -> Number
// 
// Returns the nearest integer. .5 rounds towards 0.
// 
var round = Math.round;

// ## ceiling :: Number -> Number
// 
// Returns the nearest integer not less than the number supplied.
// 
var ceiling = Math.ceil;

// ## floor :: Number -> Number
// 
// Returns the nearest integer not greater than the number supplied.
// 
var floor = Math.floor;

// ## isInfinite :: Number -> Boolean
// 
function isInfinite(x) {
	return (typeof x === "number") && !isNaN(x) && !isFinite(x);
}

// ## isNegativeZero :: Number -> Boolean
// 
function isNegativeZero(x) {
	return x === 0 && (1 / x) === -Infinity;
}

// ## atan2 :: Number -> Number -> Number
// 
var atan2 = Math.atan2;

// ## even :: Number -> Boolean
// 
function even(x) {
	return x % 2 === 0;
}

// ## odd :: Number -> Boolean
// 
function odd(x) {
	return x % 2 !== 0;
}

// ## id :: a -> a
// 
// Identity. Simply returns its argument.
// 
function id(x) {
	return x;
}

// ## compose :: (b -> c) -> (a -> b) -> a -> c
// 
// Takes two functions and returns a new function that applies the first to the
// result of the second applied to its arguments.
// 
function compose(funcA, funcB) {
	return function () {
		return funcA(funcB.apply(this, arguments));
	};
}

// ## partial :: (a -> b -> c) -> a -> (b -> c)
// 
// Takes a function and an argument and applies that argument, returning a
// function that takes one less argument.
// 
function partial(func, arg) {
	return function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(arg);
		return func.apply(this, args);
	};
}

// ## flip :: (a -> b -> c) -> b -> a -> c
// 
// Returns a function the same as the supplied function, with the first two
// arguments reversed.
// 
function flip(func) {
	return function () {
		var args = Array.prototype.slice.call(arguments),
			a = args[0],
			b = args[1];
		args[0] = b;
		args[1] = a;
		return apply(func, args);
	};
}

// call :: (a -> b) -> a -> b
// 
// `call(foo, bar, baz)` calls the function `foo` with the arguments `bar` and
// `baz`, and is equivalent to `foo(bar, baz)`.
// 
function call(func) {
	return func.apply(this, arguments);
}

// apply :: (a -> b) -> [a] -> b
// 
// `call(foo, [bar, baz])` calls the function `foo` with the arguments `bar` and
// `baz`, and is equivalent to `foo(bar, baz)`.
// 
function apply(func, args) {
	return func.apply(this, args);
}

// ## until :: (a -> Bool) -> (a -> a) -> a -> a
// 
//     until(function (x) {
//         return x === 5;
//     }, function (x) {
//         return x + 1;
//     }, 0)   // => 5
// 
function until(predicate, func, value) {
	while (!predicate(value)) {
		value = func(value);
	}
	return value;
}

// ## error :: String -> undefined
// 
function error(message) {
	throw new Error(message);
}

// ## each :: [a] -> (a -> b) -> [a]
// 
// Applies a function to each element in an array, returning the original array.
// 
// This wouldn't be useful in a pure functional context, but in a language like
// JavaScript where site effects are possible it can be handy.
// 
function each(array, func) {
	var i;
	for (i = 0; i < array.length; i += 1) {
		func.call({}, array[i]);
	}
	return array;
}

// ## map :: [a] -> (a -> b) -> [b]
// 
// Applies a function to each element in an array, returning a new array of the
// results.
// 
function map(array, func) {
	return foldl([], array, function (acc, element) {
		return append(acc, [func(element)]);
	});
}

// ## append :: [a] -> [a] -> [a]
// 
// Adds the second array to the end of the first.
// 
function append(arrayA, arrayB) {
	return arrayA.concat(arrayB);
}

// ## filter :: [a] -> (a -> Boolean) -> [a]
// 
// Applies a function to each element in an array, returning an array of only
// the elements for which true was returned.
// 
function filter(array, func) {
	return foldl([], array, function(acc, element) {
		if (func(element)) {
			acc = append(acc, [element]);
		}
		return acc;
	});
}

// ## partition :: [a] -> (a -> Boolean) -> [[a], [a]]
// 
// Applies a function to each element in an array, returning a pair of arrays,
// the first of the elements for which true was returned, the second the
// elements for which false was returned.
// 
function partition(array, func) {
	return foldl([[], []], array, function (acc, element) {
		var pass = acc[0],
			fail = acc[1];
		if (func(element)) {
			pass = append(pass, [element]);
		} else {
			fail = append(fail, [element]);
		}
		return [pass, fail];
	});
}

// ## foldl :: a -> [b] -> (a -> b -> a) -> a
// 
// Reduces the array from the left, supplying the starting value and the first
// element to the function, then the result of that to the function with the
// second element, and so on.
// 
function foldl(acc, array, func) {
	each(array, function (element) {
		acc = func(acc, element);
	});
	return acc;
}

// ## all :: [a] -> (a -> Boolean) -> Boolean
// 
// Returns true if the function returns true for all elements in the array,
// false otherwise.
// 
function all(array, func) {
	return foldl(true, array, function (acc, element) {
		return acc && func(element);
	});
}

// ## elem :: a -> [a] -> Boolean
// 
// Returns true if element is in the array, false otherwise.
// 
function elem(obj, array) {
	return array.indexOf(obj) >= 0;
}

// ## words :: String -> [String]
// 
// Splits a string around whitespace into an array of strings.
// 
function words(string) {
	return string.split(/\s/);
}
