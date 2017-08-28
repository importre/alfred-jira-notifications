'use strict';

const alfy = require('alfy');
const keytar = require('keytar');

if (alfy.input) {
	const user = JSON.parse(alfy.input);

	alfy.config.set('user', {
		home: user.home,
		id: user.id
	});

	keytar.setPassword(user.home, user.id, user.pw)
		.then(console.log)
		.catch(console.log);
}

