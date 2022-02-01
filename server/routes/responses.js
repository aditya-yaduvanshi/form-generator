const router = require("express").Router(),
  {Responses} = require("../models"),
  multer = require("multer"),
  fs = require("fs/promises");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now().toString()}_${file.originalname.replace(/( )/g,"_")}`
    );
  },
});
const upload = multer({storage});

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const form = req.query.form;
      if(!form){
        throw new Error("no form specified!");
      }
      const responses = await Responses.find({form});
      return res.json({responses});
    } catch (err) {
      console.log(err);
      return res.json({error: err.message});
    }
  })
  .post(upload.any(), async (req, res, next) => {
    let {body, files} = req;
    try {
      body = JSON.parse(body.response);
      files.forEach(file => {
        let i = body.answers.findIndex(ans => ans.question === file.fieldname);
        if(i >= 0){
          body.answers[i].answer = file.path.replace(/(\\{1,})/g, "/");
        } 
      });
      const response = new Responses({
        form: body.form,
        answers: body.answers,
      });
      const resRes = await response.save();
      if(!await resRes){
        throw new Error("cannot process request.")
      }
      return res.json({id: resRes._id});
    } catch (err) {
      files.length ? files.forEach(async file => {
        await fs.unlink(file.path);
      }) : null;
      console.log(err.message);
      return res.json({error: err.message});
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;
      const resRes = await Responses.findById(id);
      if(!await resRes){
        throw new Error("not found!");
      }
      return res.json({response: resRes});
    } catch (err) {
      console.log(err)
      return res.json({error: err.message});
    }
  });

module.exports = router;
