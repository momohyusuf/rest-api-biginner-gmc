const routeNotFound = (req, res) =>
  res.status(400).json({
    message: `Sorry "${req.url}" does not exist, please check the route properly`,
  });

module.exports = { routeNotFound };
