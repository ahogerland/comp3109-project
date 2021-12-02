'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('student', {
        id: {
            // STUDENT ID (Not to be shared with student)
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        token: {
            // Student token (unique identifies student for challenge)
            type: Datatypes.STRING,
            required: true,
            allowNull: false,
            unique: true
        },
        secret: {
            // The secret that the student is trying to decrypt
            type: Datatypes.STRING,
            required: true,
            allowNull: false,
            unique: false
        },
        updated_at: {
            type: Datatypes.DATE
        }
    }, {
        underscored:true,
        paranoid: true
    })
}
