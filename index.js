'use strict';

const alfy = require('alfy');
const htmlToText = require('html-to-text');
const keytar = require('keytar');

const user = alfy.config.get('user');
const baseUrl = user.home;
const url = `${baseUrl}/wiki/rest/mywork/latest/notification/nested`;

const empty = [{
	title: 'No notifications',
	subtitle: baseUrl,
	arg: baseUrl,
	icon: {
		path: 'empty.png'
	}
}];

function makeItem(data) {
	return data.notifications.map(i => {
		const description = htmlToText
			.fromString(i.description, {
				ignoreHref: true,
				noLinkBrackets: true
			})
			.replace(/\n+/g, ' ');
		return {
			title: data.item.title,
			subtitle: `${i.title}: ${description}`,
			arg: `${i.id}|${baseUrl}/${i.url}`,
			read: i.read,
			icon: {
				path: i.read ? 'icon.png' : 'unread.png'
			}
		};
	});
}

function showOutput(data) {
	const items = data
		.map(makeItem)
		.reduce((acc, item) => acc.concat(item), [])
		//.filter(item => !item.read);

	alfy.output(items.length > 0 ? items : empty);
}

keytar.getPassword(user.home, user.id)
	.then(pw => {
		const auth = new Buffer(`${user.id}:${pw}`).toString('base64');
		const options = {
			maxAge: 1000 * 60,
			headers: {
				Authorization: `Basic ${auth}`
			}
		};
		alfy.fetch(url, options)
			.then(showOutput);
	});

