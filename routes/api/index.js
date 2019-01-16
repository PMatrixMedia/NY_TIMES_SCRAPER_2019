const router = require("express").Router();
const articleRoutes = require("./articles");

console.log("articles api routes included");

router.use("/articles", articleRoutes);

module.exports = router;
