module.exports = (server) => {
  const schoolController = require("../controllers/schoolController");

  server
    .route("/schools")
        .get(schoolController.list_all_schools)
        .post(schoolController.create_a_school);

  server
    .route("/schools/:school_id")
        .get(schoolController.get_a_school);
};
