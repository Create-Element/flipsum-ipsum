# Flipsum Ipsum

Flipsum Ipsum is a publically available API for generating random ipsum text.

## The Flipsum Ipsum Browser Extension

The browser extension makes it easy to generate ipsum text in your browser that you can copy/paste into your projects.

![Example ipsum browser extension](images/flipsum-ipsum-example-1.png)

The browser extension is just a thin wrapper (using jQuery) for the [Power Plugins Ipsum API](https://power-plugins.com/developer-tools/ipsum-text-generator/)

Source for the extension is in the "browser-extension" directory.

[Download for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/flipsum-ipsum/)

[Download for Chrome](https://chrome.google.com/webstore/detail/flipsum-ipsum/ofhjecammkdgkmnlenoicodomedkbgnk)

## Calling Flipsum Ipsum from node

Generate Lorem Ipsum text using the Flipsum Ipsum API at power-plugins.com. There are no module dependencies, it supports multiple ipsum text generators, and you can return HTML or an array of paragraphs (strings).

	npm i @headwall/flipsum-ipsum

### Sample usage

	const flipsumIpsum = require('@headwall/flipsum-ipsum');

	// Generate generic ipsum as an array of strings
	flipsumIpsum.generateArray()
		.then((ipsum) => console.log(ipsum));

	// Generate 10 paragraphs of Jabberwocky ipsum as an array of strings
	flipsumIpsum.generateArray('jabberwocky',10)
		.then((ipsum) => console.log(ipsum));

	// Generate 15 paragraphs of recipe ipsum as HTML
	flipsumIpsum.generateHtml('recipe', 15)
		.then((ipsum) => console.log(ipsum));

	// Get some meta data about the Star Trek ipsum
	flipsumIpsum.getIpsumMeta('star-trek')
		.then((ipsumMeta) => console.log(ipsumMeta));
