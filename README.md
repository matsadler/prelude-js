# Haskell-ish functions for javascript.

#### prelude.importUnqualified(object[, functionNames])

Add functions as properties of object. If the global object is supplied
then the functions will be available unqualified.

before:

    prelude.sum([1, 2, 3])   //=> 6

after:

    prelude.importUnqualified(this);
    sum([1, 2, 3])           //=> 6

## Boolean functions
#### not :: a -> Boolean

## 'Tuples'
#### fst :: [a, b] -> a

#### snd :: [a, b] -> b

#### curry :: ([a, b] -> c) -> a -> b -> c

As Haskell's functions are wrapper by default, the `curry` function works
a little differently to the usual definition, taking a function that
operates on a pair, and returns one that takes two arguments. This
function imitates Haskell's, taking a function that operates on an array
and returning one that takes a varying number of arguments.

See `curry_` for a more traditional currying function.

#### uncurry :: (a -> b -> c) -> [a -> b] -> c

Takes a function that accepts multiple arguments, and returns one that
operates on an array. See the comment on `curry` for the reasoning why,
and `uncurry_` for a more traditional uncurry function.

#### curry_ :: (a -> b -> c) -> (a -> (b -> c))

#### uncurry_ :: (a -> (b -> c)) -> (a -> b -> c)

## Ordering functions
#### compare :: a -> a -> Number

Returns -1 if the first argument is less than the second, 1 if greater, 0
otherwise.

#### max :: a -> a -> a

Returns the greater of the two arguments. If the arguments are equal or
the comparison is invalid the second argument is returned.

#### min :: a -> a -> a

Returns the lesser of the two arguments. If the arguments are equal or
the comparison is invalid the first argument is returned.

## Numeric functions
#### negate :: Number -> Number

#### abs :: Number -> Number

#### signum :: Number -> Number

#### quot :: Number -> Number -> Number

Interger devision truncated towards zero, e.g. `quot(-3, 2) //=> -1`.

#### rem :: Number -> Number -> Number

Integer remainder such that `quot(x, y) * y + rem(x, y) === x`.

This is the same as the standard Javascript `%` operator.

#### div :: Number -> Number -> Number

Interger devision truncated towards negative infinity, e.g.
`quot(-3, 2) //=> -2`

#### mod :: Number -> Number -> Number

Integer modulus such that `div(x, y) * y + mod(x, y) === x`.

This is not quite the same as the Javascript `%`, see `rem`.

#### quotRem :: Number -> Number -> [Number, Number]

#### divMod :: Number -> Number -> [Number, Number]

#### recip :: Number -> Number

#### pi :: Number

#### exp :: Number -> Number

#### sqrt :: Number -> Number

#### log :: Number -> Number

#### sin :: Number -> Number

#### tan :: Number -> Number

#### cos :: Number -> Number

#### asin :: Number -> Number

#### atan :: Number -> Number

#### acos :: Number -> Number

#### properFraction :: Number -> (Number, Number)

#### truncate :: Number -> Number

`truncate(x)` returns the integer nearest `x`, between 0 and `x`, e.g.

    truncate(1.5)    //=> 1
    truncate(-1.5)   //=> -1

#### round :: Number -> Number

Returns the nearest integer. .5 rounds towards even.

#### ceiling :: Number -> Number

Returns the nearest integer not less than the number supplied.

#### floor :: Number -> Number

Returns the nearest integer not greater than the number supplied.

#### isInfinite :: Number -> Boolean

#### isNegativeZero :: Number -> Boolean

#### atan2 :: Number -> Number -> Number

#### even :: Number -> Boolean

#### odd :: Number -> Boolean

#### gcd :: Number -> Number -> Number

#### lcm :: Number -> Number -> Number

## Miscellaneous functions
#### id :: a -> a

Identity. Simply returns its argument.

#### const_ :: a -> b -> a

If called with a single argument returns a function that always returns
that original argument. If called with multiple arguments returns the
first.

#### compose :: (b -> c) -> (a -> b) -> a -> c

Takes two functions and returns a new function that applies the first to
the result of the second applied to its arguments.

#### partial :: (a -> b -> c) -> a -> (b -> c)

Takes a function and an argument and applies that argument, returning a
function that takes one less argument.

#### flip :: (a -> b -> c) -> b -> a -> c

Returns a function the same as the supplied function, with the first two
arguments reversed.

#### call :: (a -> b) -> a -> b

`call(foo, bar, baz)` calls the function `foo` with the arguments `bar`
and `baz`, and is equivalent to `foo(bar, baz)`.

#### apply :: (a -> b) -> [a] -> b

