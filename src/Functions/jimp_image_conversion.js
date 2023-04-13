import Jimp from 'jimp';

function convertToAllFormats(filePath, callback) {
  let outputFile = "./src/assets/jimp_conversion_output/";
  const filePathArr = filePath.split('/');
  const fileName = filePathArr[filePathArr.length-1].split('.')[0];
Jimp.read(filePath)
.then(image => {
  // Resize the image to 50% of its original size
  image.scale(1);

  // Convert the image to PNG, BMP, and TIFF formats in parallel
  return Promise.all([
    image.writeAsync(`${outputFile}${fileName}.png`),
    image.writeAsync(`${outputFile}${fileName}.bmp`),
    image.writeAsync(`${outputFile}${fileName}.webp`),
    image.writeAsync(`${outputFile}${fileName}.jpg`)
  ]);
})
.then(() => {
  console.log('Image converted successfully!');
})
.catch(error => {
  console.error(error);
})
}

export default convertToAllFormats;