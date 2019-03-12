const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {

    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : "";
  
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = "Enter your mobile number";
  } else if (!Validator.isMobilePhone(data.mobilenumber)) {
    errors.mobilenumber = "Enter a valid mobile number";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};