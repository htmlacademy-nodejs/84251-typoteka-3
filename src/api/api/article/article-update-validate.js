const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../logger`);

const articleKeys = ["title", "announce", "fullText", "category", "createdDate", "comments"]

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = keys.every((key) => articleKeys.includes(key));

  if (!keys.length || !keysExists) {
    logger.info(`The HTTP response status is ${HttpCode.BAD_REQUEST}`);
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
