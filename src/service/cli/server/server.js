'use strict';

const http = require(`http`);

const constants = require(`../../../constants`);
const {readMockFile, buildHTMLFromTitles} = require(`../../../utils`);
const HTTP_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
}


const onClientConnect = async (req, res) => {
  let content = ``;
  switch (req.url) {
    case `/`:

      try {
        const data = JSON.parse(await readMockFile());
        content = buildHTMLFromTitles(data);

        res.writeHead(HTTP_CODES.SUCCESS, {
          'Content-Type': `text/html; charset=UTF-8`,
        });
      } catch (err) {
        res.writeHead(HTTP_CODES.NOT_FOUND, {
          'Content-Type': `text/html; charset=UTF-8`,
        });
      }

      break;
    default:
      res.writeHead(HTTP_CODES.NOT_FOUND, {
        'Content-Type': `text/plain; charset=UTF-8`,
      });
  }

  res.end(content);
};

async function startServer(port) {
  try {
    const httpServer = http.createServer(onClientConnect);
    await httpServer.listen(port);
  } catch (err) {
    process.exit(constants.ExitCode.failure);
  }
}

module.exports = {
  startServer,
};
