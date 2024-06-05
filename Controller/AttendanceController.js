const attendanceSchema = require('../Schema/AttendanceSchema');
const qrSchema = require('../Schema/QRSchema');

const addAttendance = async (req, res) => {
    // var id =await req.params.id;
    // var qrText1 =await req.params.qrText;
    var id = await req.body.id;
    var qrText1 = await req.body.qrText;
    console.log("id : " + id);
    console.log("qrText : " + qrText1);
    const qrData1 = await qrSchema.find({
        'qrText': qrText1,
        'qrStatus': "generated"
    });
    console.log(qrData1);
    if (qrData1 && qrData1.length > 0) {
        const attendanceObj = {
            branch: qrData1[0].branch,
            sem: qrData1[0].sem,
            subject: qrData1[0].subject,
            facultyId: qrData1[0].facultyId,
            studentId: id,
            dateStatus: qrData1[0].createdAt,
            attendanceStatus: "present"
        }

        const attendance = new attendanceSchema(attendanceObj);
        console.log("a : ", attendance);
        (await attendance.save()).populate("studentId").then((data) => {
            res.status(200).json({
                message: "attendance fill successfully",
                data: data.studentId.enrollmentNumber
            });
        }).catch((err) => {
            res.status(500).json({
                message: "error",
                error: err
            });
        })
    }
    else {
        res.status(200).json({
            message: "You are late this qr is disable",
            data: "SORRY"
        })
    }

}
const getLive = async (req, res) => {
    var createdAt = await req.body.createAt;
    console.log("createdAt : ", createdAt);
    const attendance = await attendanceSchema.find({
        // 'dateStatus': createdAt,
        dateStatus: createdAt
    }).populate("studentId").populate("facultyId");
    console.log(attendance);

    if (attendance && attendance.length > 0) {
        res.status(200).json({
            message: "fetch",
            data: attendance
        });
    }
}
const getAllAttendance = async (req, res) => {
    var studentId = req.body.sId;
    console.log("student : ", studentId);
    const attendance = await attendanceSchema.find({ studentId: studentId }).populate('branch').populate('sem').populate('subject').populate('studentId').populate('facultyId');
    console.log(attendance);

    if (attendance) {
        res.status(200).json({
            message: "attendance fetch successfully",
            data: attendance
        })
    }
    else {
        res.status(500).json({
            message: "error in fetch attendance"
        })
    }
}
const getSubjectWiseAttendance = async (req, res) => {
    var studentId = req.body.sId;
    var subjectId = req.body.subjectId;
    console.log("student : ", studentId);
    console.log("subject : ", subjectId.subject);
    const attendance = await attendanceSchema.find({ studentId: studentId, subject: subjectId.subject }).populate('branch').populate('sem').populate('subject').populate('studentId').populate('facultyId');
    console.log(attendance);

    if (attendance) {
        res.status(200).json({
            message: "attendance fetch successfully",
            data: attendance
        })
    }
    else {
        res.status(500).json({
            message: "error in fetch attendance"
        })
    }
}
module.exports = {
    addAttendance,
    getAllAttendance,
    getSubjectWiseAttendance,
    getLive
}