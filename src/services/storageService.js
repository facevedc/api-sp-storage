const { repo_imgs } = require("../config/constant.config")
const fs = require('fs');
const ImageNotFoundError = require('../error/imageNorFoundError');

const removeImage = async (pathFile) => {
    const fileImg = `${repo_imgs}/${pathFile}`;
    return new Promise((resolve, reject) => {
        fs.unlink(fileImg, (error) => {
            if(error) {
                reject(new ImageNotFoundError(error))
            } else {
                resolve(true);
            }
        })
    });
}

module.exports = {
    removeImage
}