require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, FRONTEND_IP, SECRET, IV } = process.env;
const node_env = process.env.NODE_ENV

const config = {
    "development": {
        "db":{
        	"username": DB_USERNAME,
        	"password": DB_PASSWORD,
        	"database": "db_dev",
        	"host": DB_HOST,
        	"dialect": "mysql",
            "port": DB_PORT
        },
        "FRONTEND_IP": FRONTEND_IP,
        "SECRET": SECRET,
        "IV": IV
    },
    "test": {
        "db":{
        	"username": DB_USERNAME,
        	"password": DB_PASSWORD,
        	"database": "db_test",
        	"host": DB_HOST,
        	"dialect": "mysql",
            "port": DB_PORT
        },
        "FRONTEND_IP": FRONTEND_IP,
        "SECRET": SECRET,
        "IV": IV
    },
    "production": {
        "db":{
        	"username": DB_USERNAME,
        	"password": DB_PASSWORD,
        	"database": "db_prod",
        	"host": DB_HOST,
        	"dialect": "mysql",
            "port": DB_PORT
        },
        "FRONTEND_IP": FRONTEND_IP,
        "SECRET": SECRET,
        "IV": IV
    }
}

module.exports = config[node_env]
