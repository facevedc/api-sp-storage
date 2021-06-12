const { repo_imgs } = require("../config/constant.config");
const storageService = require('../services/storageService');
const {AccessService} = require("storebypyme-back-db-library");

async function errorResponse(res){
    res.status(404).send({ data: 'not found' })
}

const getImages = async (req, res) => {
    const fileImage = `/${req.params.tiendaId}/${req.params.type}/${req.params.path}`
    const options = { 
        root: repo_imgs
    }; 
    res.sendFile(fileImage, options, async (err) => { 
        if (err) { 
            console.log(err); 
            await errorResponse(res);
        }
    }); ;
}

const removeImage = async (req,res) => {
    try {
        if (!await AccessService.validateAccess(req,res)) {
            const fileImage = `${req.params.tiendaId}/${req.params.type}/${req.params.path}`
            const response = await storageService.removeImage(fileImage);
            if(response) {
                return res.status(200).send({response: true});
            }
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res);
    }
}

module.exports = { 
    getImages,
    removeImage
 };