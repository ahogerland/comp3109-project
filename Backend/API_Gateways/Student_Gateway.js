const express = require('express')
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler')
const validate = require('validate.js')

// SERVICES
const Student_Service = require('../Services/Student/Student_Service');
const { async } = require('validate.js');

/*
@body
 - secret : string
*/
router.post('/attempt', asyncHandler( async (req, res) => {
    const constraints = {
        secret: {
            presence: true,
            type: 'string'
        }
    }

    const secret = req.body.secret

    let validation = validate({secret}, constraints)
    if (validation) return res.status(400).json({error: validation})

    const result = await Student_Service.ValidateSecret({secret})
    if (result.error) return res.status(result.responseCode).json({error: result.error})

    return res.status(result.responseCode).json({success: result.success, msg: result.msg, result: result.result})
}))

module.exports = router