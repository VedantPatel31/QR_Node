const facultySchema = require('../Schema/FacultySchema');
const passwordUtil = require('../Util/PasswordUtil');
const tokenUtil = require('../Util/TokenUtil');
const mailUtil = require('../Util/MailUtil');
const FacultySchema = require('../Schema/FacultySchema');

const registerFacultyWithEnc = async (req,res)=>{
    const hashedPassword = await passwordUtil.encryptPassword(req.body.password);
    const facultyObject = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashedPassword
    }

    const faculty = new facultySchema(facultyObject);
    var token = tokenUtil.generateToken(faculty.toObject());
    faculty.save().then((data)=>{
        mailUtil.sendMail(req.body.email,"welcome to our app").then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
        res.status(201).json({
            message : "user registration is successfull",
            data : token
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "error",
            error : err
        })
    })
}

const loginFacultyWithEnc = async (req,res)=>{
    var fEmail = req.body.email;
    var fPassword = req.body.password;
    const faculty = await facultySchema.findOne({email : fEmail});
    console.log("email",fEmail);
    console.log("pass",fPassword);
    console.log(faculty);
    var token = tokenUtil.generateToken(faculty.toObject());

    if(faculty){
        console.log("in first if");
        if(await passwordUtil.comparePassword(fPassword,faculty.password)){
            res.status(200).json({
                message : "login success",
                data : faculty._id,token
            })
        }else{
            res.status(404).json({
                message : "invalid credentials inside"
            })
        }
    }else{
        res.status(404).json({
            message : "invalid credentials"
        })
    }
}

const getAllFaculty = async (req,res)=>{
    const faculty = await facultySchema.find();

    if(faculty){
        res.status(200).json({
            message:"faculty fetch successfull",
            data : faculty
        })
    }
    else{
        res.status(500).json({
            message:"error in fetch faculty",
        })
    }
}
module.exports = {
    registerFacultyWithEnc,
    loginFacultyWithEnc,
    getAllFaculty
}