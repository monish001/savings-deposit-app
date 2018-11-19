var config = require('config');
const debug = require('debug')('app:helpers:image.helper');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
var path = require('path');

async function saveImageAndGetPath(base64Data) {
    const promise1 = new Promise( /* executor */ function (resolve, reject) {
        var matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches.length !== 3) {
            debug('saveImageAndGetPath', 'Error', 'Invalid input string with matches.length', matches.length);
            return reject('Invalid input string');
        }

        debug('saveImageAndGetPath ', matches[0]);
        debug('saveImageAndGetPath type', matches[1]);
        debug('saveImageAndGetPath', matches[2]);
        const imageBuffer = new Buffer(matches[2], 'base64');
        const fileName = uuidv4() + uuidv4();
        const filePath = path.join(__dirname, '../../client/build/static');
        fs.writeFile(`${filePath}/${fileName}`, imageBuffer, function (error) {
            if (error) {
                debug('saveImageAndGetPath', 'Error', error);
                reject(error);
            }
            debug('saveImageAndGetPath', `The file has been saved as ${filePath}/${fileName}`);
            resolve(fileName);
        });
    });
    return promise1;
}

module.exports = {
    saveImageAndGetPath
};