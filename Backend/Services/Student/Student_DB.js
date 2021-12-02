const db = require('../../models')
const Op = db.Sequelize.Op

const config = require('../../config/config')
const bcrypt = require('bcryptjs')

/*
 Function checks if token belongs to a user
*/
TokenExists = async (token) => {
    if (token === null || token === undefined) return {error: "Token is undefined", argumentError: true, responseCode: 400}

    let student = await db.student.findOne({
        where: {
            token: token
        }
    }).catch(err => {
        return {DBerror: true}
    })

    if (student.DBerror) return {error: 'Database failed to perform transaction', DBerror: true, responseCode: 500}
    if (!student) return {error: 'Failed to find student', responseCode: 500}
    if (student) return {success: true, msg: 'Found student', student: student.dataValues, responseCode: 204}
    
    return {error: 'Unknown error', responseCode: 500}
}

/*
 Function checks if the secret matches the one belonging to the student
*/
CompareSecret = async (args) => {
    if (!args) return {error: "No arguments were supplied", argumentError: true, responseCode: 400}
    if (!args.student_token) return {error: "Student Token could not be found", argumentError: true, responseCode: 400}
    if (!args.secret) return {error: "Secret could not be found", argumentError: true, responseCode: 400}

    // Find row in table that matches the student token
    let student = await db.student.findOne({
        where: {
            token: args.student_token
        }
    }).catch(err => {
        return {DBerror: true}
    })

    if (student.DBerror) return {error: 'Database failed to perform transaction', DBerror: true, responseCode: 500}
    if (!student) return {error: 'Failed to find student', responseCode: 500}

    // Compare padding attack (Shelled / Alec)

    let result = "0"

    // Store attempt
    let attempt = await db.attempt.create({
        student_id: student.dataValues.id,
        secret: args.secret,
        result: result
    }).catch(err => {
        return {DBerror: true}
    })

    if (attempt.DBerror) return {error: 'Database failed to perform transaction', DBerror: true, responseCode: 500}
    if (!attempt) return {error: 'Failed to store attempt', responseCode: 500}
    if (attempt) return {success: true, msg: 'Submitted correct secret', result: result, responseCode: 201}

    return {error: 'Unknown error', responseCode: 500}
}

module.exports = {
    TokenExists,
    CompareSecret
}

