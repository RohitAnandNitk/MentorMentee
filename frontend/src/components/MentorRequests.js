import React, { useState } from "react";

const MentorRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      menteeName: "Alice Smith",
      menteeEmail: "alice.smith@example.com",
      message: "I would love to learn AI from you!",
      paid: false,
      pending: false,
      price: null,
    },
    {
      id: 2,
      menteeName: "Bob Brown",
      menteeEmail: "bob.brown@example.com",
      message: "Looking for guidance in frontend development.",
      paid: false,
      pending: false,
      price: null,
    },
  ]);

  const [paymentInput, setPaymentInput] = useState("");
  const [showPaymentBox, setShowPaymentBox] = useState(null);

  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
    alert("Request Accepted!");
  };

  const handleRequestPayment = (id) => {
    setShowPaymentBox(id);
  };

  const handleSetPrice = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, pending: true, price: paymentInput } : request
      )
    );
    setShowPaymentBox(null);
    setPaymentInput("");
  };

  return (
    <div className="h-[95%] flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Mentee Requests</h2>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center">No pending requests.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="border-b last:border-b-0 pb-4 mb-4">
              <h3 className="font-semibold text-lg">{request.menteeName}</h3>
              <p className="text-sm text-gray-600">{request.menteeEmail}</p>
              <p className="mt-2 text-gray-700">{request.message}</p>
              {request.pending ? (
                <p className="mt-3 text-orange-600">Pending Payment: ${request.price}</p>
              ) : (
                <button
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleRequestPayment(request.id)}
                >
                  Pay & Accept
                </button>
              )}
              <button
                className="mt-3 ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleAccept(request.id)}
              >
                Accept
              </button>
              {showPaymentBox === request.id && (
                <div className="mt-3 p-4 border rounded bg-gray-50">
                  <label className="block text-sm font-semibold mb-2">Set Price ($)</label>
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
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorRequests;