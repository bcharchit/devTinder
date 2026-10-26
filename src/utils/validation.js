const validator=require("validator")
const validateSignupData=(req)=>{

const {firstName,lastName,emailId,password}=req.body;

if(!firstName || !lastName ){
    throw new Error("firstName and lastName are required")          
}
if(validator.isEmail(emailId)===false){

    throw new Error("invalid email")
}   
if(!validator.isStrongPassword(password)){
    throw new Error("password should be strong")    }

}

module.exports={validateSignupData};
