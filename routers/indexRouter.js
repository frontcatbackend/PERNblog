const homeRouter = require("express").Router();
const ArticleController = require("../controllers/articles");
const protect = require("../middleware/authMiddleware");

homeRouter.post("/create", protect, ArticleController.createArticle);
homeRouter.get("/get", ArticleController.getAllArticles);
homeRouter.get("/get/:id", ArticleController.getOneArticle);
homeRouter.delete("/del/:id", protect, ArticleController.deleteArticle);
homeRouter.put("/get/:id", ArticleController.updateArticle);

module.exports = homeRouter;
