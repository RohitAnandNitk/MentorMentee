import express from "express";
import {
  cancelRequest,
  checkConnection,
  getRequestsByRole,
  reviewRequest,
  sendRequest,
} from "../Controllers/Request.js";
const router = express.Router();

router.get("/check-connection", checkConnection);
router.post("/send-request", sendRequest);
router.put("/review-request", reviewRequest);
router.delete("/cancel-request/:id", cancelRequest);
router.get("/get-requests", getRequestsByRole);

export default router;
