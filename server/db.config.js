const DB_HOST = 'localhost'; //0.0.0.0 si ne fonctionne pas
const DB_PORT = 27017;
const DB_NAME = 'itemsBase';
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

module.exports = {
  DB_HOST : DB_HOST,
  DB_PORT : DB_PORT,
  DB_NAME : DB_NAME,
  DB_URI : DB_URI,
  "secret" : "leStyleVautLeSWAGG"
}
