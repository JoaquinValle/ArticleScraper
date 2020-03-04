// Dependencies
const axios = require("axios");

// Routes
// =============================================================
module.exports = (app) => {
    app.get("/", (req, res) => {
        let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        console.log(url);
        axios.get(url+"articles").then((data) => {
            let hbsObject = {
                articles: data.data
              }
            console.log(hbsObject)
            res.render("index", hbsObject)
        })
    })
}