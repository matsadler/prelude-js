prelude.importUnqualified(this);

test("not", function () {
	strictEqual(not(true), false);
	strictEqual(not(false), true);

	strictEqual(not(undefined), true);

	strictEqual(not(1), false);
	strictEqual(not(0), true);

	strictEqual(not(""), true);
	strictEqual(not("foo"), false);

	strictEqual(not([]), false);

	strictEqual(not({}), false);
});

test("fst", function () {
	strictEqual(fst([1, 2]), 1);
	strictEqual(fst(["a", "b"]), "a");
});

test("snd", function () {
	strictEqual(snd([1, 2]), 2);
	strictEqual(snd(["a", "b"]), "b");
});

test("curry", function () {
	var sum = function (array) {
			var acc = 0,
				i;
			for (i = 0; i < array.length; i += 1) {
				acc += array[i];
			}
			return acc;
		},
		sumArgs = curry(sum);

	strictEqual(sumArgs(1, 2, 3), 6);
});

test("uncurry", function () {
	var add = function (a, b) {
			return a + b;
		},
		addArray = uncurry(add);

	strictEqual(addArray([1, 2]), 3);
});

test("curry_", function () {
	var sum3 = function (a, b, c) {
			return a + b + c;
		},
		sum3curried = curry_(sum3);

	strictEqual(sum3curried(1)(2)(3), 6);
});

test("uncurry_", function () {
	var sum3curried = function (a) {
			return function (b) {
				return function (c) {
					return a + b + c;
				};
			};
		},
		sum3 = uncurry_(sum3curried);

	strictEqual(sum3(1, 2, 3), 6);
});

test("compare", function () {
	strictEqual(compare(3, 5), -1);
	strictEqual(compare(72, 11), 1);
	strictEqual(compare(100, 100), 0);

	strictEqual(compare("c", "w"), -1);
	strictEqual(compare("p", "b"), 1);
	strictEqual(compare("m", "m"), 0);

	strictEqual(compare([1,2], [1,3]), -1);
	strictEqual(compare([5,6], [4,5]), 1);
	strictEqual(compare([5,5], [5,5]), 0);

	strictEqual(compare({foo: 1}, {foo: 2}), 0);
});

test("max", function () {
	strictEqual(max(1, 2), 2);
	strictEqual(max(4, 3), 4);
	strictEqual(max(5, 5), 5);

	strictEqual(max("b", "r"), "r");
	strictEqual(max("q", "i"), "q");
	strictEqual(max("x", "x"), "x");

	var a, b;

	a = [1,2];
	b = [3,4];
	deepEqual(max(a, b), b);
	a = [7,8];
	b = [5,6];
	deepEqual(max(a, b), a);
	a = [8,8];
	b = [8,8];
	deepEqual(max(a, b), b);

	a = {foo: 1};
	b = {foo: 2};
	strictEqual(max(a, b), b);
});

test("min", function () {
	strictEqual(min(1, 2), 1);
	strictEqual(min(4, 3), 3);
	strictEqual(min(5, 5), 5);

	strictEqual(min("b", "r"), "b");
	strictEqual(min("q", "i"), "i");
	strictEqual(min("x", "x"), "x");

	var a, b;

	a = [1,2];
	b = [3,4];
	deepEqual(min(a, b), a);
	a = [7,8];
	b = [5,6];
	deepEqual(min(a, b), b);
	a = [8,8];
	b = [8,8];
	deepEqual(min(a, b), a);

	a = {foo: 1};
	b = {foo: 2};
	strictEqual(min(a, b), a);
});

test("negate", function () {
	strictEqual(negate(1), -1);
	strictEqual(negate(-2), 2);
});

test("abs", function () {
	strictEqual(abs(1), 1);
	strictEqual(abs(-2), 2);
});

test("signum", function () {
	strictEqual(signum(42), 1);
	strictEqual(signum(-7), -1);
	strictEqual(signum(0), 0);
});

