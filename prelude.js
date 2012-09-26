/*jslint vars: true, unparam: true */

// # Haskell-ish functions for javascript.
// 
(function () {
	var prelude = {};
	
	if (typeof exports === "object") {
		module.exports = prelude;
	} else {
		this.prelude = prelude;
	}
	
	// prelude.importUnqualified(object[, functionNames])
	// 
	// Add functions as properties of object. If the global object is supplied
	// then the functions will be available unqualified.
	// 
	// before:
	// 
	//     prelude.sum([1, 2, 3])   //=> 6
	// 
	// after:
	// 
	//     prelude.importUnqualified(this);
	//     sum([1, 2, 3])           //=> 6
	// 
	prelude.importUnqualified = function importUnqualified(object) {
		var fs = tail(arguments),
			f;
		for (f in this) {
			if (this.hasOwnProperty(f) && (fs.length === 0 || elem(fs, f))) {
				object[f] = this[f];
			}
		}
	};
	
	// ## not :: a -> Boolean
	// 
	prelude.not = function not(x) {
		return !x;
	};

	// ## compare :: a -> a -> Number
	// 
	// Returns -1 if the first argument is less than the second, 1 if greater, 0
	// otherwise.
	// 
	prelude.compare = function compare(x, y) {
		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	};

	// ## max :: a -> a -> a
	// 
	// Returns the greater of the two arguments.
	// 
	prelude.max = function max(x, y) {
		if (x > y) {
			return x;
		}
		return y;
	};

	// ## min :: a -> a -> a
	// 
	// Returns the lesser of the two arguments.
	// 
	prelude.min = function min(x, y) {
		if (x < y) {
			return x;
		}
		return y;
	};

	// ## negate :: Number -> Number
	// 
	prelude.negate = function negate(x) {
		return -x;
	};

	// ## abs :: Number -> Number
	// 
	prelude.abs = Math.abs;

	// ## signum :: Number -> Number
	// 
	prelude.signum = function signum(x) {
		if (x > 0) {
			return 1;
		}
		if (x === 0) {
			return 0;
		}
		return -1;
	};

	// ## quot :: Number -> Number -> Number
	// 
	// Interger devision truncated towards zero, e.g. `quot(-3, 2) //=> -1`.
	// 
	var quot = prelude.quot = function quot(x, y) {
		return truncate(x / y);
	};

	// ## rem :: Number -> Number -> Number
	// 
	// Integer remainder such that `quot(x, y) * y + rem(x, y) === x`.
	// 
	// This is the same as the standard Javascript `%` operator.
	// 
	var rem = prelude.rem = function rem(x, y) {
		return x % y;
	};

	// ## div :: Number -> Number -> Number
	// 
	// Interger devision truncated towards negative infinity, e.g.
	// `quot(-3, 2) //=> -2`
	// 
	var div = prelude.div = function div(x, y) {
		return floor(x / y);
	};

	// ## mod :: Number -> Number -> Number
	// 
	// Integer modulus such that `div(x, y) * y + mod(x, y) === x`.
	// 
	// This is not quite the same as the Javascript `%`, see `rem`.
	// 
	var mod = prelude.mod = function mod(x, y) {
		return x - div(x, y) * y;
	};

	// ## quotRem :: Number -> Number -> [Number, Number]
	// 
	prelude.quotRem = function quotRem(x, y) {
		return [quot(x, y), rem(x, y)];
	};

	// ## divMod :: Number -> Number -> (Number, Number)
	// 
	prelude.divMod = function divMod(x, y) {
		return [div(x, y), mod(x, y)];
	};

	// ## recip :: Number -> Number
	// 
	prelude.recip = function recip(x) {
		return 1 / x;
	};

	// ## pi :: Number
	// 
	prelude.pi = Math.pi;

	// ## exp :: Number -> Number
	// 
	prelude.exp = Math.exp;

	// ## sqrt :: Number -> Number
	// 
	prelude.sqrt = Math.sqrt;

	// ## log :: Number -> Number
	// 
	prelude.log = Math.log;

	// ## sin :: Number -> Number
	// 
	prelude.sin = Math.sin;

	// ## tan :: Number -> Number
	// 
	prelude.tan = Math.tan;

	// ## cos :: Number -> Number
	// 
	prelude.cos = Math.cos;

	// ## asin :: Number -> Number
	// 
	prelude.asin = Math.asin;

	// ## atan :: Number -> Number
	// 
	prelude.atan = Math.atan;

	// ## acos :: Number -> Number
	// 
	prelude.acos = Math.acos;

	// ## truncate :: Number -> Number
	// 
	// `truncate(x)` returns the integer nearest `x`, between 0 and `x`, e.g.
	// 
	//     truncate(1.5)    //=> 1
	//     truncate(-1.5)   //=> -1
	// 
	prelude.truncate = function truncate(x) {
		if (x > 0) {
			return floor(x);
		}
		return ceiling(x);
	};

	// ## round :: Number -> Number
	// 
	// Returns the nearest integer. .5 rounds towards 0.
	// 
	prelude.round = Math.round;

	// ## ceiling :: Number -> Number
	// 
	// Returns the nearest integer not less than the number supplied.
	// 
	prelude.ceiling = Math.ceil;

	// ## floor :: Number -> Number
	// 
	// Returns the nearest integer not greater than the number supplied.
	// 
	prelude.floor = Math.floor;

	// ## isInfinite :: Number -> Boolean
	// 
	prelude.isInfinite = function isInfinite(x) {
		return (typeof x === "number") && !isNaN(x) && !isFinite(x);
	};

	// ## isNegativeZero :: Number -> Boolean
	// 
	prelude.isNegativeZero = function isNegativeZero(x) {
		return x === 0 && (1 / x) === -Infinity;
	};

	// ## atan2 :: Number -> Number -> Number
	// 
	prelude.atan2 = Math.atan2;

	// ## even :: Number -> Boolean
	// 
	prelude.even = function even(x) {
		return x % 2 === 0;
	};

	// ## odd :: Number -> Boolean
	// 
	prelude.odd = function odd(x) {
		return x % 2 !== 0;
	};

	// ## id :: a -> a
	// 
	// Identity. Simply returns its argument.
	// 
	var id = prelude.id = function id(x) {
		return x;
	};

	// ## compose :: (b -> c) -> (a -> b) -> a -> c
	// 
	// Takes two functions and returns a new prelude.that = function that
	// applies the first to the result of the second applied to its arguments.
	// 
	prelude.compose = function compose(funcA, funcB) {
		return function () {
			return funcA(funcB.apply(this, arguments));
		};
	};

	// ## partial :: (a -> b -> c) -> a -> (b -> c)
	// 
	// Takes a prelude.and = function and an argument and applies that
	// argument, returning a prelude.that = function that takes one less
	// argument.
	// 
	prelude.partial = function partial(func, arg) {
		return function () {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(arg);
			return func.apply(this, args);
		};
	};

	// ## flip :: (a -> b -> c) -> b -> a -> c
	// 
	// Returns a prelude.the = function the same as the supplied function, with
	// the first two arguments reversed.
	// 
	var flip = prelude.flip = function flip(func) {
		return function () {
			var args = Array.prototype.slice.call(arguments),
				a = args[0],
				b = args[1];
			args[0] = b;
			args[1] = a;
			return apply(func, args);
		};
	};

	// call :: (a -> b) -> a -> b
	// 
	// `call(foo, bar, baz)` calls the function `foo` with the arguments `bar`
	// and `baz`, and is equivalent to `foo(bar, baz)`.
	// 
	prelude.call = function call(func) {
		return func.apply(this, arguments);
	};

	// apply :: (a -> b) -> [a] -> b
	// 
	// `call(foo, [bar, baz])` calls the function `foo` with the arguments
	// `bar` and `baz`, and is equivalent to `foo(bar, baz)`.
	// 
	prelude.apply = function apply(func, args) {
		return func.apply(this, args);
	};

	// ## until :: (a -> Bool) -> (a -> a) -> a -> a
	// 
	//     until(function (x) {
	//         return x === 5;
	//     }, function (x) {
	//         return x + 1;
	//     }, 0)   // => 5
	// 
	prelude.until = function until(predicate, func, value) {
		while (!predicate(value)) {
			value = func(value);
		}
		return value;
	};

	// ## error :: String -> undefined
	// 
	prelude.error = function error(message) {
		throw new Error(message);
	};

	// ## each :: [a] -> (a -> b) -> [a]
	// 
	// Applies a prelude.to = function to each element in an array, returning
	// the original array.
	// 
	// This wouldn't be useful in a pure functional context, but in a language
	// like JavaScript where site effects are possible it can be handy.
	// 
	var each = prelude.each = function each(array, func) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			func.call({}, array[i]);
		}
		return array;
	};

	// ## map :: [a] -> (a -> b) -> [b]
	// 
	// Applies a prelude.to = function to each element in an array, returning a
	// new array of the results.
	// 
	prelude.map = function map(array, func) {
		return foldl([], array, function (acc, element) {
			return append(acc, [func(element)]);
		});
	};

	// ## append :: [a] -> [a] -> [a]
	// 
	// Adds the second array to the end of the first.
	// 
	var append = prelude.append = Array.prototype.concat.call;

	// ## filter :: [a] -> (a -> Boolean) -> [a]
	// 
	// Applies a prelude.to = function to each element in an array, returning
	// an array of only the elements for which true was returned.
	// 
	prelude.filter = function filter(array, func) {
		return foldl([], array, function(acc, element) {
			if (func(element)) {
				acc = append(acc, [element]);
			}
			return acc;
		});
	};

	// ## partition :: [a] -> (a -> Boolean) -> [[a], [a]]
	// 
	// Applies a prelude.to = function to each element in an array, returning a
	// pair of arrays, the first of the elements for which true was returned,
	// the second the elements for which false was returned.
	// 
	prelude.partition = function partition(array, func) {
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
	};

	// ## head :: [a] -> a
	// 
	// Returns the first element of an array.
	// 
	var head = prelude.head = function head(array) {
		return array[0];
	};

	// ## last :: [a] -> a
	// 
	// Returns the last element of an array.
	// 
	var last = prelude.last = function last(array) {
		return array[array.length - 1];
	};

	// ## tail :: [a] -> [a]
	// 
	// Returns all the elements after the first element of an array.
	// 
	var tail = prelude.tail = function tail(array) {
		return Array.prototype.slice.call(array, 1);
	};

	// ## init :: [a] -> [a]
	// 
	// Returns all the elements except the last element of an array.
	// 
	var init = prelude.init = function init(array) {
		return Array.prototype.slice.call(array, 0, -1);
	};

	// ## null_ :: [a] -> Boolean
	// 
	// Returns true if an array is empty, false otherwise.
	// 
	prelude.null_ = function null_(array) {
		return array.length === 0;
	};

	// ## length :: [a] -> Number
	// 
	// Returns the length of an array. O(1).
	// 
	prelude.length = function length(array) {
		return array.length;
	};

	// ## reverse :: [a] -> [a]
	// 
	var reverse = prelude.reverse = function reverse(array) {
		return Array.prototype.reverse.call(array);
	};

	// ## foldl :: a -> [b] -> (a -> b -> a) -> a
	// 
	// Reduces the array from the left, supplying the starting value and the
	// first element to the function, then the result of that to the
	// prelude.with = function with the second element, and so on.
	// 
	var foldl = prelude.foldl = function foldl(acc, array, func) {
		each(array, function (element) {
			acc = func(acc, element);
		});
		return acc;
	};

	// ## foldl1 :: [a] -> (a -> a -> a) -> a
	// 
	var foldl1 = prelude.foldl1 = function foldl1(array, func) {
		return foldl(head(array), tail(array), func);
	};

	// ## foldr :: a -> [b] -> (b -> a -> a) -> a
	// 
	var foldr = prelude.foldr = function foldr(acc, array, func) {
		return foldl(acc, reverse(array), flip(func));
	};

	// ## foldr1 :: [a] -> (a -> a -> a) -> a
	// 
	prelude.foldr1 = function foldr1(array, func) {
		return foldr(last(array), init(array), func);
	};

	// ## and :: [a] -> Boolean
	// 
	prelude.and = function and(array) {
		return all(array, id);
	};

	// ## or :: [a] -> Boolean
	// 
	prelude.or = function or(array) {
		return any(array, id);
	};

	// ## any :: [a] -> (a -> Boolean) -> Boolean
	// 
	// Returns true if the prelude.returns = function returns true for any
	// element in the array, false otherwise.
	// 
	prelude.any = function any(array, func) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			if (func(array[i])) {
				return true;
			}
		}
		return false;
	};

	// ## all :: [a] -> (a -> Boolean) -> Boolean
	// 
	// Returns false if the prelude.returns = function returns false any
	// element in the array, true otherwise.
	// 
	prelude.all = function all(array, func) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			if (!func(array[i])) {
				return false;
			}
		}
		return true;
	};

	// ## sum :: [Number] -> Number
	// 
	prelude.sum = function sum(array) {
		return foldl(0, array, function (acc, x) {
			return acc + x;
		});
	};

	// ## product :: [Number] -> Number
	// 
	prelude.product = function product(array) {
		return foldl(0, array, function (acc, x) {
			return acc * x;
		});
	};

	// ## concat :: [[a]] -> [a]
	// 
	prelude.concat = function concat(array) {
		return foldl1(array, append);
	};

	// ## concatMap :: [a] -> (a -> [b]) -> [b]
	// 
	prelude.concatMap = function concatMap(array, func) {
		return foldl([], array, function (acc, element) {
			return append(acc, func(element));
		});
	};

	// ## elem :: a -> [a] -> Boolean
	// 
	// Returns true if element is in the array, false otherwise.
	// 
	prelude.elem = function elem(obj, array) {
		return Array.prototype.indexOf.call(array, obj) >= 0;
	};

	// ## words :: String -> [String]
	// 
	// Splits a string around whitespace into an array of strings.
	// 
	prelude.words = function words(string) {
		return string.split(/\s/);
	};
}());