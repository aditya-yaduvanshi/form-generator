require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express(),
  path = require("path"),
  {PORT, HOST, MONGO_URI} = process.env,
  {forms, responses} = require("./routes");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api/forms", forms);
app.use("/api/responses", responses);
app.use("/static", express.static("static"));
app.use(express.static("build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
);

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((_conn) => {
    console.log("db connected");
    app.listen(PORT || 5000, HOST || "localhost", () =>
      console.log("listening on port", PORT || 5000)
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
