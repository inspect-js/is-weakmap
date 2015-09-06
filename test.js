'use strict';
var test = require('ava');
var isWeakMap = require('./');

test(function (t) {
	t.true(isWeakMap(new WeakMap()));
	t.false(isWeakMap(new Map()));
	t.false(isWeakMap({}));

	t.end();
});
