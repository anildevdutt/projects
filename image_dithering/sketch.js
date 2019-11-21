// let img;

// function preload(){
//     img = loadImage("cat.jpg");
// }

// function setup() {
//     createCanvas(600, 600);
//     //imageMode(CENTER);
//     img.filter(GRAY);
//     //image(img, 0, 0, 600, 600);
//     img.loadPixels();
//     for(let i = 0; i < img.pixels.length; i += 4) {
//         // img.pixels[i] = Math.floor(img.pixels[i] / 128) * 255;
//         // img.pixels[i + 1] = Math.floor(img.pixels[i + 1] / 128) * 255;
//         // img.pixels[i + 2] = Math.floor(img.pixels[i + 2] / 128) * 255;
//         img.pixels[i + 3] = 255;
//     }
    
//     //image(img, 0, 0, 600, 600);
//     for(let y = 0; y < img.height; y++){
//         for(let x = 0; x < img.width; x++) {
//             let index = ((y * (img.width * 4)) + x) * 4;            
//             let index_y1 = (((y+1) * (img.width * 4)) + x) * 4;
//             let index_x1 = ((y * (img.width * 4)) + (x + 1)) * 4;            
//             let index_x1_y1 = (((y + 1) * (img.width * 4)) + (x + 1)) * 4; 
//             let index_x1_y1n = (((y + 1) * (img.width * 4)) + (x - 1)) * 4;

//             let oldpixel = img.pixels[index];            
//             let newpixel = Math.floor(oldpixel / 128) * 255;
//             let quant_error = oldpixel - newpixel;
//             if(x + 1 < img.width) {
//                 img.pixels[index_x1] = img.pixels[index_x1] + quant_error * 7 / 16;
//                 img.pixels[index_x1 + 1] = img.pixels[index_x1 + 1] + quant_error * 7 / 16;
//                 img.pixels[index_x1+ 2] = img.pixels[index_x1 + 2] + quant_error * 7 / 16;                
//                 //pixel[x + 1][y    ] = pixel[x + 1][y    ] + quant_error * 7 / 16
//             }
//             if(x - 1 >= 0 && y + 1 < img.height) {
//                 img.pixels[index_x1_y1n] = img.pixels[index_x1_y1n] + quant_error * 3 / 16;
//                 img.pixels[index_x1_y1n + 1] = img.pixels[index_x1_y1n + 1] + quant_error * 3 / 16;
//                 img.pixels[index_x1_y1n + 2] = img.pixels[index_x1_y1n + 2] + quant_error * 3 / 16;
//                 //pixel[x - 1][y + 1] = pixel[x - 1][y + 1] + quant_error * 3 / 16
//             }
//             if(y + 1 < img.height) {
//                 img.pixels[index_y1] = img.pixels[index_y1] + quant_error * 5 / 16;
//                 img.pixels[index_y1 + 1] = img.pixels[index_y1 + 1] + quant_error * 5 / 16;
//                 img.pixels[index_y1 + 2] = img.pixels[index_y1 + 2] + quant_error * 5 / 16;
//                 //pixel[x    ][y + 1] = pixel[x    ][y + 1] + quant_error * 5 / 16
//             }
//             if(x + 1 < img.width && y + 1 < img.height) {
//                 img.pixels[index_x1_y1] = img.pixels[index_x1_y1] + quant_error * 1 / 16;
//                 img.pixels[index_x1_y1 + 1] = img.pixels[index_x1_y1 + 1] + quant_error * 1 / 16;
//                 img.pixels[index_x1_y1 + 2] = img.pixels[index_x1_y1 + 2] + quant_error * 1 / 16;
//                 //pixel[x + 1][y + 1] = pixel[x + 1][y + 1] + quant_error * 1 / 16
//             }            
//         }
//     }
//     img.updatePixels();
//     image(img, 0, 0, 600, 600);
// }


let kitten;

function preload() {
  kitten = loadImage("cat.jpg");
}

function setup() {
  createCanvas(1024, 512);

  image(kitten, 0, 0);
  makeDithered(kitten, 1);
  image(kitten, 512, 0);
  // Apply gray filter to the whole canvas
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}