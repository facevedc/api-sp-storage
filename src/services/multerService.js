const multer = require('multer');
const { repo_imgs } = require('../config/constant.config');
const fileExtension = require('file-extension');
const existFolder = require('../utils/foldersUtil');
const ImageNotFoundError = require('../error/imageNorFoundError');
const { AccessService } = require('@felipe.acevedo91/storebypyme-back-db-library');

const validateAccess = async (req) => {
  try {
    await AccessService.validateAccess(req, null);
    return true;
  } catch (error) {
    return false;
  }
};

const storage = multer.diskStorage({
  // Setting directory and file on disk to save uploaded files
  destination: async (req, file, cb) => {
    if (await validateAccess(req)) {
      existFolder(req.params.tiendaId, req.params.type);
      cb(null, `${repo_imgs}/${req.params.tiendaId}/${req.params.type}`);
    } else {
      cb(new ImageNotFoundError('Not authorized'));
    }
  },
  // Setting name of file saved
  filename: (req, file, cb) => {
    cb(null, file.originalname.split('.')[0] + '.' + fileExtension(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    // Setting Image Size Limit to 2MBs
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //Error
      cb(new ImageNotFoundError('Please upload JPG and PNG images only!'));
    } else {
      //Success
      cb(null, true);
    }
  },
});

module.exports = upload;
