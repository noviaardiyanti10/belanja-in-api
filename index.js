const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;
const apiRoutes = require("./routes/route");
const multer = require('multer');

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const storage = multer.diskStorage({
  destination:function(req, file, cb){
      cb(null, 'storage/uploads/');
  },
  filename: function(req, file, cb){
      cb(null, Date.now() + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage });
app.use(upload.single('photo'));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});