test("quot", function () {
	strictEqual(quot(3, 2), 1);
	strictEqual(quot(-3, 2), -1);
	strictEqual(quot(-26, 3), -8);
	strictEqual(quot(24, 5), 4);
});

test("rem", function () {
	strictEqual(rem(3, 2), 1);
	strictEqual(rem(-3, 2), -1);
	strictEqual(rem(-26, 3), -2);
	strictEqual(rem(24, 5), 4);
});

test("div", function () {
	strictEqual(div(3, 2), 1);
	strictEqual(div(-3, 2), -2);
	strictEqual(div(-26, 3), -9);
	strictEqual(div(24, 5), 4);
});

test("mod", function () {
	strictEqual(mod(3, 2), 1);
	strictEqual(mod(-3, 2), 1);
	strictEqual(mod(-26, 3), 1);
	strictEqual(mod(24, 5), 4);
});

test("quotRem", function () {
	deepEqual(quotRem(-26, 3), [-8, -2]);
});

test("divMod", function () {
	deepEqual(divMod(-26, 3), [-9, 1]);
});

test("recip", function () {
	strictEqual(recip(5), 0.2);
	strictEqual(recip(2), 0.5);
});

test("pi", function () {
	strictEqual(Math.floor(pi() * 100) / 100, 3.14);
});

// should test exp, sqrt, log, sin, tan, cos, asin, atan, and acos but can't
// be bothered as they are just defined like prelude.exp = Math.exp;

test("properFraction", function () {
	deepEqual(properFraction(3.5), [3, 0.5]);
	deepEqual(properFraction(0.1), [0, 0.1]);
	deepEqual(properFraction(-7.25), [-7, -0.25]);
});

test("truncate", function () {
	strictEqual(truncate(5.9), 5);
	strictEqual(truncate(-5.9), -5);
});

test("round", function () {
	strictEqual(round(1.5), 2);
	strictEqual(round(2.5), 2);
	strictEqual(round(2.51), 3);
	strictEqual(round(1.49), 1);

	strictEqual(round(-1.5), -2);
	strictEqual(round(-2.5), -2);
	strictEqual(round(-2.51), -3);
	strictEqual(round(-1.49), -1);
});

test("ceiling", function () {
	strictEqual(ceiling(1.2), 2);
	strictEqual(ceiling(-1.7), -1);
});

test("floor", function () {
	strictEqual(floor(1.7), 1);
	strictEqual(floor(-1.2), -2);
});

test("isInfinite", function () {
	strictEqual(isInfinite(Infinity), true);
	strictEqual(isInfinite(-Infinity), true);

	strictEqual(isInfinite(0), false);
	strictEqual(isInfinite(1), false);
	strictEqual(isInfinite(-1), false);
	strictEqual(isInfinite(undefined), false);
	strictEqual(isInfinite(NaN), false);
	strictEqual(isInfinite(true), false);
	strictEqual(isInfinite(false), false);
	strictEqual(isInfinite("foo"), false);
	strictEqual(isInfinite([]), false);
	strictEqual(isInfinite({}), false);
});

test("isNegativeZero", function () {
	strictEqual(isNegativeZero(-0), true);

	strictEqual(isNegativeZero(0), false);
	strictEqual(isNegativeZero(-1), false);
	strictEqual(isNegativeZero(1), false);

	strictEqual(isNegativeZero("-0"), false);
	strictEqual(isNegativeZero([]), false);
	strictEqual(isNegativeZero({}), false);
});

test("atan2", function () {
	strictEqual(atan2(5, 6), 0.6947382761967031);
});

test("even", function () {
	strictEqual(even(0), true);
	strictEqual(even(2), true);
	strictEqual(even(54), true);
	strictEqual(even(138), true);
	strictEqual(even(-2), true);

	strictEqual(even(1), false);
	strictEqual(even(23), false);
	strictEqual(even(245), false);
	strictEqual(even(-1), false);
});

