handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  return res
    .status(200)
    .json({ success: true, message: 'File uploaded successfully', file: req.file });

}

module.exports = {
  handleUpload
};