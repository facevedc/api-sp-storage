const fs = require("fs");
const path = require("path");
const { repo_imgs } = require("../config/constant.config");
const filePath = path.join(repo_imgs);

const existFolder = (folderStore, folderType) => {
  const dir = `${filePath}/${folderStore}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!fs.existsSync(`${dir}/${folderType}`)) {
    fs.mkdirSync(`${dir}/${folderType}`);
  }
};

module.exports = existFolder;
