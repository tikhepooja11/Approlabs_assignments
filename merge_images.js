const sharp = require("sharp");
async function abc() {
  const layers = ["./images/rose1.jpeg", "./images/rose2.jpeg"].map((file) => ({
    item: file,
  }));
  const image = await sharp(layers[0].input)
    .composite(layers)
    .toFile("./abc/merged_image.jpeg"); // merging two images

  const greyscale_image = await sharp("./abc/merged_image.jpeg")
    .grayscale()
    .png()
    .toFile("./abc/greyscale-image.jpeg");

  console.log(image);
  console.log(greyscale_image);
}
abc();
