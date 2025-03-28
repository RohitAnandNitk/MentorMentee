import express from "express";
import {
  acceptedRequest,
  cancelRequest,
  checkConnection,
  getRequestsByRole,
  pendingRequest,
  reviewRequest,
  sendRequest,
} from "../Controllers/Request.js";
const router = express.Router();

router.get("/check-connection", checkConnection);
router.post("/send-request", sendRequest);
router.put("/review-request", reviewRequest);
router.delete("/cancel-request/:id", cancelRequest);
router.get("/get-requests", getRequestsByRole);
router.get("/accepted-request", acceptedRequest);
router.get("/pending-request", pendingRequest);

export default router;
