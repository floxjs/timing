
# timing

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Delay, timeout, and interval effects. (Included in flox)

## Installation

    $ npm install @flox/timing

## Usage

```js
import {delay, timeout, interval} from '@flox/timing'

function * () {
  yield delay(500)
  // do something later
}

function * () {
  yield timeout(doSomethingLater, 500)
  // do something now
}

function * () {
  let task = yield interval(repeatSomething, 500)
  // do something and then cancel
  yield cancel(task)
}

```

## API

### delay(wait)

- `wait` - time to block

**Returns:** delay action

### timeout(fn, wait)

- `fn` - function to run after `wait` ms
- `wait` - time to wait

**Returns:** timeout action

### interval(fn, wait)

- `fn` - function to run on an interval
- `wait` - time in between runs

**Returns:** interval action

## License

MIT

[travis-image]: https://img.shields.io/travis/floxjs/timing.svg?style=flat-square
[travis-url]: https://travis-ci.org/floxjs/timing
[git-image]: https://img.shields.io/github/tag/floxjs/timing.svg?style=flat-square
[git-url]: https://github.com/floxjs/timing
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@flox/timing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@flox/timing
