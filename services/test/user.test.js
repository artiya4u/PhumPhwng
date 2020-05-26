const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const nock = require('nock');
const HTMLParser = require('node-html-parser');
const { init, setup } = require('../lib/server');

const expectedReposNamePage1 = [
  'nodejs/node-v0.x-archive',
  'mongodb/node-mongodb-native',
  'sindresorhus/awesome-nodejs',
  'wchaowu/nodejs',
  'kelektiv/node-cron',
  'yagop/node-telegram-bot-api',
  'nqdeng/7-days-nodejs',
  'kelektiv/node.bcrypt.js',
  '0532/nodejs',
  'amir20/phantomjs-node',
];

describe('Search repos for nodejs', async function () {
  let server;
  beforeEach(async () => {

  });

  afterEach(async () => {
    await server.stop();
  });

  it('Get search first result', async function () {
    let mockSearchResponse = require('../__mock_data__/search/page-1');
    // Intercept request to Github API and reply mock response.
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=1')
      .reply(200, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search',
    });
    expect(res.statusCode).to.equal(200);
    let document = HTMLParser.parse(res.payload);
    let rows = document.querySelectorAll('#searchResult tbody tr');

    for (let i = 0; i < 10; i++) {
      let row = rows[i];
      let repoName = row.childNodes[1].text;
      expect(expectedReposNamePage1[i]).to.equal(repoName);
    }

    // Test pagination
    let nav = document.querySelector('nav');
    let pageLinks = nav.querySelectorAll('a');
    expect(pageLinks[0].getAttribute('href')).to.equal('?page=0');
    expect(pageLinks[1].getAttribute('href')).to.equal('?page=1');
    expect(pageLinks[2].getAttribute('href')).to.equal('?page=2');
    expect(pageLinks[3].getAttribute('href')).to.equal('?page=3');
    expect(pageLinks[4].getAttribute('href')).to.equal('?page=4');
    expect(pageLinks[5].getAttribute('href')).to.equal('?page=5');
    expect(pageLinks[6].getAttribute('href')).to.equal('?page=2');

    let pageItems = document.querySelectorAll('.page-item');
    expect(pageItems[0].text.trim()).to.equal('Previous');
    expect(pageItems[1].text.trim()).to.equal('1');
    expect(pageItems[2].text.trim()).to.equal('2');
    expect(pageItems[3].text.trim()).to.equal('3');
    expect(pageItems[4].text.trim()).to.equal('4');
    expect(pageItems[5].text.trim()).to.equal('5');
    expect(pageItems[6].text.trim()).to.equal('Next');
    let disableds = document.querySelectorAll('.disabled');
    expect(disableds[0].text.trim()).to.equal('Previous');
    let actives = document.querySelectorAll('.active');
    expect(actives[0].text.trim()).to.equal('1');
  });

  it('Get search first result with page number', async function () {
    let mockSearchResponse = require('../__mock_data__/search/page-1');
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=1')
      .reply(200, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search?page=1',
    });
    expect(res.statusCode).to.equal(200);
    let document = HTMLParser.parse(res.payload);
    let rows = document.querySelectorAll('#searchResult tbody tr');

    for (let i = 0; i < 10; i++) {
      let row = rows[i];
      let repoName = row.childNodes[1].text;
      expect(expectedReposNamePage1[i]).to.equal(repoName);
    }
  });

  it('Get search result with page 3', async function () {
    let mockSearchResponse = require('../__mock_data__/search/page-1');
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=1')
      .reply(200, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search?page=3',
    });
    expect(res.statusCode).to.equal(200);
    let document = HTMLParser.parse(res.payload);
    let rows = document.querySelectorAll('#searchResult tbody tr');

    const expectedReposNamePage3 = [
      'whxaxes/node-test',
      'copy/v86',
      'bda-research/node-crawler',
      'googleapis/google-api-nodejs-client',
      'motdotla/dotenv',
      'techpines/express.io',
      'Schmavery/facebook-chat-api',
      'node-gh/gh',
      'mgcrea/node-xlsx',
      'rsms/node-imagemagick',
    ];

    for (let i = 0; i < 10; i++) {
      let row = rows[i];
      let repoName = row.childNodes[1].text;
      expect(expectedReposNamePage3[i]).to.equal(repoName);
    }

    // Test pagination
    let nav = document.querySelector('nav');
    let pageLinks = nav.querySelectorAll('a');
    expect(pageLinks[0].getAttribute('href')).to.equal('?page=2');
    expect(pageLinks[1].getAttribute('href')).to.equal('?page=1');
    expect(pageLinks[2].getAttribute('href')).to.equal('?page=2');
    expect(pageLinks[3].getAttribute('href')).to.equal('?page=3');
    expect(pageLinks[4].getAttribute('href')).to.equal('?page=4');
    expect(pageLinks[5].getAttribute('href')).to.equal('?page=5');
    expect(pageLinks[6].getAttribute('href')).to.equal('?page=4');

    let pageItems = document.querySelectorAll('.page-item');
    expect(pageItems[0].text.trim()).to.equal('Previous');
    expect(pageItems[1].text.trim()).to.equal('1');
    expect(pageItems[2].text.trim()).to.equal('2');
    expect(pageItems[3].text.trim()).to.equal('3');
    expect(pageItems[4].text.trim()).to.equal('4');
    expect(pageItems[5].text.trim()).to.equal('5');
    expect(pageItems[6].text.trim()).to.equal('Next');
    let disableds = document.querySelectorAll('.disabled');
    expect(disableds.length).to.equal(0);
    let actives = document.querySelectorAll('.active');
    expect(actives[0].text.trim()).to.equal('3');
  });

  it('Get search result with page 4', async function () {
    let mockSearchResponse = require('../__mock_data__/search/page-2');
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=2')
      .reply(200, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search?page=4',
    });
    expect(res.statusCode).to.equal(200);
    let document = HTMLParser.parse(res.payload);
    let rows = document.querySelectorAll('#searchResult tbody tr');

    const expectedReposNamePage4 = [
      'pksunkara/octonode',
      'heroku/heroku-buildpack-nodejs',
      'dilame/instagram-private-api',
      'justadudewhohacks/opencv4nodejs',
      'dockerfile/nodejs',
      'abalabahaha/eris',
      'nchaulet/node-geocoder',
      'chyingp/nodejs-learning-guide',
      'isaacs/rimraf',
      'justadudewhohacks/face-api.js',
    ];

    for (let i = 0; i < 10; i++) {
      let row = rows[i];
      let repoName = row.childNodes[1].text;
      expect(expectedReposNamePage4[i]).to.equal(repoName);
    }

    // Test pagination
    let nav = document.querySelector('nav');
    let pageLinks = nav.querySelectorAll('a');
    expect(pageLinks[0].getAttribute('href')).to.equal('?page=3');
    expect(pageLinks[1].getAttribute('href')).to.equal('?page=2');
    expect(pageLinks[2].getAttribute('href')).to.equal('?page=3');
    expect(pageLinks[3].getAttribute('href')).to.equal('?page=4');
    expect(pageLinks[4].getAttribute('href')).to.equal('?page=5');
    expect(pageLinks[5].getAttribute('href')).to.equal('?page=6');
    expect(pageLinks[6].getAttribute('href')).to.equal('?page=5');

    let pageItems = document.querySelectorAll('.page-item');
    expect(pageItems[0].text.trim()).to.equal('Previous');
    expect(pageItems[1].text.trim()).to.equal('2');
    expect(pageItems[2].text.trim()).to.equal('3');
    expect(pageItems[3].text.trim()).to.equal('4');
    expect(pageItems[4].text.trim()).to.equal('5');
    expect(pageItems[5].text.trim()).to.equal('6');
    expect(pageItems[6].text.trim()).to.equal('Next');
    let disableds = document.querySelectorAll('.disabled');
    expect(disableds.length).to.equal(0);
    let actives = document.querySelectorAll('.active');
    expect(actives[0].text.trim()).to.equal('4');
  });

  it('Get error from github API', async function () {
    let mockSearchResponse = { message: 'This is a mock error' };
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=1')
      .reply(403, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search',
    });
    expect(res.statusCode).to.equal(403);
    expect(res.result.error).to.equal('Forbidden');
    expect(res.result.message).to.equal('This is a mock error');
  });

  it('Get search result from page 100', async function () {
    let mockSearchResponse = require('../__mock_data__/search/page-2');
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=34')
      .reply(200, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search?page=100',
    });
    expect(res.statusCode).to.equal(200);

    let document = HTMLParser.parse(res.payload);

    // Test pagination
    let nav = document.querySelector('nav');
    let pageLinks = nav.querySelectorAll('a');
    expect(pageLinks[0].getAttribute('href')).to.equal('?page=99');
    expect(pageLinks[1].getAttribute('href')).to.equal('?page=98');
    expect(pageLinks[2].getAttribute('href')).to.equal('?page=99');
    expect(pageLinks[3].getAttribute('href')).to.equal('?page=100');
    expect(pageLinks[4].getAttribute('href')).to.equal('?page=101');
    expect(pageLinks[5].getAttribute('href')).to.equal('?page=102');
    expect(pageLinks[6].getAttribute('href')).to.equal('?page=-1');

    let pageItems = document.querySelectorAll('.page-item');
    expect(pageItems[0].text.trim()).to.equal('Previous');
    expect(pageItems[1].text.trim()).to.equal('98');
    expect(pageItems[2].text.trim()).to.equal('99');
    expect(pageItems[3].text.trim()).to.equal('100');
    expect(pageItems[4].text.trim()).to.equal('101');
    expect(pageItems[5].text.trim()).to.equal('102');
    expect(pageItems[6].text.trim()).to.equal('Next');
    let disableds = document.querySelectorAll('.disabled');
    expect(disableds[0].text.trim()).to.equal('101');
    expect(disableds[1].text.trim()).to.equal('102');
    expect(disableds[2].text.trim()).to.equal('Next');
    expect(disableds.length).to.equal(3);
    let actives = document.querySelectorAll('.active');
    expect(actives[0].text.trim()).to.equal('100');
  });

  it('Get search result from page 101', async function () {
    let mockSearchResponse = { message: 'Not found' };
    nock('https://api.github.com')
      .get('/search/repositories?q=nodejs&page=1')
      .reply(404, mockSearchResponse);
    server = await setup();
    server = await init();
    const res = await server.inject({
      method: 'GET',
      url: '/search?page=101',
    });
    expect(res.statusCode).to.equal(404);
  });
});
