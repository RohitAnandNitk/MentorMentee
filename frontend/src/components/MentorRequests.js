import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext";
const BaseURL = config.BASE_URL;

const MentorRequests = () => {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState([]);

  const getPendingRequest = useCallback(async () => {
    if (!user?.userId || !user?.userType) return;
    const response = await axios.get(`${BaseURL}/request/pending-request`, {
      params: {
        userId: user.userId,
        role: user.userType,
      },
    });
    console.log("these are the pending requests :", response);
    setPendingRequests(response?.data?.requests || []);
  }, [user?.userId, user?.userType]);

  useEffect(() => {
    getPendingRequest();
  }, [getPendingRequest]);

  const handleAccept = async (requestId, menteeIdParam) => {
    const menteeId = typeof menteeIdParam === "object" ? menteeIdParam._id : menteeIdParam;
    console.log("mentee requestId being accepted:", requestId);
    try {
      // accept the request
      const response1 = await axios.put(`${BaseURL}/request/review-request`, {
        status: "accepted",
        requestId: requestId,
      });
      console.log("Request has been accepted", response1);
      // create the chat btw them
      const response2 = await axios.post(`${BaseURL}/chat/get-or-create-chat`, {
        mentorId: user?.userId,
        menteeId,
      });
      console.log("New chat created btw you with this mentee ", response2);

      getPendingRequest();
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      if (!requestId) return;
      const response = await axios.delete(
        `${BaseURL}/request/cancel-request/${requestId}`
      );
      if (response.data.success) {
        console.log("Request Rejected !");
        getPendingRequest();
      }
    } catch (error) {
      console.log("Error rejecting request:", error);
    }
  };

  return (
    <div className="h-[95%] flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Mentee Requests</h2>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 text-center">No pending requests.</p>
        ) : (
          pendingRequests.map((request) => {
            const mentee = request.menteeId;
            return (
              <div
                key={request._id}
                className="border-b last:border-b-0 pb-4 mb-4"
              >
                <h3 className="font-semibold text-lg">{mentee?.name || "Mentee"}</h3>
                <p className="text-sm text-gray-600">{mentee?.email || ""}</p>
                <button
                  className="mt-3 ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleAccept(request._id, mentee?._id || mentee)}
                >
                  Accept
                </button>
                <button
                  className="mt-3 ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleRejectRequest(request._id)}
                >
                  Reject
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MentorRequests;
