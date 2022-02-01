const router = require("express").Router(),
  {Forms} = require("../models");

router
  .route("/")
  .post(async (req, res, next) => {
    try {
      const {body, files} = req;
      const form = Forms({
        title: body.title,
        description: body.description,
        questions: body.questions,
      });
      const formRes = await form.save();
      return res.json({id: formRes._id});
    } catch (err) {
      return res.json({error: err.message});
    }
  })
  .get(async (req, res, next) => {
    try {
      const forms = await Forms.find();
      return res.json({forms});
    } catch (err) {
      return res.json({error: err.message});
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const id = req.params.id,
        form = await Forms.findById(id);
      if (!(await form)) {
        throw new Error("not found!");
      }
      return res.json({form});
    } catch (err) {
      return res.json({error: err.message});
    }
  });

module.exports = router;
