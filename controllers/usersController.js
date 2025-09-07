// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const bioLengthErr = "must be between 1 and 200 characters.";
const emailErr = "is not a valid email address.";
const ageErr = "must be between 18 and 120";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),

  body("age").trim().isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),
  body("bio")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Bio ${bioLengthErr}`),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  },
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearch = (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;

  const users = usersStorage.getUsers();
  console.log(firstName, lastName, email);

  console.log(users);

  if (firstName) {
    console.log("there is a firstname");
  }
  if (lastName) {
    console.log("there is a lastName");
  }

  const searchValue = firstName;
  const searchField = "firstName";

  const searchResult = searchUserObject(users, searchField, searchValue);
  const searchResults = users.filter((user) => user.firstName === firstName);

  console.log(searchResult);

  // Get details from req.query: firstname, lastname, email
  // get storage from usersStorage.getUsers - do I need to get it or can I access from the usersStroage ojbect?
  // if firstname, map across firstnames,
  // ---- if found, if lastname, map across lastnames
  //        --- else, else, say no person found

  // ---- if found, if email, map across emails.
  ///         --- else, produce person
  // -----if found, present person

  // if !firstname, then map across lastname
  // ---- if found, if email, map across email
  //        --- else, produce person
  // if found, produce email.
  // -- else, say no person found

  // Get reg.query.firstname

  res.redirect("/");
};

function searchUserObject(userObject, searchField, searchValue) {
  console.log(searchField, searchValue);
  return userObject.filter((user) => user[searchField] === searchValue);
}
