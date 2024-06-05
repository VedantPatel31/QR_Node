const subjectSchema = require('../Schema/SubjectSchema');

const addSubject = async (req,res)=>{
    const subjectObj = {
        subjectName: req.body.subjectName,
        subjectCode: req.body.subjectCode,
        docURL: req.body.docURL,
        credits:req.body.credits
    } 
    const subject = new subjectSchema(subjectObj);
    console.log("sub",subject);
    subject.save().then((data)=>{
        res.status(200).json({
            message : "subject add successfully",
            data : data
        });
    }).catch((err)=>{
        res.status(500).json({
            message : "error",
            error : err
        })
    })
}
const getALlSubject = async (req,res)=>{
    const subject =await subjectSchema.find();
    if(subject){
        res.status(200).json({
            message : "subject fetch successfully",
            data : subject
        })
    }else{
        res.status(500).json({
            message : "Error in fetching subjects"
        })
    }

    
}
module.exports = {
    addSubject,
    getALlSubject
}