`apply(foo, [bar, baz])` calls the function `foo` with the arguments
`bar` and `baz`, and is equivalent to `foo(bar, baz)`.

#### until :: (a -> Boolean) -> (a -> a) -> a -> a

    until(function (x) {
        return x === 5;
    }, function (x) {
        return x + 1;
    }, 0)   // => 5

#### error :: String -> undefined

#### each :: (a -> b) -> [a] -> [a]

Applies a function to each element in an array, returning the original
array.

This wouldn't be useful in a pure functional context, but in a language
like JavaScript where site effects are possible it can be handy.

## Array operations
#### map :: (a -> b) -> [a] -> [b]

Applies a function to each element in an array, returning a new array of
the results.

#### append :: [a] -> [a] -> [a]

Adds the second array to the end of the first.

#### filter :: (a -> Boolean) -> [a] -> [a]

Applies a function to each element in an array, returning an array of
only the elements for which true was returned.

#### partition :: (a -> Boolean) -> [a] -> [[a], [a]]

Applies a function to each element in an array, returning a pair of
arrays, the first of the elements for which true was returned, the
second the elements for which false was returned.

#### head :: [a] -> a

Returns the first element of an array.

#### last :: [a] -> a

Returns the last element of an array.

#### tail :: [a] -> [a]

Returns all the elements after the first element of an array.

#### init :: [a] -> [a]

Returns all the elements except the last element of an array.

#### null_ :: [a] -> Boolean

Returns true if an array is empty, false otherwise.

#### length :: [a] -> Number

Returns the length of an array. O(1).

#### index :: [a] -> Number -> a

Returns the element at position i from array, starting from 0.

#### reverse :: [a] -> [a]

## Reducing arrays (folds)
#### foldl :: (a -> b -> a) -> a -> [b] -> a

Reduces the array from the left, supplying the starting value and the
first element to the function, then the result of that to the
prelude.with = function with the second element, and so on.

#### foldl1 :: (a -> a -> a) -> [a] -> a

#### foldr :: (a -> b -> b) -> b -> [a] -> b

#### foldr1 :: (a -> a -> a) -> [a] -> a

### Special folds
#### and :: [a] -> Boolean

#### or :: [a] -> Boolean

#### any :: (a -> Boolean) -> [a] -> Boolean

Returns true if the function returns true for any element in the array,
false otherwise.

#### all :: (a -> Boolean) -> [a] -> Boolean

Returns false if the function returns false any element in the array,
true otherwise.

#### sum :: [Number] -> Number

#### product :: [Number] -> Number

#### concat :: [[a]] -> [a]

#### concatMap :: (a -> [b]) -> [a] -> [b]

#### maximum :: [a] -> a

#### minimum :: [a] -> a

## Building arrays
### Scans
#### scanl :: (a -> b -> a) -> a -> [b] -> [a]

#### scanl1 :: (a -> a -> a) -> [a] -> [a]

#### scanr :: (a -> b -> b) -> b -> [a] -> [b]

#### scanr1 :: (a -> a -> a) -> [a] -> [a]
## Infinite lists
#### iterate :: (a -> a) -> a -> null

Applies `func` to `x` then `func` to the result of `func(x)` and so on.
Never returns.

#### replicate :: Number -> a -> [a]

## Sublists
#### take :: Number -> [a] -> [a]

#### drop :: Number -> [a] -> [a]

#### splitAt :: Number -> [a] -> [[a], [a]]

## Searching arrays
#### elem :: a -> [a] -> Boolean

Returns true if element is in the array, false otherwise.

## Zipping and unzipping lists
#### zip :: [a] -> [b] -> [[a, b]]

#### zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]

This is actually an alias to zipGeneric, to match the Haskell prelude.

#### zipGeneric :: [a] -> [b] -> [[a, b]]

Generic zip, that works with any number of lists, not possible in Haskell
but we can do it here.

#### zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]

#### zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]

#### zipWithGeneric :: (a -> b -> c) -> [a] -> [b] -> [c]

Generic zipWith, that works with any number of lists.

#### unzip :: [[a, b]] -> [[a], [b]]

#### unzip3 :: [[a, b, c]] -> [[a], [b], [c]]

#### unzipGeneric :: [[a, b]] -> [[a], [b]]

## Functions on strings
#### lines :: String -> [String]

Splits a string around newlines (\n) into an array of strings.

#### words :: String -> [String]

Splits a string around whitespace into an array of strings.

#### unlines :: [String] -> String

#### unwords :: [String] -> String

## Converting to and from String
### Converting to String
#### show :: a -> String

Converts to a JSON string.

### Converting from String
#### read :: String -> a

Reads JSON formatted data.

