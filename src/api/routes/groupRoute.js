module.exports = (server) => {
    const groupController = require("../controllers/groupController");
  
    server
      .route("/groups")
          .get(groupController.list_all_groups)
          .post(groupController.create_a_group);
  };
  