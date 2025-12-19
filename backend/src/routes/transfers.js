const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post(
  "/create",
  auth,
  upload.array("files"),
  transferController.createTransfer
);
router.get("/my-transfers", auth, transferController.getUserTransfers);
router.get("/:link", transferController.getTransferByLink);
router.get("/download/:fileId", transferController.downloadFile);
router.delete("/:transferId", auth, transferController.deleteTransfer);
router.patch(
  "/deactivate/:transferId",
  auth,
  transferController.deactivateTransfer
);
router.post("/bulk-delete", auth, transferController.bulkDeleteTransfers);
// router.get("/download-all/:transferId", transferController.downloadAllFiles);
module.exports = router;
