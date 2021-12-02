const express = require('express')
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler')
const validate = require('validate.js')

// SERVICES
const Student_Service = require('../Services/Student/Student_Service');
const { async } = require('validate.js');

// Config file
const config = require('../config/config');
const db = require('../models');

/*
@body
 - student_token : string
 - secret : string
*/
router.post('/attempt', asyncHandler( async (req, res) => {
    console.log(`   /student/attempt endpoint`)
    const constraints = {
        student_token: {
            presence: true,
            type: 'string'
        },
        secret: {
            presence: true,
            type: 'string'
        }
    }

    const student_token = req.body.student_token
    const secret = req.body.secret

    let validation = validate({student_token, secret}, constraints)
    if (validation) return res.status(400).json({error: validation})

    const result = await Student_Service.ValidateSecret({student_token, secret})
    if (result.error) return res.status(result.responseCode).json({error: result.error})

    return res.status(result.responseCode).json({success: result.success, msg: result.msg, result: result.result})
}))

module.exports = router