const router = require("express").Router(),
  {Responses} = require("../models");

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
  .post(async (req, res, next) => {
    let {body, files} = req;
    try {
      body = JSON.parse(body.response);
      body.answers.forEach(ans => {
        let file = files[ans.question];
        if(file){
          let path = `static/${Date.now().toString()}_${file.name.replace(/( )/g,"_")}`;
          file.mv(path, err => {
            if(err){
              throw new Error("file cannot be stored!");
            }
          });
          file.path = path;
          ans.answer = `/${path}`;
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
      return res.json({error: err.message});
    }
  });

module.exports = router;
