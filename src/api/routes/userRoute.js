module.exports = (server) => {
    const userController = require("../controllers/userController");

    server
        .route("/schools/:school_id/users")
            .get(userController.list_all_users)
            .post(userController.create_an_user);
    
    server
        .route("/login")
            .post(userController.login_an_user);
}