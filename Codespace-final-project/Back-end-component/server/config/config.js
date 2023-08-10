// I set the environment variable "PORT" so that
// take an existing one or assign it 8080 if it doesn't exist
process.env.PORT = process.env.PORT || 8080;
process.env.HOST = process.env.HOST || "http://localhost"
process.env.DOMAIN = process.env.DOMAIN || "http://localhost:9000"

//seed variable to generate the secret key of the token
process.env.SEED = process.env.SEED || "SECRET KEY";


const config = {
  appConfig: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  dbConfig: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME
  }
}

module.exports = config;