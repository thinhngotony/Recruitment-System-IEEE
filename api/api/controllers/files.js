const fs = require("fs");
const PORT = process.env.PORT;
const baseUrl = `http://localhost:${PORT}/api/files/`;

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/download/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
        data: null,
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send({
      message: "success",
      data: fileInfos,
    });
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/download/";
  res.download(directoryPath + fileName, fileName, (error) => {
    if (error) {
      res.status(500).send({
        message: "Could not download the file. " + error,
        data: null,
      });
    }
  });
};
module.exports = {
  getListFiles,
  download,
};
