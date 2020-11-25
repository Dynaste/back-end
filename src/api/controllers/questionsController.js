exports.list_all_questions = (req, res) => {
    const {questions} = require('../ressources/questions.json');

    res.status(200);
    res.json(questions);
    console.log("Questions successfully sent");
}