test("odd", function () {
	strictEqual(odd(1), true);
	strictEqual(odd(23), true);
	strictEqual(odd(245), true);
	strictEqual(odd(-1), true);

	strictEqual(odd(0), false);
	strictEqual(odd(2), false);
	strictEqual(odd(54), false);
	strictEqual(odd(138), false);
	strictEqual(odd(-2), false);
});

test("gcd", function () {
	strictEqual(gcd(4, 6), 2);
	strictEqual(gcd(345, 45), 15);
	strictEqual(gcd(-51, -34), 17);

	strictEqual(gcd(0, 10), 10);
	strictEqual(gcd(10, 0), 10);
});

test("lcm", function () {
	strictEqual(lcm(3, 4), 12);
	strictEqual(lcm(-7, 13), 91);

	strictEqual(lcm(10, 0), 0);
	strictEqual(lcm(0, 10), 0);
});

test("id", function () {
	var a;

	a = "foo";
	strictEqual(id(a), a);

	a = ["foo"];
	strictEqual(id(a), a);

	a = {"foo": 1};
	strictEqual(id(a), a);

	a = null;
	strictEqual(id(a), a);

	a = undefined;
	strictEqual(id(a), a);
});

test("const_", function () {
	strictEqual(const_(1)(2), 1);
	strictEqual(const_(2, 3), 2);
});

test("compose", function () {
	var split_space = function (string) {
			return string.split(" ");
		},
		join_underscore = function (array) {
			return array.join("_");
		},
		underscore = compose(join_underscore, split_space);

	strictEqual(underscore("foo bar baz"), "foo_bar_baz");
});

test("partial", function () {
	var add = function (x, y) {
			return x + y;
		},
		add3 = partial(add, 3);

	strictEqual(add3(2), 5);

	strictEqual(partial(add3, 5)(), 8);
});

test("flip", function () {
	var devide = function (x, y) {
		return x / y;
	};

	strictEqual(devide(6, 3), 2);
	strictEqual(flip(devide)(6, 3), 0.5);
});

test("call", function () {
	var add = function (x, y) {
		return x + y;
	};

	strictEqual(call(add, 5, 2), 7);
});

test("apply", function () {
	var add = function (x, y) {
		return x + y;
	};

	strictEqual(apply(add, [5, 2]), 7);
});

test("until", function () {
	strictEqual(until(function (x) {
		return x >= 10;
	}, function (x) {
		return x + 2;
	}, 1), 11);
});

test("error", function () {
	throws(function () {
		error("test");
	}, function (e) {
		if (e instanceof Error && e.message === "test") {
			return true;
		}
	});
});

test("each", function () {
	var results = [],
		original = each(function (e) {
			results.push(e * 2);
		}, [1, 2, 3]);

	deepEqual(results, [2, 4, 6]);
	deepEqual(original, [1, 2, 3]);
});

test("map", function () {
	var original = [1, 2, 3];
		results = map(function (e) {
			return e * 2;
		}, original);

	deepEqual(results, [2, 4, 6]);
	deepEqual(original, [1, 2, 3]);
});

test("append", function () {
	var a = [1, 2, 3],
		b = [4, 5, 6];

	deepEqual(append(a, b), [1, 2, 3, 4, 5, 6]);
	deepEqual(a, [1, 2, 3]);
	deepEqual(b, [4, 5, 6]);
});

test("filter", function () {
	var original = [11, 3, 27, 8, 1, 99],
		results = filter(function (e) {
			return e > 10;
		}, original);

	deepEqual(original, [11, 3, 27, 8, 1, 99]);
	deepEqual(results, [11, 27, 99]);
});

test("partition", function () {
	var original = [27, 88, 2, 1001, 1002, 3, 3],
		results = partition(function (e) {
			return e > 50;
		}, original);

	deepEqual(original, [27, 88, 2, 1001, 1002, 3, 3]);
	deepEqual(results, [[88, 1001, 1002], [27, 2, 3, 3]]);
});

test("head", function () {
	strictEqual(head([9,8,7]), 9);
	strictEqual(head(["foo", "bar", "baz", "qux"]), "foo");
});

