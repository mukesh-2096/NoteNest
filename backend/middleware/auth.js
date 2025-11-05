const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization') || req.header('authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
