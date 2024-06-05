const semSchema = require('../Schema/SemSchema');

const addSem = async(req,res)=>{
    const sem = new semSchema({title : req.body.title});
    sem.save().then((data)=>{
        res.status(200).json({
            message : "sem add successfully",
            data : data
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "error",
            error : err
        })
    })
}
const getAllSem = async (req, res) => {
    const sem = await semSchema.find();
    if (sem) {
        res.status(200).json({
            message: "semister fetch successfully",
            data: sem
        });
    } else {
        res.status(500).json({
            message: "Error in fetching semister",
        });
    }
}
module.exports={
    addSem,
    getAllSem
}