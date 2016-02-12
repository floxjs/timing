/**
 * Imports
 */

import test from 'tape'
import {timingEffect, delay, timeout, interval} from '../src'
import promise from '@koax/promise'
import {channelsEffect} from '@koax/channels'
import {taskRunner, cancel} from '@koax/fork'
import run from '@koax/run'
import elapsed from '@f/elapsed-time'

function createDispatch () {
  return taskRunner(run([promise, channelsEffect(), timingEffect]))
}

/**
 * Tests
 */

test('should delay', (t) => {
  let dispatch = createDispatch()
  let time = elapsed()
  time()
  dispatch(function * () {
    yield delay(50)
  }).then(function () {
    t.ok(time() > 50)
    t.end()
  })
})

test('should set timeout', (t) => {
  t.plan(3)

  let dispatch = createDispatch()
  let time = elapsed()
  let finished = false

  dispatch(function * () {
    yield timeout(finish, 50)
    yield [checkFast, checkSlow]
  }).then(function () {
    t.equal(finished, true)
  })

  function * checkFast() {
    yield delay(25)
    t.equal(finished, false)
  }

  function * checkSlow() {
    yield delay(60)
    t.equal(finished, true)
  }

  function finish () {
    finished = true
  }
})

test('should set interval', (t) => {
  let dispatch = createDispatch()
  let count = 0
  dispatch(function * () {
    let task = yield interval(increment, 50)
    yield delay(200)
    yield cancel(task)
  }).then(function () {
    t.ok(count >= 3)
    t.end()
  })

  function increment () {
    count++
  }
})
