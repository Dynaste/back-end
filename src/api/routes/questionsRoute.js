module.exports = (server) => {
    const questionsController = require("../controllers/questionsController");
  
    server
      .route("/questions")
          .get(questionsController.list_all_questions);
  };
  