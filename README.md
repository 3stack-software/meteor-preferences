# Preferences

A light wrapper around local storage, with some useful helpers for retrieving values.

Simply call `Preferences.getItem('<preference name>', defaultValueOrFn)`. If a value could not be read, the preference
is then set to the value of `defaultValueOrFn`, and then the final value returned.

## Installation

`meteor add 3stack:preferences`

## Usage

```js

// read values with `getItem`
var usersPref = Preferences.getItem('someSetting', 10.5);

// ...

// set values with `setItem`
Preferences.setItem('someSetting', usersPref);

```
