const express = require("express");
const router = express.Router();
const upload = require('../services/multerService');
const controller = require('../controller/storage.controller');
const { endpoint_storage } = require("../config/constant.config");

router.get(`${endpoint_storage}/:tiendaId/:type/:path`, async (req, res)=>{
    await controller.getImages(req, res);
})

router.post(`${endpoint_storage}/:tiendaId/:type/upload`, upload.single('fileImage') , (req, res, next) => {
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    const uploadFile = file;
    uploadFile.destination = null;
    uploadFile.path = null;
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadFile,
    })

}, (error, req, res, next) => {
    if(error.message.includes("Not authorized")) {
        res.status(401).send({
            error: error.message
        })
    } else {
        res.status(400).send({
            error: error.message
        })
    }
})

router.delete(`${endpoint_storage}/:tiendaId/:type/:path`, async (req, res)=>{
    await controller.removeImage(req, res);
})


module.exports = router;