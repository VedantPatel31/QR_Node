const { Mongoose } = require('mongoose');
const qrSchema = require('../Schema/QRSchema');
const randomStr = async (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans;
}
const generateQR = async (req, res) => {

    const options = {
        timeZone: 'Asia/Kolkata', 
        hour12: true,
      };
    
    const qrText = await randomStr(20, '12345abcde');
    // console.log(qrText);
    const qrObj = {
        branch: req.body.data.branch,
        sem: req.body.data.sem,
        subject: req.body.data.subject,
        facultyId : req.body.facultyId,
        qrStatus: "generated",
        qrText: qrText,
        createdAt:new Date().toLocaleString('en-IN', options)

    }
    const qrCode = new qrSchema(qrObj);
    qrCode.save().then((data) => {
        res.status(200).json({
            message: "data add successfully",
            data: qrCode
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    })
}
const completeQR = async (req, res) => {
    const qrText1 = req.body.qrText;
    console.log(qrText1);
    const qrData1 = await qrSchema.findOneAndUpdate(
        { qrText: qrText1 },
        { $set: { qrStatus: "complete" } }
    );
    
    if (qrData1) {
        res.status(200).json({
            message: "success"
        })
    }else{
        res.status(500).json({
            message: "error 1"
        })
    }

}

module.exports = {
    generateQR,
    completeQR
}