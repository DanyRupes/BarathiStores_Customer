const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCategoryInput(data) {

    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.categoryname = !isEmpty(data.categoryname) ? data.categoryname : "";
  
  data.displayorder = !isEmpty(data.displayorder) ? data.displayorder : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  
// Address checks
  if (Validator.isEmpty(data.categoryname)) {
    errors.categoryname = "Category name should not be empty";
  } 
// Landmark checks
  if (Validator.isEmpty(data.displayorder)) {
    errors.displayorder = "Display order should not be empty";
  }
// Description checks
  if(Validator.isEmpty(data.description)) {
      errors.description = "Description should not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};