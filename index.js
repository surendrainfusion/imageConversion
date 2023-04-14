import express from "express";
import Jimp from "jimp";
import multer from "multer";
import bodyParser from "body-parser";
// import convertToAllFormats from "./src/Functions/sharp_image_conversion.js";
// import convertToAllFormats from "./src/Functions/jimp_image_conversion.js";

const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// let inputFile = "./src/assets/Images/flag.png";
// convertToAllFormats(inputFile)

//convert-image API
app.post("/convert", upload.single('image'), async (req, res, next) => {
  console.log("reqBody::", req.file);
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const image = await Jimp.read(req.file.buffer);
    console.log("image::::", image);
    const convertedImage = await image.getBufferAsync(Jimp.MIME_JPEG);
    res.type("jpg").send(convertedImage);
  } catch (error) {
    res.status(500).send("Error converting image");
    next(err);
  }
});
//server
const port = 3000;
app.listen(port, console.log(`server is running on http://localhost:${port}`));
