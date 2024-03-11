'use strict';

var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported;

if (!$WeakMap) {
	/** @type {import('.')} */
	// @ts-expect-error
	exported = function isWeakMap(x) { // eslint-disable-line no-unused-vars
		// `WeakMap` is not present in this environment.
		return false;
	};
}

var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$mapHas) {
	/** @type {import('.')} */
	// @ts-expect-error
	exported = function isWeakMap(x) { // eslint-disable-line no-unused-vars
		// `WeakMap` does not have a `has` method
		return false;
	};
}

/** @type {import('.')} */
module.exports = exported || function isWeakMap(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x, $mapHas);
		if ($setHas) {
			try {
				$setHas.call(x, $setHas);
			} catch (e) {
				return true;
			}
		}
		// @ts-expect-error TS can't figure out that $WeakMap is always truthy here
		return x instanceof $WeakMap; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};
