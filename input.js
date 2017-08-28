#!/usr/bin/env osascript -l JavaScript

const app = Application.currentApplication();
app.includeStandardAdditions = true;

function showDialog(message, hidden, defaultAnswer) {
	try {
		return app.displayDialog(message, {
			defaultAnswer,
			withTitle: 'JIRA',
			hiddenAnswer: hidden
		});
	} catch (err) {
		return {};
	}
}

function run(argv) {
	const homeAnswer = showDialog(
		'Please enter JIRA url', false, 'https://<TEAM>.atlassian.net'
	);
	if (homeAnswer.buttonReturned !== 'OK') {
		return null;
	}
	const idAnswer = showDialog('Please enter JIRA ID', false, '');
	if (idAnswer.buttonReturned !== 'OK') {
		return null;
	}

	const pwAnswer = showDialog('Please enter JIRA Password', true, '');
	if (pwAnswer.buttonReturned !== 'OK') {
		return null;
	}

	return JSON.stringify({
		home: homeAnswer.textReturned,
		id: idAnswer.textReturned,
		pw: pwAnswer.textReturned
	});
}

