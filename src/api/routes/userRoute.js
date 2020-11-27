module.exports = (server) => {
    const userController = require("../controllers/userController");

    server
        .route("/schools/:school_id/user")
            .get(userController.get_school_user)
            .post(userController.create_an_user);
    
    server
        .route("/login")
            .post(userController.login_an_user);

    server
        .route("/users")
            .get(userController.get_all_users_from_all_schools);
}