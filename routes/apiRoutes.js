const axios = require("axios")
const cheerio = require("cheerio")

module.exports = function(app,db) {
    
    app.get("/scrape", function(req, res) {
        axios.get("https://winefolly.com/blog/").then((response) => {
            const $ = cheerio.load(response.data)
            $("article .row").each(function(i, element) {
                let resArr = {};
                let url = `https://winefolly.com/blog/${$(this).children("h2").children("a").attr("href")}`
                resArr.title = $(this).children(".col-md-6").children("h2").children("a").text().trim()
                resArr.description = $(this).children(".col-md-6").text("p").text().trim()
                resArr.url = url
                    axios.get(url).then((res) => {
                        let $ = cheerio.load(res.data)         
                            db.Article.create(resArr)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => {
                                console.log(err.errmsg)
                            })
                        })
            })
            res.send("Scrape Complete.")
        })
    })

    app.get("/articles", (req, res) => {
        db.Article.find({}).then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
    });

    //Routes
    app.get("/articles/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id }).populate("comments").then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
    })

    app.post("/articles/:id", (req, res) => {
        db.Comment.create(req.body).then((response) => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{comments: response._id }}, { new: true });
        })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    // Route for deleting a Comment
    app.delete("/articles", (req, res) => {
        console.log(`Deleting comment_id ${req.body.comment_id} from article_id ${req.body.article_id}`)
        db.Article.updateOne({_id:req.body.article_id},{$pull:{comments:req.body.comment_id}})
        .then((response) => {
            console.log(response)
            db.Comment.deleteOne({_id:req.body.comment_id})
            .then((response) => {
                console.log(response)
                res.send("Comment deleted.")
            })
            .catch((err) => {
                res.send(err)
            })
        })
        .catch((err) => {
            res.send(err)
        })
    })
}