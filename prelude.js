// # Haskell-ish functions for javascript.
// 

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

// ## append :: [a] -> [a] -> [a]
// 
// Adds the second array to the end of the first.
// 
function append(arrayA, arrayB) {
	return arrayA.concat(arrayB);
}

// ## filter :: [a] -> (a -> Bool) -> [a]
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

// ## words :: String -> [String]
// 
// Splits a string around whitespace into an array of strings.
// 
function words(string) {
	return string.split(/\s/);
}

// ## all :: [a] -> (a -> Bool) -> Bool
// 
// Returns true if the function returns true for all elements in the array,
// false otherwise.
// 
function all(array, func) {
	return foldl(true, array, function (acc, element) {
		return acc && func(element);
	});
}

// ## partition :: [a] -> (a -> Bool) -> [[a], [a]]
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

// ## elem :: a -> [a] -> Bool
// 
// Returns true if element is in the array, false otherwise.
// 
function elem(obj, array) {
	return array.indexOf(obj) >= 0;
}

// ## compose :: (b -> c) -> (a -> b) -> a -> c
// 
// Takes two functions and returns a new function that applies the first to
// the result of the second applied to its arguments.
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
