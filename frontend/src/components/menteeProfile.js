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

import { useAuth } from "./AuthContext";

const BaseURL = config.BASE_URL;

const MenteeProfile = () => {
  const { user } = useAuth();
  // console.log("user : " + userType);
  // console.log("userId : " + userId);
  // console.log("token : " + token);
  const [userData, setUserData] = useState(null);

  // Sample mentor data (Replace with API response)
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const response = await axios.get(
          `${BaseURL}/${user.userType}/${user.userId}`
        );

        // console.log("User data received : " + response.data.data);
        // console.log("name : " + response.data.data.name);

        setUserData(response.data.data);
      };
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  }, [user.userType, user.userType]);

  const mentor = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    skills: userData?.expertise ?? [],
    availability: "Available for mentoring",
    image:
      "https://images.unsplash.com/photo-1526835746352-0b9da4054862?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
    rating: 4.5, // Sample rating
  };

  const mentors = [
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      skills: ["Java", "Spring Boot"],
      rating: 4.7,
    },
    {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      skills: ["Machine Learning", "TensorFlow"],
      rating: 4.8,
    },
    {
      name: "Emily Clark",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      skills: ["UI/UX", "Figma"],
      rating: 4.6,
    },
  ];

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
            image={mentor.image}
            alt={mentor.name}
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
              {mentor.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {mentor.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {mentor.bio}
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
                {console.log(mentor.skills)}
                {mentor.skills.map((skill, index) => (
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

            {/* Rating Section */}
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Rating
              </Typography>
              <Rate allowHalf disabled defaultValue={mentor.rating} />
              <Typography variant="body2" color="textSecondary">
                {mentor.rating} / 5
              </Typography>
            </Box>

            {/* Buttons Section */}

            <Box mt={3} className="flex flex-col gap-3">
              {/* Message Mentor Button */}
              <Button
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                onClick={() => alert("Opening chat with the mentor...")}
              >
                <MessageCircle size={18} />
                Message Mentor
              </Button>

              {/* Book Trial Button */}
              <Button
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                onClick={() => alert("Redirecting to booking system...")}
              >
                <CalendarCheck size={18} />
                Book Trial Session
              </Button>

              {/* Request Mentorship Button */}
              <Button
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                onClick={() => alert("Mentorship request sent!")}
              >
                <UserPlus size={18} />
                Request Mentorship
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      {/* Other Mentors Section */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Other Mentors
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {mentors.map((m, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={m.image}
                  alt={m.name}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "3px solid white",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {m.name}
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={1} mt={1}>
                    {m.skills.map((skill, i) => (
                      <Chip
                        key={i}
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
                  <Rate allowHalf disabled defaultValue={m.rating} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MenteeProfile;
