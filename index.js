import express from "express";
import convertToAllFormats from "./src/Functions/sharp_image_conversion.js";
// import convertToAllFormats from "./src/Functions/jimp_image_conversion.js";

const app = express();

let inputFile = "./src/assets/Images/download.jpg";

//Convert to AllFormats
convertToAllFormats(inputFile)
//server

const port = 7000;
app.listen(port, console.log(`server is running on http://localhost:${port}`));
