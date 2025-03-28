import Request from "../Model/RequestSchema.js";
import mongoose from "mongoose";

export const checkConnection = async (req, res) => {
  try {
    const { menteeId, mentorId } = req.query;

    // Validate input
    if (!mentorId || !menteeId) {
      return res
        .status(400)
        .json({ message: "MentorId and MenteeId are required." });
    }

    // Check if a connection exists
    const connection = await Request.findOne({ mentorId, menteeId });

    if (connection) {
      return res
        .status(200)
        .json({ status: connection.status, requestId: connection._id }); // e.g., "pending", "accepted", "rejected"
    } else {
      return res.status(200).json({ status: "none" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { menteeId, mentorId } = req.body;
    //validation
    if (!menteeId || !mentorId) {
      return res.status(404).json({
        success: false,
        message: "Mentor or Mentee Id missing",
      });
    }
    const newRequest = new Request({ menteeId, mentorId });
    await newRequest.save();
    console.log("Request Sent Successfully!");
    res.status(200).json({
      success: true,
      message: "Request Sent Successfully!",
      newRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at send request API",
    });
  }
};

export const reviewRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    // Validation
    if (!requestId) {
      return res
        .status(400)
        .json({ success: false, message: "Request ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request ID" });
    }

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    // Find request by _id (not requestId)
    const request = await Request.findOne({ _id: requestId });

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    // Update request status
    request.status = status;
    await request.save();

    console.log("Status Updated Successfully!");
    res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error at review request API",
      error: error.message,
    });
  }
};

export const cancelRequest = async (req, res) => {
  console.log("call for cancle request");
  try {
    const requestId = req.params.id;

    // Validation
    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "request ID are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID format",
      });
    }

    // Find and delete the request
    const deletedRequest = await Request.findOneAndDelete({ _id: requestId });

    if (!deletedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    console.log("Request Cancelled Successfully!");
    res.status(200).json({
      success: true,
      message: "Request cancelled successfully!",
      deletedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error cancelling request",
      error: error.message,
    });
  }
};

export const getRequestsByRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // Get userId and role from request parameters

    // Validation
    if (!userId || !role) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and role are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format" });
    }

    let requests;

    if (role === "mentee") {
      // Get requests sent by mentee
      requests = await Request.find({ menteeId: userId });
    } else if (role === "mentor") {
      // Get requests received by mentor
      requests = await Request.find({ mentorId: userId });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Use 'mentee' or 'mentor'",
      });
    }

    if (requests.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No requests found" });
    }

    res.status(200).json({
      success: true,
      message: `Requests retrieved successfully for ${role}`,
      requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving requests",
      error: error.message,
    });
  }
};

//those request that is accepted
export const acceptedRequest = async (req, res) => {
  try {
    const { userId, role } = req.query;

    // Validation
    if (!userId || !role) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and role are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format" });
    }

    let requests;

    if (role === "mentee") {
      // Get requests sent by mentee
      requests = await Request.find({
        menteeId: userId,
        status: "accepted",
      }).populate("mentorId");
    } else if (role === "mentor") {
      // Get requests received by mentor
      requests = await Request.find({
        mentorId: userId,
        status: "accepted",
      }).populate("menteeId");
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Use 'mentee' or 'mentor'",
      });
    }

    if (requests.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No requests found", requests });
    }

    res.status(200).json({
      success: true,
      message: `Requests retrieved successfully for ${role}`,
      requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving requests",
      error: error.message,
    });
  }
};

//those request that is pending
export const pendingRequest = async (req, res) => {
  try {
    const { userId, role } = req.query;

    // Validation
    if (!userId || !role) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and role are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format" });
    }

    let requests;

    if (role === "mentee") {
      // Get requests sent by mentee
      requests = await Request.find({
        menteeId: userId,
        status: "pending",
      }).populate("mentorId");
    } else if (role === "mentor") {
      // Get requests received by mentor
      requests = await Request.find({
        mentorId: userId,
        status: "pending",
      }).populate("menteeId");
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Use 'mentee' or 'mentor'",
      });
    }

    if (requests.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No requests found" });
    }

    res.status(200).json({
      success: true,
      message: `pending Requests retrieved successfully for ${role}`,
      requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving requests",
      error: error.message,
    });
  }
};
