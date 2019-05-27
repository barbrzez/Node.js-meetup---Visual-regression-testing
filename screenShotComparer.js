const fs = require('fs');
const pixelmatch = require("pixelmatch");
const PNG = require('pngjs').PNG;

exports.cmpImages = function (img1Name, img2Name) {

  const img1 = fs.createReadStream(img1Name).pipe(new PNG()).on("parsed", fileRead);
  const img2 = fs.createReadStream(img2Name).pipe(new PNG()).on("parsed", fileRead);
  let filesRead = 0;

  function fileRead() {
    if (++filesRead < 2) return;

    var diff = new PNG({ width: img1.width, height: img1.height });

    pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height);
    diff.pack().pipe(fs.createWriteStream('diff.png'));
  }

}