test("last", function () {
	strictEqual(last([9,8,7]), 7);
	strictEqual(last(["foo", "bar", "baz", "qux"]), "qux");
});

test("tail", function () {
	deepEqual(tail([9,8,7]), [8, 7]);
	deepEqual(tail(["foo", "bar", "baz", "qux"]), ["bar", "baz", "qux"]);
});

test("init", function () {
	deepEqual(init([9,8,7]), [9, 8]);
	deepEqual(init(["foo", "bar", "baz", "qux"]), ["foo", "bar", "baz"]);
});

test("null_", function () {
	strictEqual(null_([]), true);
	strictEqual(null_([42]), false);

	strictEqual(null_([null]), false);
	strictEqual(null_([undefined]), false);

	strictEqual(null_(""), true);
	strictEqual(null_("foo"), false);

	strictEqual(null_({}), false);
});

test("length", function () {
	strictEqual(length([1, 2, 4]), 3);
	strictEqual(length("example"), 7);
});

test("index", function () {
	strictEqual(index(["foo", "bar", "baz"], 1), "bar");

	throws(function () {
		index(["foo", "bar", "baz"], -1);
	}, function (e) {
		if (e instanceof Error && e.message === "negative index") {
			return true;
		}
	});

	throws(function () {
		index(["foo", "bar", "baz"], 4);
	}, function (e) {
		if (e instanceof Error && e.message === "index too large") {
			return true;
		}
	});
});

test("reverse", function () {
	deepEqual(reverse([22, 1, 76, 1, 8, 12]), [12, 8, 1, 76, 1, 22]);
});

test("foldl", function () {
	strictEqual(foldl(function (acc, e) {
		return acc + e;
	}, "foo", ["bar", "baz", "qux"]), "foobarbazqux");
});

test("foldl1", function () {
	strictEqual(foldl1(function (acc, e) {
		return acc + e;
	}, ["bar", "baz", "qux"]), "barbazqux");
});

test("foldr", function () {
	strictEqual(foldr(function (e, acc) {
		return e + acc;
	}, "foo", ["bar", "baz", "qux"]), "barbazquxfoo");
});

test("foldr1", function () {
	strictEqual(foldr1(function (e, acc) {
		return e + acc;
	}, ["bar", "baz", "qux"]), "barbazqux");
});

test("and", function () {
	strictEqual(and([]), true);
	strictEqual(and([1, 2, 3]), true);
	strictEqual(and(["foo", "bar"]), true);

	strictEqual(and([false]), false);
	strictEqual(and([""]), false);
	strictEqual(and([null]), false);
	strictEqual(and([undefined]), false);

	strictEqual(and([1, false, 3]), false);
});

test("or", function () {
	strictEqual(or([]), false);
	strictEqual(or([1]), true);
	strictEqual(or([false]), false);
	strictEqual(or([false, 2, false]), true);
});

test("any", function () {
	strictEqual(any(function (e) {return e > 5;}, []), false);
	strictEqual(any(function (e) {return e > 5;}, [4, 2, 0]), false);
	strictEqual(any(function (e) {return e > 2;}, [4, 2, 0]), true);
});

test("all", function () {
	strictEqual(all(function (e) {return e > 5;}, []), true);
	strictEqual(all(function (e) {return e > 5;}, [9, 1011, 72]), true);
	strictEqual(all(function (e) {return e < 11;}, [8, 12, 6]), false);
});

test("sum", function () {
	strictEqual(sum([1, 2, 3, 4]), 10);
});

test("product", function () {
	strictEqual(product([1, 2, 3, 4]), 24);
});

test("concat", function () {
	deepEqual(concat([["foo"], ["bar"], ["baz"]]), ["foo", "bar", "baz"]);
	deepEqual(concat([[1, 2, 3], [3, 2, 1]]), [1, 2, 3, 3, 2, 1]);
});

test("concatMap", function () {
	deepEqual(concatMap(function (e) {
		return e.split("");
	}, ["foo", "bar", "baz"]), ["f", "o", "o", "b", "a", "r", "b", "a", "z"]);
});

