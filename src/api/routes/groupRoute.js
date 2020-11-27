module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const {verify_token} = require("../middleware/jwtMiddleware");
  
    server
      .route("/groups")
          .get(groupController.list_all_groups)
          .post(groupController.create_a_group);

    server
      .route("/schools/:school_id/groups") // req.params.school_id
        .get(groupController.list_all_school_groups)

    server
      .route("/groups/:group_id")
        .get(groupController.get_a_group)
        .put(verify_token, groupController.update_a_group)
        .delete(verify_token, groupController.delete_a_group);


    /* server
      .route("/groups")
          .get(groupController.list_all_groups)
          .post(groupController.create_a_group);

    server
      .route("/schools/:school_id/groups")
        .get(groupController.list_all_school_groups)

    server
      .route("/schools/:school_id/groups/:group_id") // req.params.school_id
        .get(groupController.get_a_group)
        .put(verify_token, groupController.update_a_group)
        .delete(verify_token, groupController.delete_a_group); */
  };
  