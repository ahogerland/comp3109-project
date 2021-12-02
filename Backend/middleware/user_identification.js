// SERVICES
const Student_Service = require('../Services/Student/Student_Service')

// each request that comes through will have a req.user if the user is logged in
module.exports = (req, res, next) => {
    const student_token = req.body ? req.body.student_token : null
    if (student_token) {
        Student_Service.ValidateTokenExists(student_token)
            .then(student => {
                if (student.success) next();
                else res.status(student.responseCode).json({error: "Student ID is incorrect, please verify that it is the same as in your email"});
        }).catch(err => {
            res.status(401).json({error: "Student ID is incorrect, please verify that it is the same as in your email"});
        })
    } else {
        res.status(401).json({error: "Bad Request"});
    }
}