test("maximum", function () {
	strictEqual(maximum([1, 2, 3]), 3);
	strictEqual(maximum([6, 5, 4]), 6);
	strictEqual(maximum([11, 42, 8]), 42);
});

test("minimum", function () {
	strictEqual(minimum([1, 2, 3]), 1);
	strictEqual(minimum([6, 5, 4]), 4);
	strictEqual(minimum([11, 8, 42]), 8);
});

test("scanl", function () {
	deepEqual(scanl(function (acc, e) {
		return acc + e;
	}, 5, [3, 2, 1]), [5, 8, 10, 11]);
});

test("scanl1", function () {
	deepEqual(scanl1(function (acc, e) {
		return acc + e;
	}, [3, 2, 1]), [3, 5, 6]);
});

test("scanr", function () {
	deepEqual(scanr(function (e, acc) {
		return e + acc;
	}, "foo", ["bar", "baz", "qux"]),
	["barbazquxfoo", "bazquxfoo", "quxfoo", "foo"]);
});

test("scanr1", function () {
	deepEqual(scanr1(function (e, acc) {
		return e + acc;
	}, ["bar", "baz", "qux"]),
	["barbazqux", "bazqux", "qux"]);
});

// work out how to test Infinite list functions; iterate & replicate

test("take", function () {
	deepEqual(take(2, ["foo", "bar", "baz"]), ["foo", "bar"]);
	deepEqual(take(1, ["foo", "bar", "baz"]), ["foo"]);
	deepEqual(take(3, ["foo", "bar", "baz"]), ["foo", "bar", "baz"]);
	deepEqual(take(4, ["foo", "bar", "baz"]), ["foo", "bar", "baz"]);
	deepEqual(take(0, ["foo", "bar", "baz"]), []);
});

test("drop", function () {
	deepEqual(drop(2, ["foo", "bar", "baz"]), ["baz"]);
	deepEqual(drop(1, ["foo", "bar", "baz"]), ["bar", "baz"]);
	deepEqual(drop(3, ["foo", "bar", "baz"]), []);
	deepEqual(drop(4, ["foo", "bar", "baz"]), []);
	deepEqual(drop(0, ["foo", "bar", "baz"]), ["foo", "bar", "baz"]);
});

test("splitAt", function () {
	deepEqual(splitAt(2, ["foo", "bar", "baz"]), [["foo", "bar"], ["baz"]]);
	deepEqual(splitAt(1, ["foo", "bar", "baz"]), [["foo"], ["bar", "baz"]]);
	deepEqual(splitAt(3, ["foo", "bar", "baz"]), [["foo", "bar", "baz"], []]);
	deepEqual(splitAt(4, ["foo", "bar", "baz"]), [["foo", "bar", "baz"], []]);
	deepEqual(splitAt(0, ["foo", "bar", "baz"]), [[], ["foo", "bar", "baz"]]);
});

test("elem", function () {
	strictEqual(elem("bar", ["foo", "bar", "baz"]), true);
	strictEqual(elem("qux", ["foo", "bar", "baz"]), false);
});

test("zip", function () {
	deepEqual(zip([1, 2, 3], ["a", "b", "c"]), [[1, "a"], [2, "b"], [3, "c"]]);
	deepEqual(zip([1, 2], ["a", "b", "c"]), [[1, "a"], [2, "b"]]);
	deepEqual(zip([1, 2, 3], ["a", "b"]), [[1, "a"], [2, "b"]]);
});

test("zip3", function () {
	deepEqual(
		zip3([1, 2, 3], ["a", "b", "c"], [true, false, null]),
		[[1, "a", true], [2, "b", false], [3, "c", null]]);
	deepEqual(
		zip3([1, 2], ["a", "b", "c"], [true, false, null]),
		[[1, "a", true], [2, "b", false]]);
	deepEqual(
		zip3([1, 2, 3], ["a", "b"], [true, false, null]),
		[[1, "a", true], [2, "b", false]]);
	deepEqual(
		zip3([1, 2, 3], ["a", "b", "c"], [true, false]),
		[[1, "a", true], [2, "b", false]]);
});

