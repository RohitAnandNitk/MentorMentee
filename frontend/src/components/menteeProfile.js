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
import { useAuth } from "./AuthContext";

const BaseURL = config.BASE_URL;

const MenteeProfile = () => {
  const { userId } = useParams();

  // const { user } = useAuth();
  // console.log("user : " + userType);
  // console.log("userId : " + userId);
  // console.log("token : " + token);
  const [userData, setUserData] = useState(null);

  // Sample mentor data (Replace with API response)
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const response = await axios.get(`${BaseURL}/mentee/${userId}`);

        // console.log("User data received : " + response.data.data);
        // console.log("name : " + response.data.data.name);

        setUserData(response.data.data);
      };
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const mentee = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    skills: userData?.expertise ?? [],
    profilePicture: userData?.profilePicture[0].url,
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
      {/* Background Image with Dark Overlay */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          backgroundImage: `url("https://images.unsplash.com/photo-1566346654674-695486b7a405?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, // Replace with actual background image
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
            background: "rgba(0, 0, 0, 0.3)", // Dark overlay
          },
        }}
      />

      {/* Profile Card */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          top: -80, // Lift card up to overlap background
          zIndex: 2,
        }}
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
          {/* Profile Picture */}
          <CardMedia
            component="img"
            image={mentee.profilePicture}
            alt={mentee.name}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "4px solid white",
              display: "block", // Ensures it behaves as a block element
              margin: "0 auto", // Centers it horizontally
            }}
          />

          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {mentee.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {mentee.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {mentee.bio}
            </Typography>

            {/* Skills Section */}
            <Box mt={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ "&:hover": { color: "blue" } }}
              >
                Skills
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={1}
                mt={1}
              >
                {console.log(mentee.skills)}
                {mentee.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="secondary"
                    variant="outlined"
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#007BFF",
                        color: "#fff",
                        borderColor: "#007BFF",
                        cursor: "pointer",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MenteeProfile;
