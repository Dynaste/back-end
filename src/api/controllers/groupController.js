const Group = require("../models/groupModel");
const {
  capitalize,
  checkMembersKeys,
  checkQuestionsKeys,
} = require("../utils/utils");

// #region Groups

/**
 * Get a list of all groups.
 * @param {*} req The request sent.
 * @param {*} res The response of the request.
 */
exports.list_all_groups = (req, res) => {
  Group.find({}, (err, groups) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(200);
      res.json(groups);
      console.log("Groups successfully retrieved");
    }
  });
};

/**
 * Post a new group to the DataBase.
 * @param {*} req The request sent, where req.body will contains all data we'll need to do the post.
 * @param {*} res The response of the request.
 */
exports.create_a_group = async (req, res) => {
  const { members, questions, about } = req.body;

  try {
    if (checkMembersKeys(members) && checkQuestionsKeys(questions) && about) {
      const emailDoublons = [];

      /**
       * Format members property to avoid non capitalize firstname, lower-cased email and upper-cased lastname.
       */
      members.forEach((member) => {
        member.lastname = member.lastname.toUpperCase();
        member.firstname = capitalize(member.firstname);
        member.email = member.email.toLowerCase();

        
      });

      /**
       * Check if members contains a duplicated email.
       * If there's more than 1 occurence of that email, you can't create a group.
       */
      for (let i = 0; i < members.length; i++) {
        if (
          members.filter((member) => {
            return members[i].email === member.email;
          }).length > 1
        ) {
          emailDoublons.push(members[i].email);
        }
      }

      console.log("emailDoublon :>> ", emailDoublons);

      if (emailDoublons.length === 0) {
        const new_group = new Group({ ...req.body });

        new_group.save((err, group) => {
          if (err) {
            res.status(500);
            res.json({
              message: "Internal error occured",
            });
          } else {
            res.status(201);
            res.json(group);
            console.log("Group successfully created");
          }
        });
      }
      else{
        res.status(500);
      res.json({
        // message: err.message, log error precis pour debug
        message: "Internal error occured",
      });
      }
    } else {
      res.status(500);
      res.json({
        // message: err.message, log error precis pour debug
        message: "Internal error occured",
      });
    }
  } catch (err) {
    res.status(500);
    res.json({
      message: "Internal error occured",
    });
    console.log(err);
  }
};
// #endregion
