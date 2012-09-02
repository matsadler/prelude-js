# Haskell-ish functions for javascript.

## each :: [a] -> (a -> b) -> [a]

Applies a function to each element in an array, returning the original array.

This wouldn't be useful in a pure functional context, but in a language like
JavaScript where site effects are possible it can be handy.

## foldl :: a -> [b] -> (a -> b -> a) -> a

Reduces the array from the left, supplying the starting value and the first
element to the function, then the result of that to the function with the
second element, and so on.

## append :: [a] -> [a] -> [a]

Adds the second list to the end of the first.

## filter :: [a] -> (a -> Bool) -> [a]

Applies a function to each element in an array, returning an array of only
the elements for which true was returned.

## map :: [a] -> (a -> b) -> [b]

Applies a function to each element in an array, returning a new array of the
results.

## words :: String -> [String]

Splits a string around whitespace into an array of strings.

## all :: [a] -> (a -> Bool) -> Bool

Returns true if the function returns true for all elements in the array,
false otherwise.

## partition :: [a] -> (a -> Bool) -> [[a], [a]]

Applies a function to each element in an array, returning a pair of arrays,
the first of the elements for which true was returned, the second the
elements for which false was returned.

## elem :: a -> [a] -> Bool

Returns true if element is in the array, false otherwise.

## compose :: (b -> c) -> (a -> b) -> a -> c

Takes two functions and returns a new function that applies the first to
the result of the second applied to its arguments.

## partial :: (a -> b -> c) -> a -> (b -> c)

Takes a function and an argument and applies that argument, returning a
function that takes one less argument.

