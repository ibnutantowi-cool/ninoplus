const fs = require('fs');

async function getColors() {
    try {
        const Jimp = require('jimp');
        const image = await Jimp.read('public/ninologo.png');
        
        let colors = new Set();
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            const a = this.bitmap.data[idx + 3];
            
            if (a > 100) { // Only solid colors
                if (r < 200 && b > 100) { // Look for bluish colors
                    colors.add(`${r},${g},${b}`);
                }
            }
        });
        
        console.log(Array.from(colors).slice(0, 50));
    } catch(e) {
        console.log(e);
    }
}
getColors();
