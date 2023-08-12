const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const admin = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = admin;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: 'Not authentified!' });
    }
  },
};
