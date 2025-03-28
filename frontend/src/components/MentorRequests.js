import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext";
const BaseURL = config.BASE_URL;

const MentorRequests = () => {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState([]);

  const getPendingRequest = async () => {
    const response = await axios.get(`${BaseURL}/request/pending-request`, {
      params: {
        userId: user.userId,
        role: user.userType,
      },
    });
    console.log("these are the pending requests :", response);
    setPendingRequests(response?.data?.requests || []);
  };
  useEffect(() => {
    getPendingRequest();
  }, [user]);

  // const [paymentInput, setPaymentInput] = useState("");
  // const [showPaymentBox, setShowPaymentBox] = useState(null);

  const handleAccept = async (id) => {
    console.log("mentee id whose request i going to accept : ", id);
    try {
      const response = await axios.put(`${BaseURL}/request/review-request`, {
        status: "accepted",
        requestId: id,
      });
      console.log("Request has been accepted", response);
      getPendingRequest();
    } catch (error) {
      console.log("Error :", error);
      console.log("Error at calling the accept request at mentorRequeat page");
    }
  };

  // const handleRequestPayment = (id) => {
  //   setShowPaymentBox(id);
  // };

  // const handleSetPrice = (id) => {
  //   setPendingRequests((prevRequests) =>
  //     prevRequests.map((request) =>
  //       request.id === id
  //         ? { ...request, pending: true, price: paymentInput }
  //         : request
  //     )
  //   );
  //   setShowPaymentBox(null);
  //   setPaymentInput("");
  // };

  return (
    <div className="h-[95%] flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Mentee Requests</h2>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 text-center">No pending requests.</p>
        ) : (
          pendingRequests.map((request) => (
            <div
              key={request.menteeId._id}
              className="border-b last:border-b-0 pb-4 mb-4"
            >
              <h3 className="font-semibold text-lg">{request.menteeId.name}</h3>
              <p className="text-sm text-gray-600">{request.menteeId.email}</p>
              {/* <p className="mt-2 text-gray-700">{request.message}</p> */}
              {/* {request.pending ? (
                <p className="mt-3 text-orange-600">
                  Pending Payment: ${request.price}
                </p>
              ) : (
                <button
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleRequestPayment(request.id)}
                >
                  Pay & Accept
                </button>
              )} */}
              <button
                className="mt-3 ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleAccept(request._id)}
              >
                Accept
              </button>
              {/* {showPaymentBox === request.id && (
                <div className="mt-3 p-4 border rounded bg-gray-50">
                  <label className="block text-sm font-semibold mb-2">
                    Set Price ($)
                  </label>
                  <input
                    type="number"
                    className="border px-3 py-2 rounded w-full"
                    value={paymentInput}
                    onChange={(e) => setPaymentInput(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleSetPrice(request.id)}
                  >
                    Confirm
                  </button>
                </div>
              )} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorRequests;
