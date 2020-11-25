module.exports = (server) => {
    const userController = require("../controllers/userController");

    server
        .route("/schools/:school_id/users")
            .get(userController.list_all_users)
            .post(userController.create_a_user)
}