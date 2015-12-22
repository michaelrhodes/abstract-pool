# abstract-pool

This is a simple, unopinionated module for creating and consuming pools of objects. It’s inspired by [dom-pool](https://github.com/ChrisAntaki/dom-pool), but can be used outside of DOM-based environments.

[![Build status](https://travis-ci.org/michaelrhodes/abstract-pool.svg?branch=master)](https://travis-ci.org/michaelrhodes/abstract-pool)

## Install

```sh
$ npm install abstract-pool
```

## Usage

```js
var pool = require('abstract-pool')

var i = 0
var numbers = pool(function () {
  return ++i
})

numbers.alloc(5)
numbers.pop()
=> 5

var number = numbers.pop()
console.log(number)
=> 4

numbers.push(number)
numbers.pop()
=> 4

numbers.dealloc(2)
numbers.pop()
=> 1
```

### page weight (browserified)

| compression             |    size |
| :---------------------- | ------: |
| abstract-pool.js        | 1.17 kB |
| abstract-pool.min.js    |   882 B |
| abstract-pool.min.js.gz |   433 B |


## License

[MIT](http://opensource.org/licenses/MIT)
