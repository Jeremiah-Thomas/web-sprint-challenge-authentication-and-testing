const db = require('../../data/dbConfig')

module.exports = (req, res, next) => {
    const [matches]
    if(req.body.username == null || req.body.password == null ){
        res.status(400).json({ message: "username and password required" });
    }

}