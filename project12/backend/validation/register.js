const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};


    data.name = !isEmpty(data.name) ? data.name : "";
    data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    


    if(Validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }

    if(Validator.isEmpty(data.mobilenumber)){
        errors.mobilenumber = "Mobile number is required";
    }else if(!Validator.isMobilePhone(data.mobilenumber)){
        errors.mobilenumber = "Enter a valid mobile number";
    }else if(!Validator.isLength(data.mobilenumber, {min : 10, max : 10})){
        errors.mobilenumber = "Enter a valid mobile number";
    }


    if(!Validator.isEmpty(data.email)){
        if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
}

    if(Validator.isEmpty(data.password)){
        errors.password = "password is required";
    }

    // if(Validator.isEmpty(data.password2)){
    //     errors.password2 = "Confirm password is required";
    // }

    if(!Validator.isLength(data.password, {min : 6, max : 25})){
        errors.password = "Password must be atleat 6 characters";
    }



    // if(!Validator.equals(data.password, data.password2)){
    //     errors.password2 = "Password must match";
    // }

    return{
        errors,
        isValid : isEmpty(errors)
    };

};