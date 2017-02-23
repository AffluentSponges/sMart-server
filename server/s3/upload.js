const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 524288000 },
});

module.exports = upload.single('theseNamesMustMatch');