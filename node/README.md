# Calling Flipsum Ipsum from node

Generate Lorem Ipsum text using the Flipsum Ipsum API at power-plugins.com. There are no module dependencies, it supports multiple ipsum text generators, and you can return HTML or an array of paragraphs (strings).

## Installation

```bash
npm i @headwall/flipsum-ipsum
```

## Sample usage

```javascript
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
```
