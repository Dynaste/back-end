exports.list_all_questions = (req, res) => {
    const questions = {
        q1: "Quel est le nom du projet ? : ",
        q2: "Quels sont les technologies utilisées pour ce projet ? : ",
        q3: "Quel secteur visez vous ? (ex: Finance, Data, Medical) : ",
        q4: "Parlez nous de votre solution : ",
        q5: "Qu'attendez vous de ce Hackathon ? : "
    
    };

    res.status(200);
    res.json(questions);
    console.log("Questions successfully sent");
}