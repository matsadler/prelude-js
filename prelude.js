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
	
	// #### prelude.importUnqualified(object[, functionNames])
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
	function importUnqualified(object) {
		var fs = tail(arguments),
			f;
		for (f in this) {
			if (this.hasOwnProperty(f) && (null_(fs) || elem(fs, f))) {
				object[f] = this[f];
			}
		}
	}
	prelude.importUnqualified = importUnqualified;

	// ## Boolean functions

	// #### not :: a -> Boolean
	// 
	function not(x) {
		return !x;
	}
	prelude.not = not;

	// ## Ordering functions

	// #### compare :: a -> a -> Number
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
	prelude.compare = compare;

	// #### max :: a -> a -> a
	// 
	// Returns the greater of the two arguments.
	// 
	function max(x, y) {
		if (x > y) {
			return x;
		}
		return y;
	}
	prelude.max = max;

	// #### min :: a -> a -> a
	// 
	// Returns the lesser of the two arguments.
	// 
	function min(x, y) {
		if (x < y) {
			return x;
		}
		return y;
	}
	prelude.min = min;

	// ## Numeric functions

	// #### negate :: Number -> Number
	// 
	function negate(x) {
		return -x;
	}
	prelude.negate = negate;

	// #### abs :: Number -> Number
	// 
	prelude.abs = Math.abs;

	// #### signum :: Number -> Number
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
	prelude.signum = signum;

	// #### quot :: Number -> Number -> Number
	// 
	// Interger devision truncated towards zero, e.g. `quot(-3, 2) //=> -1`.
	// 
	function quot(x, y) {
		return truncate(x / y);
	}
	prelude.quot = quot;

	// #### rem :: Number -> Number -> Number
	// 
	// Integer remainder such that `quot(x, y) * y + rem(x, y) === x`.
	// 
	// This is the same as the standard Javascript `%` operator.
	// 
	function rem(x, y) {
		return x % y;
	}
	prelude.rem = rem;

	// #### div :: Number -> Number -> Number
	// 
	// Interger devision truncated towards negative infinity, e.g.
	// `quot(-3, 2) //=> -2`
	// 
	function div(x, y) {
		return floor(x / y);
	}
	prelude.div = div;

	// #### mod :: Number -> Number -> Number
	// 
	// Integer modulus such that `div(x, y) * y + mod(x, y) === x`.
	// 
	// This is not quite the same as the Javascript `%`, see `rem`.
	// 
	function mod(x, y) {
		return x - div(x, y) * y;
	}
	prelude.mod = mod;

	// #### quotRem :: Number -> Number -> [Number, Number]
	// 
	function quotRem(x, y) {
		return [quot(x, y), rem(x, y)];
	}
	prelude.quotRem = quotRem;

	// #### divMod :: Number -> Number -> [Number, Number]
	// 
	function divMod(x, y) {
		return [div(x, y), mod(x, y)];
	}
	prelude.divMod = divMod;

	// #### recip :: Number -> Number
	// 
	function recip(x) {
		return 1 / x;
	}
	prelude.recip = recip;

	// #### pi :: Number
	// 
	prelude.pi = Math.pi;

	// #### exp :: Number -> Number
	// 
	prelude.exp = Math.exp;

	// #### sqrt :: Number -> Number
	// 
	prelude.sqrt = Math.sqrt;

	// #### log :: Number -> Number
	// 
	prelude.log = Math.log;

	// #### sin :: Number -> Number
	// 
	prelude.sin = Math.sin;

	// #### tan :: Number -> Number
	// 
	prelude.tan = Math.tan;

	// #### cos :: Number -> Number
	// 
	prelude.cos = Math.cos;

	// #### asin :: Number -> Number
	// 
	prelude.asin = Math.asin;

	// #### atan :: Number -> Number
	// 
	prelude.atan = Math.atan;

	// #### acos :: Number -> Number
	// 
	prelude.acos = Math.acos;

	// #### truncate :: Number -> Number
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
	prelude.truncate = truncate;

	// #### round :: Number -> Number
	// 
	// Returns the nearest integer. .5 rounds towards 0.
	// 
	prelude.round = Math.round;

	// #### ceiling :: Number -> Number
	// 
	// Returns the nearest integer not less than the number supplied.
	// 
	prelude.ceiling = Math.ceil;

	// #### floor :: Number -> Number
	// 
	// Returns the nearest integer not greater than the number supplied.
	// 
	prelude.floor = Math.floor;

	// #### isInfinite :: Number -> Boolean
	// 
	function isInfinite(x) {
		return (typeof x === "number") && !isNaN(x) && !isFinite(x);
	}
	prelude.isInfinite = isInfinite;

	// #### isNegativeZero :: Number -> Boolean
	// 
	function isNegativeZero(x) {
		return x === 0 && (1 / x) === -Infinity;
	}
	prelude.isNegativeZero = isNegativeZero;

	// #### atan2 :: Number -> Number -> Number
	// 
	prelude.atan2 = Math.atan2;

	// #### even :: Number -> Boolean
	// 
	function even(x) {
		return x % 2 === 0;
	}
	prelude.even = even;

	// #### odd :: Number -> Boolean
	// 
	function odd(x) {
		return x % 2 !== 0;
	}
	prelude.odd = odd;

	// ## Miscellaneous functions

	// #### id :: a -> a
	// 
	// Identity. Simply returns its argument.
	// 
	function id(x) {
		return x;
	}
	prelude.id = id;

	// #### compose :: (b -> c) -> (a -> b) -> a -> c
	// 
	// Takes two functions and returns a new function that applies the first to
	// the result of the second applied to its arguments.
	// 
	function compose(funcA, funcB) {
		return function () {
			return funcA(funcB.apply(this, arguments));
		};
	}
	prelude.compose = compose;

	// #### partial :: (a -> b -> c) -> a -> (b -> c)
	// 
	// Takes a function and an argument and applies that argument, returning a
	// function that takes one less argument.
	// 
	function partial(func) {
		var args = tail(arguments);
		return function () {
			var innerArgs = Array.prototype.slice.call(arguments);
			return apply(func, append(args, innerArgs));
		};
	}
	prelude.partial = partial;

	// #### flip :: (a -> b -> c) -> b -> a -> c
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
	prelude.flip = flip;

	// #### call :: (a -> b) -> a -> b
	// 
	// `call(foo, bar, baz)` calls the function `foo` with the arguments `bar`
	// and `baz`, and is equivalent to `foo(bar, baz)`.
	// 
	function call(func) {
		return func.apply(this, tail(arguments));
	}
	prelude.call = call;

	// #### apply :: (a -> b) -> [a] -> b
	// 
	// `apply(foo, [bar, baz])` calls the function `foo` with the arguments
	// `bar` and `baz`, and is equivalent to `foo(bar, baz)`.
	// 
	function apply(func, args) {
		return func.apply(this, args);
	}
	prelude.apply = apply;

	// #### until :: (a -> Boolean) -> (a -> a) -> a -> a
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
	prelude.until = until;

	// #### error :: String -> undefined
	// 
	function error(message) {
		throw new Error(message);
	}
	prelude.error = error;

	// #### each :: (a -> b) -> [a] -> [a]
	// 
	// Applies a function to each element in an array, returning the original
	// array.
	// 
	// This wouldn't be useful in a pure functional context, but in a language
	// like JavaScript where site effects are possible it can be handy.
	// 
	function each(func, array) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			func(array[i]);
		}
		return array;
	}
	prelude.each = each;

	// ## Array operations

	// #### map :: (a -> b) -> [a] -> [b]
	// 
	// Applies a function to each element in an array, returning a new array of
	// the results.
	// 
	function map(func, array) {
		return foldl(function (acc, element) {
			return append(acc, [func(element)]);
		}, [], array);
	}
	prelude.map = map;

	// #### append :: [a] -> [a] -> [a]
	// 
	// Adds the second array to the end of the first.
	// 
	function append(xs, ys) {
		return Array.prototype.concat.call(xs, ys);
	}
	prelude.append = append;

	// #### filter :: (a -> Boolean) -> [a] -> [a]
	// 
	// Applies a function to each element in an array, returning an array of
	// only the elements for which true was returned.
	// 
	function filter(func, array) {
		return foldl(function(acc, element) {
			if (func(element)) {
				acc = append(acc, [element]);
			}
			return acc;
		}, [], array);
	}
	prelude.filter = filter;

	// #### partition :: (a -> Boolean) -> [a] -> [[a], [a]]
	// 
	// Applies a function to each element in an array, returning a pair of
	// arrays, the first of the elements for which true was returned, the
	// second the elements for which false was returned.
	// 
	function partition(func, array) {
		return foldl(function (acc, element) {
			var pass = acc[0],
				fail = acc[1];
			if (func(element)) {
				pass = append(pass, [element]);
			} else {
				fail = append(fail, [element]);
			}
			return [pass, fail];
		}, [[], []], array);
	}
	prelude.partition = partition;

	// #### head :: [a] -> a
	// 
	// Returns the first element of an array.
	// 
	function head(array) {
		return array[0];
	}
	prelude.head = head;

	// #### last :: [a] -> a
	// 
	// Returns the last element of an array.
	// 
	function last(array) {
		return array[array.length - 1];
	}
	prelude.last = last;

	// #### tail :: [a] -> [a]
	// 
	// Returns all the elements after the first element of an array.
	// 
	function tail(array) {
		return Array.prototype.slice.call(array, 1);
	}
	prelude.tail = tail;

	// #### init :: [a] -> [a]
	// 
	// Returns all the elements except the last element of an array.
	// 
	function init(array) {
		return Array.prototype.slice.call(array, 0, -1);
	}
	prelude.init = init;

	// #### null_ :: [a] -> Boolean
	// 
	// Returns true if an array is empty, false otherwise.
	// 
	function null_(array) {
		return array.length === 0;
	}
	prelude.null_ = null_;

	// #### length :: [a] -> Number
	// 
	// Returns the length of an array. O(1).
	// 
	function length(array) {
		return array.length;
	}
	prelude.length = length;

	// #### reverse :: [a] -> [a]
	// 
	function reverse(array) {
		return Array.prototype.reverse.call(array);
	}
	prelude.reverse = reverse;

	// ## Reducing arrays (folds)

	// #### foldl :: (a -> b -> a) -> a -> [b] -> a
	// 
	// Reduces the array from the left, supplying the starting value and the
	// first element to the function, then the result of that to the
	// prelude.with = function with the second element, and so on.
	// 
	function foldl(func, acc, array) {
		each(function (element) {
			acc = func(acc, element);
		}, array);
		return acc;
	}
	prelude.foldl = foldl;

	// #### foldl1 :: (a -> a -> a) -> [a] -> a
	// 
	function foldl1(func, array) {
		return foldl(func, head(array), tail(array));
	}
	prelude.foldl1 = foldl1;

	// #### foldr :: (a -> b -> b) -> b -> [a] -> b
	// 
	function foldr(func, acc, array) {
		return foldl(flip(func), acc, reverse(array));
	}
	prelude.foldr = foldr;

	// #### foldr1 :: (a -> a -> a) -> [a] -> a
	// 
	function foldr1(func, array) {
		return foldr(func, last(array), init(array));
	}
	prelude.foldr1 = foldr1;

	// ### Special folds

	// #### and :: [a] -> Boolean
	// 
	function and(array) {
		return all(id, array);
	}
	prelude.and = and;

	// #### or :: [a] -> Boolean
	// 
	function or(array) {
		return any(id, array);
	}
	prelude.or = or;

	// #### any :: (a -> Boolean) -> [a] -> Boolean
	// 
	// Returns true if the function returns true for any element in the array,
	// false otherwise.
	// 
	function any(func, array) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			if (func(array[i])) {
				return true;
			}
		}
		return false;
	}
	prelude.any = any;

	// #### all :: (a -> Boolean) -> [a] -> Boolean
	// 
	// Returns false if the function returns false any element in the array,
	// true otherwise.
	// 
	function all(func, array) {
		var i;
		for (i = 0; i < array.length; i += 1) {
			if (!func(array[i])) {
				return false;
			}
		}
		return true;
	}
	prelude.all = all;

	// #### sum :: [Number] -> Number
	// 
	function sum(array) {
		return foldl(function (acc, x) {
			return acc + x;
		}, 0, array);
	}
	prelude.sum = sum;

	// #### product :: [Number] -> Number
	// 
	function product(array) {
		return foldl(function (acc, x) {
			return acc * x;
		}, 0, array);
	}
	prelude.product = product;

	// #### concat :: [[a]] -> [a]
	// 
	function concat(array) {
		return foldl1(append, array);
	}
	prelude.concat = concat;

	// #### concatMap :: (a -> [b]) -> [a] -> [b]
	// 
	function concatMap(func, array) {
		return foldl(function (acc, element) {
			return append(acc, func(element));
		}, [], array);
	}
	prelude.concatMap = concatMap;

	// #### maximum :: [a] -> a
	// 
	function maximum(array) {
		return foldl1(max, array);
	}
	prelude.maximum = maximum;

	// #### minimum :: [a] -> a
	// 
	function minimum(array) {
		return foldl1(min, array);
	}
	prelude.minimum = minimum;

	// ## Building arrays

	// ### Scans

	// #### scanl :: (a -> b -> a) -> a -> [b] -> [a]
	// 
	function scanl(func, initial, array) {
		var result = [initial];
		each(function (element) {
			result.push(func(last(result), element));
		}, array);
		return result;
	}
	prelude.scanl = scanl;

	// #### scanl1 :: (a -> a -> a) -> [a] -> [a]
	// 
	function scanl1(func, array) {
		return scanl(func, head(array), tail(array));
	}
	prelude.scanl1 = scanl1;

	// #### scanr :: (a -> b -> b) -> b -> [a] -> [b]
	// 
	function scanr(func, initial, array) {
		return reverse(scanl(flip(func), initial, reverse(array)));
	}
	prelude.scanr = scanr;

	// #### scanr1 :: (a -> a -> a) -> [a] -> [a]
	function scanr1(func, array) {
		return scanr(func, last(array), init(array));
	}
	prelude.scanr1 = scanr1;

	// ## Infinite lists

	// #### iterate :: (a -> a) -> a -> null
	// 
	// Applies `func` to `x` then `func` to the result of `func(x)` and so on.
	// Never returns.
	// 
	function iterate(func, x) {
		while (true) {
			x = func(x);
		}
	}
	prelude.iterate = iterate;

	// #### replicate :: Number -> a -> [a]
	// 
	function replicate(i, x) {
		var array = [];
		for (i; i > 0; i -= 1) {
			array.push(x);
		}
		return array;
	}
	prelude.replicate = replicate;

	// ## Sublists

	// #### take :: Number -> [a] -> [a]
	// 
	function take(x, array) {
		return Array.prototype.slice.call(array, 0, x);
	}
	prelude.take = take;

	// #### drop :: Number -> [a] -> [a]
	// 
	function drop(x, array) {
		return Array.prototype.slice.call(array, x);
	}
	prelude.drop = drop;

	// #### splitAt :: Number -> [a] -> [[a], [a]]
	// 
	function splitAt(x, array) {
		return [take(x, array), drop(x, array)];
	}
	prelude.splitAt = splitAt;

	// ## Searching arrays

	// #### elem :: a -> [a] -> Boolean
	// 
	// Returns true if element is in the array, false otherwise.
	// 
	function elem(obj, array) {
		return Array.prototype.indexOf.call(array, obj) >= 0;
	}
	prelude.elem = elem;

	// ## Functions on strings

	// #### words :: String -> [String]
	// 
	// Splits a string around whitespace into an array of strings.
	// 
	function words(string) {
		return string.split(/\s/);
	}
	prelude.words = words;
}());
