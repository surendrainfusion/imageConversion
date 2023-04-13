import sharp from "sharp";
import Potrace from "potrace";
import fs from "fs";

const outputPath = "./src/assets/sharp_conversion_output/";
function convertImage(inputPath) {
  const fileNameArr = inputPath.split("/");
  let fileName_extension = fileNameArr[fileNameArr.length - 1];
  const outputFileName = fileName_extension.split(".")[0];
  const ouputFile = `${outputPath}${outputFileName}`;

  //validations
  const validFormats = ["jpg", "jpeg", "webp", "tiff", "svg"];
  if (validFormats.includes(fileName_extension)) {
    return Promise.reject(new Error(`Invalid output format: ${outputFormat}`));
  }

  sharp(inputPath)
    .jpeg({ quality: 100 })
    // .rotate(150)
    .blur(9)
    .resize(350, 260)
    .tint({ r: 155, g: 100, b: 100 })
    .toFile(`${ouputFile}.jpg`)
    .then((info) => console.log("Image has been converted to jpg format"))
    .catch((err) => console.log("Error:", err));

  sharp(inputPath)
    .png({ quality: 100 })
    .toFile(`${ouputFile}.png`)
    .then((info) => console.log("Image has been converted to png format"))
    .catch((err) => console.log("Error:", err));

  sharp(inputPath)
    .webp({ quality: 100 })
    .toFile(`${ouputFile}.webp`)
    .then((info) => console.log("Image has been converted to webp format"))
    .catch((err) => console.log("Error:", err));

  sharp(inputPath)
    .tiff({ quality: 100 })
    .toFile(`${ouputFile}.tiff`)
    .then((info) => console.log("Image has been converted to tiff format"))
    .catch((err) => console.log("Error:", err));

  //SVG conversion....
  const options = {
    threshold: 128,
  };
  Potrace.trace(inputPath, options, (error, svg) => {
    if (error) {
      console.log("Error::", error);
    } else {
      fs.writeFile(`${ouputFile}.svg`, svg, (err) => {
        if (err) {
          console.log("Image has been not converted to SVG format");
        } else {
          console.log("Image has been converted to SVG format");
        }
      });
    }
  });
}

export default convertImage;
