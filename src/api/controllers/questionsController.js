/**
 * Get all questions stored in a JSON file in "/ressources/questions.json".
 * @param {*} req Request data.
 * @param {*} res The response we'll send to the client.
 */
exports.list_all_questions = (req, res) => {
    const {questions} = require('../ressources/questions.json');

    res.status(200);
    res.json(questions);
    console.log("Questions successfully sent");
}