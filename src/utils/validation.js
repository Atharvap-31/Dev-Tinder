const validator = require('validator')

const validateSignUpApi = (data) =>{

    const {firstName,lastName, emailId, password} = data.body

    if(!firstName || !lastName){
        throw new Error("Name doest not exists");
    }else if(firstName.length < 4 || firstName.length > 20){
        throw new Error("Name should be 4 to 20 characters");
        
    }else if(!validator.isEmail(emailId)){
     throw new Error("Email Id format is not correct");
        
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong passsword");
        
    }

}

const validateProfileEdit = (req) =>{
    const allowedEditProfiles = ["email", "age", "skills","about","photoUrl"]

    console.log(req.body.skills.length);
    
    if(req.body.skills.length > 6){
        throw new Error("Skills limit exeded");
    }

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditProfiles.includes(field));

    return isEditAllowed
}

module.exports = {validateSignUpApi,validateProfileEdit}