test("zipGeneric", function () {
	deepEqual(zipGeneric([1, 2], ["a", "b"]), [[1, "a"], [2, "b"]]);
	deepEqual(zipGeneric([1], ["a", "b"]), [[1, "a"]]);
	deepEqual(zipGeneric([1, 2], ["a"]), [[1, "a"]]);

	deepEqual(
		zipGeneric([1, 2], ["a", "b"], [true, false], [{foo: 1}, {bar: 2}]),
		[[1, "a", true, {foo: 1}], [2, "b", false, {bar: 2}]]);
});

test("zipWith", function () {
	deepEqual(zipWith(function (x, y) {return x + y;}, [1, 2, 3], [10, 20, 30]),
		[11, 22, 33]);
});

test("zipWith3", function () {
	deepEqual(zipWith3(
		function (x, y, z) {return x + y + z;},
		[1, 2, 3], [10, 20, 30], [100, 200, 300]),
		[111, 222, 333]);
});

test("zipWithGeneric", function () {
	var sumArgs = function () {
		var acc = 0;
		for (i = 0; i < arguments.length; i += 1) {
			acc += arguments[i];
		}
		return acc;
	};

	deepEqual(
		zipWithGeneric(sumArgs, [1, 2], [10, 20]),
		[11, 22]);
	deepEqual(
		zipWithGeneric(sumArgs, [1, 2], [10, 20], [100, 200]),
		[111, 222]);
	deepEqual(
		zipWithGeneric(sumArgs, [1, 2], [10, 20], [100, 200], [1000, 2000]),
		[1111, 2222]);
});

test("unzip", function () {
	deepEqual(unzip([[1, "a"], [2, "b"], [3, "c"]]),
		[[1, 2, 3], ["a", "b", "c"]]);
});

test("unzip3", function () {
	deepEqual(unzip3([[1, "a", true], [2, "b", false], [3, "c", null]]),
		[[1, 2, 3], ["a", "b", "c"], [true, false, null]]);
});

test("lines", function () {
	deepEqual(lines("foo bar\nbaz qux\n"), ["foo bar", "baz qux"]);

	deepEqual(lines("foo\rbar"), ["foo\rbar"]);

	deepEqual(lines("\nfoo\nbar\n"), ["","foo","bar"]);
});

test("words", function () {
	deepEqual(words("foo bar baz"), ["foo", "bar", "baz"]);

	deepEqual(words("foo  bar"), ["foo", "bar"]);
	deepEqual(words(" foo bar "), ["foo", "bar"]);

	deepEqual(words("foo\tbar"), ["foo", "bar"]);
	deepEqual(words("foo\nbar"), ["foo", "bar"]);
	deepEqual(words("foo\rbar"), ["foo", "bar"]);
	deepEqual(words("foo\fbar"), ["foo", "bar"]);
	deepEqual(words("foo\vbar"), ["foo", "bar"]);
	deepEqual(words("foo\xa0bar"), ["foo", "bar"]);
});

test("unlines", function () {
	strictEqual(unlines(["foo", "bar"]), "foo\nbar");
});

test("unlines", function () {
	strictEqual(unwords(["foo", "bar"]), "foo bar");
});

test("show", function () {
	strictEqual(show(1), "1");
	strictEqual(show("foo"), "\"foo\"");
	strictEqual(show([1, 2, 3]), "[1,2,3]");
	strictEqual(show({}), "{}");
	strictEqual(show({foo: 1}), "{\"foo\":1}");

	throws(function () {
		show(function () {return 1;});
	}, function (e) {
		if (e instanceof Error && e.message === "can not show function") {
			return true;
		}
	});
});

test("read", function () {
	strictEqual(read("1"), 1);
	strictEqual(read("\"foo\""), "foo");
	deepEqual(read("[1,2,3]"), [1, 2, 3]);
	deepEqual(read("{}"), {});
	deepEqual(read("{\"foo\":1}"), {foo: 1});
});
