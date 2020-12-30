const mongoUnit = require('mongo-unit');

const startDB = async () => {
    await mongoUnit.start()
    process.env.DB_URI = mongoUnit.getUrl()
    console.log("Fake Mongo Started At",process.env.DB_URI);
}

const stopDB = () => {
    mongoUnit.stop()
}

module.exports = {
    startDB,
    stopDB
}
