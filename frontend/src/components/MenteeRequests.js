import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext";

const BaseURL = config.BASE_URL;

const MenteeRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId || !user?.userType) return;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const [pendingRes, acceptedRes] = await Promise.allSettled([
          axios.get(`${BaseURL}/request/pending-request`, {
            params: { userId: user.userId, role: user.userType },
          }),
          axios.get(`${BaseURL}/request/accepted-request`, {
            params: { userId: user.userId, role: user.userType },
          }),
        ]);

        let combined = [];

        if (pendingRes.status === "fulfilled" && pendingRes.value.data.success) {
          const pendings = (pendingRes.value.data.requests || []).map((r) => ({
            ...r,
            statusDisplay: "Pending",
          }));
          combined = [...combined, ...pendings];
        }

        if (acceptedRes.status === "fulfilled" && acceptedRes.value.data.success) {
          const accepteds = (acceptedRes.value.data.requests || []).map((r) => ({
            ...r,
            statusDisplay: "Accepted",
          }));
          combined = [...combined, ...accepteds];
        }

        setRequests(combined);
      } catch (error) {
        console.error("Error fetching mentee requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.userId, user?.userType]);

  return (
    <div className="h-[100%] flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
          Your Mentor Requests
        </h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500 text-center">No requests sent yet.</p>
          ) : (
            requests.map((request) => {
              const mentor = request.mentorId || {};
              const profilePic = mentor.profilePicture?.[0]?.url || "https://via.placeholder.com/150";

              return (
                <div
                  key={request._id}
                  className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm border"
                >
                  <img
                    src={profilePic}
                    alt={mentor.name || "Mentor"}
                    className="w-12 h-12 rounded-full border mr-3 object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{mentor.name || "Mentor"}</h4>
                    <p className="text-xs text-gray-500">{mentor.email || ""}</p>
                    <p className="text-sm text-gray-600 mt-1">{mentor.bio || ""}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded font-semibold ${
                      request.statusDisplay === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.statusDisplay || request.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeRequests;
