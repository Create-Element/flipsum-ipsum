/**
 * index.js
 * 
 * Generate ipsum text using the Flipsum Ipsum API. More info here
 *
 * https://power-plugins.com/developer-tools/ipsum-text-generator/
 */

const self = {

	ipsums: {},

	apiUrl: 'https://power-plugins.com/api/flipsum',

	defaultSlug: 'lorem-ipsum',

	defaultParagraphCount: 5,

	getIpsums: () => {
		return new Promise((resolve, reject) => {
			if (Object.keys(self.ipsums).length > 0) {
				resolve(self.ipsums);
			} else {
				fetch(`${self.apiUrl}/ipsum`)
					.then((response) => response.json())
					.then((ipsumMetas) => {
						if (!Array.isArray(ipsumMetas)) {
							reject('Did not receive an array');
						}

						self.ipsums = {};
						ipsumMetas.forEach((ipsumMeta) => {
							self.ipsums[ipsumMeta.slug] = ipsumMeta;
						});

						resolve(self.ipsums);
					});
			}
		});
	},

	getIpsumMeta: (ipsumSlug) => {
		return new Promise((resolve, reject) => {
			self.getIpsums()
				.then((ipsumMetas) => {
					if (typeof ipsumMetas[ipsumSlug] === 'undefined') {
						reject(`Unknown ipsum: ${ipsumSlug}`);
					}

					resolve(ipsumMetas[ipsumSlug]);
				});
		});
	},

	generateArray: (ipsumSlug, paragraphCount) => {
		return self.generate(ipsumSlug, paragraphCount, false);
	},

	generateHtml: (ipsumSlug, paragraphCount) => {
		return self.generate(ipsumSlug, paragraphCount, true);
	},

	generate: (ipsumSlug, paragraphCount, asHtml) => {
		return new Promise((resolve, reject) => {
			if (!ipsumSlug) {
				ipsumSlug = self.defaultSlug;
			}

			paragraphCount = paragraphCount ? parseInt(paragraphCount) : self.defaultParagraphCount;
			if (paragraphCount <= 0) {
				reject(`Invalid paragraph count: ${paragraphCount}`)
			}

			const url = `${self.apiUrl}/ipsum/${ipsumSlug}?paragraphs=${paragraphCount}`;

			// Diagnostics
			// console.log(`URL: ${url}`);

			fetch(url)
				.then(response => response.json())
				.then((ipsum) => {
					if (asHtml) {
						resolve('<p>' + ipsum.join('</p><p>') + '</p>');
					} else {
						resolve(ipsum);
					}
				});

		});
	}
};


module.exports = self;