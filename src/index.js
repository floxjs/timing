/**
 * Imports
 */

import {fork} from '@flox/fork'

/**
 * Actions
 */

const DELAY = '@flox/timing/DELAY'
const TIMEOUT = '@flox/timing/TIMEOUT'
const INTERVAL = '@flox/timing/INTERVAL'


/**
 * Timing effect driver
 * @param  {Object}   action
 * @param  {Function} next
 * @return {Promise|Generator} delay, timeout, or interval effect driver
 */

const timingEffect = ({dispatch}) => next => action => {
  if (action.type === DELAY) {
    return delayEffect(action.payload)
  } else if (action.type === TIMEOUT) {
    return dispatch(timeoutEffect(action.payload.fn, action.payload.wait))
  } else if (action.type === INTERVAL) {
    return dispatch(intervalEffect(action.payload.fn, action.payload.wait))
  }
  return next()
}

/**
 * Delay effect
 * @param  {Number} delay
 * @return {Promise} Promise that resolves after `delay`
 */

function delayEffect (delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}

/**
 * Timeout effect
 * @param  {Function} fn
 * @param  {Number}   d delay
 * @return {Task}
 */

function timeoutEffect (fn, d) {
  return fork(function * () {
    console.log('running timeout')
    yield delay(d)
    yield fn()
  })
}

/**
 * Interval effect
 * @param  {Function} fn
 * @param  {Number}   d  delay
 * @return {Task}
 */

function intervalEffect (fn, d) {
  return fork(function * () {
    while (true) {
      yield delay(d)
      yield fn()
    }
  })
}

/**
 * Delay action creator
 * @param  {Number} wait
 * @return {Object}
 */

function delay (wait) {
  return {type: DELAY, payload: wait}
}

/**
 * Timeout action creator
 * @param  {Function} fn
 * @param  {Number}   wait
 * @return {Object}
 */

function timeout (fn, wait) {
  return {type: TIMEOUT, payload: {fn, wait}}
}

/**
 * Interval action creator
 * @param  {Function} fn
 * @param  {Number}   wait
 * @return {Object}
 */

function interval (fn, wait) {
  return {type: INTERVAL, payload: {fn, wait}}
}

/**
 * Exports
 */

export default timingEffect
export {timingEffect, delay, timeout, interval}
