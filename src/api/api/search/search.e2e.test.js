'use strict';

const request = require(`supertest`);
const app = require('../../app');

describe(`Search API end-point`, () => {
  test(`that search returns the valid result`, async () => {
    const res = await request(await app).get(`/api/search`).query({query: `Борьба`});
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(1);
  });
  test(`that search returns an empty array when no search result found`, async () => {
    const res = await request(await app).get(`/api/search`).query({query: `foobar`});
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(0);
  });
});