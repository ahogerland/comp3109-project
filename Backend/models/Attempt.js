'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('attempt', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        student_id: {
            // foreign key to student table
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        secret: {
            // Secret passed in my the student to break the ciphertext
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        result: {
            // Not sure if this is needed
            type: Datatypes.STRING,
            required: true,
            allowNull: false            
        },
        updated_at: {
            type: Datatypes.DATE
        }
    }, {
        underscored:true
    })
}
