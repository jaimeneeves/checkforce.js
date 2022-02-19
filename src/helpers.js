/**
 * querySelector wrapper
 *
 * @param {String} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export const qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}
