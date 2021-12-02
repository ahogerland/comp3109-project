require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, FRONTEND_IP } = process.env;
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
        "FRONTEND_IP": FRONTEND_IP
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
        "FRONTEND_IP": FRONTEND_IP
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
        "FRONTEND_IP": FRONTEND_IP
    }
}

module.exports = config[node_env]
