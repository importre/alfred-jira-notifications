'use strict';

const alfy = require('alfy');
const keytar = require('keytar');

const user = alfy.config.get('user');
const url = `${user.home}/wiki/rest/mywork/latest/notification/lastreadid`;

keytar.getPassword(user.home, user.id)
	.then(pw => {
		const auth = new Buffer(`${user.id}:${pw}`).toString('base64');
		const options = {
			method: 'PUT',
			body: alfy.input,
			maxAge: 0,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${auth}`
			}
		};

		alfy.fetch(url, options).then(() => console.log(alfy.input));
	});

