/**
 * test.js
 */

const flipsumIpsum = require('./index');

const TEST_IPSUM_SLUG = 'star-trek';
const TEST_PARAGRAPH_COUNT = 10;

const ipsumTests = {
  arrayTest: () => {
    console.log('ARRAY : START');
    return new Promise((resolve, reject) => {
      flipsumIpsum
        .generateArray(TEST_IPSUM_SLUG, TEST_PARAGRAPH_COUNT)
        .then((paragraphs) => {
          console.log(`ARRAY : Length ${paragraphs.length} ${paragraphs.length === TEST_PARAGRAPH_COUNT ? '✅' : '⚠️'}`);
        })
        .then(() => {
          console.log('ARRAY : END');
          console.log();
          resolve();
        });
    });
  },

  htmlTest: () => {
    console.log('HTML : START');
    return new Promise((resolve, reject) => {
      flipsumIpsum
        .generateHtml(TEST_IPSUM_SLUG, TEST_PARAGRAPH_COUNT)
        .then((paragraphs) => {
          console.log(`HTML : ${typeof paragraphs} ${typeof paragraphs == 'string' ? '✅' : '⚠️'}`);
          if (typeof paragraphs == 'string') {
            console.log(`HTML : ${paragraphs.substring(0, 64).trim()}...`);
          }
        })
        .then(() => {
          console.log('HTML : END');
          console.log();
          resolve();
        });
    });
  },

  getIpsumMetaTest: () => {
    console.log('META : START');
    return new Promise((resolve, reject) => {
      flipsumIpsum
        .getIpsumMeta(TEST_IPSUM_SLUG)
        .then((ipsumMeta) => {
          console.log(`META : Name = ${ipsumMeta.name} (${ipsumMeta.slug}) ${ipsumMeta.slug === TEST_IPSUM_SLUG ? '✅' : '⚠️'}`);
          console.log(`META : Home = ${ipsumMeta['home-url']}`);
        })
        .then(() => {
          console.log('META : END');
          console.log();
          resolve();
        });
    });
  },
};

/**
 * Run the tests.
 */
ipsumTests
  .arrayTest()
  .then(() => ipsumTests.htmlTest())
  .then(() => ipsumTests.getIpsumMetaTest())
  .then(() => console.log('Finished all tests'));
