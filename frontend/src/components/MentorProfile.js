import React, { useEffect, useState } from "react";
import config from "../config.js";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { Rate } from "antd";
import { MessageCircle, CalendarCheck, UserPlus } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import ChatBox from "./ChatBox.js";

const BaseURL = config.BASE_URL;

const MentorProfile = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(""); // "pending", "accepted", "none"
  const [requestId, setRequestId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/mentor/${userId}`);
        // console.log("mentor data :", response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.log("Error fetching mentor data:", error);
      }
    };

    const checkConnection = async () => {
      try {
        console.log("menteeId : ", user.userId);
        console.log("mentorId : ", userId);

        const response = await axios.get(
          `${BaseURL}/request/check-connection`,
          {
            params: {
              menteeId: user.userId,
              mentorId: userId,
            },
          }
        );
        console.log("got user connection stauts : ", response.data);
        setRequestStatus(response.data.status);
        setRequestId(response.data.requestId);
      } catch (error) {
        console.log("Error at check connection:", error);
      }
    };

    fetchUserData();
    checkConnection();
  }, [userId, user]);

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${BaseURL}/request/send-request`, {
        mentorId: userId,
        menteeId: user.userId,
      });
      if (response.data.success) {
        setRequestStatus("pending");
      }
    } catch (error) {
      console.log("Error sending request:", error);
    }
  };

  const cancelRequest = async () => {
    try {
      if (!requestId) return;
      const response = await axios.delete(
        `${BaseURL}/request/cancel-request/${requestId}`
      );
      if (response.data.success) {
        setRequestStatus("none");
      }
      setRequestId(null);
    } catch (error) {
      console.log("Error canceling request:", error);
    }
  };

  const mentor = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    skills: userData?.expertise ?? [],
    image: userData?.profilePicture[0]?.url,
    rating: userData?.ratings,
  };

  const handleChatBox = () => {
    console.log("Opening the chatBox with mentorId : ", userId);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 300,
          backgroundImage: `url("https://images.unsplash.com/photo-1566346654674-695486b7a405?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)",
          },
        }}
      />

      <Container
        maxWidth="sm"
        sx={{ position: "relative", top: -80, zIndex: 2 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            textAlign: "center",
            bgcolor: "#fff",
            padding: 3,
          }}
        >
          <CardMedia
            component="img"
            image={mentor.image}
            alt={mentor.name}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "4px solid white",
              margin: "0 auto",
            }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {mentor.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {mentor.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {mentor.bio}
            </Typography>

            {/* Skills */}
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Skills
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={1}
                mt={1}
              >
                {mentor.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            {/* Rating */}
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Rating
              </Typography>
              <Rate allowHalf value={mentor.rating} />
              <Typography variant="body2" color="textSecondary">
                {mentor.rating} / 5
              </Typography>
            </Box>

            {/* Buttons */}
            <Box mt={3} className="flex flex-col gap-3">
              <Button
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                variant="contained"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle size={18} />
                Message Mentor(Not Working)
              </Button>

              {/* ChatBox Positioned Above the Profile Page */}
              {isChatOpen && (
                <ChatBox
                  personName={mentor.name}
                  mentorId={userId}
                  menteeId={user.userId}
                  onClose={() => setIsChatOpen(false)}
                />
              )}

              <Button
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                onClick={() => alert("Redirecting to booking system...")}
              >
                <CalendarCheck size={18} />
                Book Trial Session(Not Working)
              </Button>

              {/* Mentorship Request Button */}
              {requestStatus === "none" && (
                <Button
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  onClick={sendRequest}
                >
                  <UserPlus size={18} />
                  Request Mentorship
                </Button>
              )}

              {requestStatus === "pending" && (
                <Button
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  onClick={cancelRequest}
                >
                  <UserPlus size={18} />
                  Cancel Request
                </Button>
              )}

              {requestStatus === "accepted" && (
                <Button
                  disabled
                  className="flex items-center justify-center gap-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                  Your Mentor
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MentorProfile;
