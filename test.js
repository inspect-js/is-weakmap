import test from 'ava';
import isWeakMap from './';

test(t => {
	t.true(isWeakMap(new WeakMap()));
	t.false(isWeakMap(new Map()));
	t.false(isWeakMap({}));

	t.end();
});
