const branchSchema = require('../Schema/BranchSchema');

const addBranch = async (req, res) => {
    const branch = new branchSchema({ branchName: req.body.branchName });
    branch.save().then((data) => {
        res.status(200).json({
            message: "branch add successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            errpr: err
        })
    })
}
const getAllBranch = async (req, res) => {
    const Branch = await branchSchema.find();
    // console.log(Branch);
    if (Branch) {
        res.status(200).json({
            message: "Branch fetch successfully",
            data: Branch
        });
    } else {
        res.status(500).json({
            message: "Error in fetching branches",
        });
    }
}
module.exports = {
    addBranch,
    getAllBranch
}