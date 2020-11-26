const Group = require("../models/groupModel");
const School = require('../models/schoolModel');
const {
  capitalize,
  checkMembersKeys,
  checkQuestionsKeys,
} = require("../utils/utils");
const jwt = require('jsonwebtoken');
const { json } = require("body-parser");

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
  const { members, questions, about, associatedSchoolId } = req.body;

  try {
    if (checkMembersKeys(members) && checkQuestionsKeys(questions) && about && associatedSchoolId) {
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
      } else {
        res.status(500);
        res.json({
          message: "Internal error occured",
        });
      }
    } else {
      res.status(500);
      res.json({
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

exports.list_all_school_groups = (req, res) => {
  const schoolId = req.params.school_id;

  console.log(schoolId)

  School.findById(schoolId, (err, school) => {
    if (err) {
      res.status(500);
      res.json({
        message: 'Server internal error. 1'
      });

    } else {
      Group.find({associatedSchoolId: schoolId}, (err, groups) => {
        if (err) {
          res.status(500);
          res.json({
            message: 'Server interal error 2'
          });
        } else {
          res.status(200);
          res.json(groups);
        }
      })
    }
  })
}

exports.get_a_group = (req, res) => {

  const groupId = req.params.group_id;

  Group.findById(groupId, (err, group) => {
    if (err || group === null) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else  {
      res.status(200);
      res.json(group);
      console.log("Group successfully retrieved");
    }
  });
};

exports.delete_a_group = (req, res) => {
  const groupId = req.params.group_id;
  const payload = jwt.decode(req.headers['authorization']);

  const groupData = Group.findById({groupId}).exec();
  console.log(groupData);
  if (groupData) {
    if (payload.associatedSchoolId === groupData.associatedSchoolId) {
    
      Group.findByIdAndRemove(groupId, (err, group) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "Successfully deleted"
        };
        return res.status(201).send(response);
        });
    } else {
      res.status(403);
      res.json({
        message: 'You are not an administrator of this school.'
      })
    }
  }
  else{
    res.status(500);
    res.json({
      message: 'Internal server error.'
    })
  }
}
