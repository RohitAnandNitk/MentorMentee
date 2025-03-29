import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ChatBox = ({ personName, mentorId, menteeId, onClose }) => {
  useEffect(() => {
    console.log("MentorId : ", mentorId);
    console.log("MenteeId : ", menteeId);
  }, []);

  return (
    <>
      {/* Blurred Background */}
      <Backdrop
        open={true}
        sx={{ zIndex: 1000, backdropFilter: "blur(5px)" }}
      />

      {/* ChatBox */}
      <Card
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          height: 450,
          display: "flex",
          flexDirection: "column",
          boxShadow: 5,
          zIndex: 1100,
          borderRadius: 4, // Adds rounded corners
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{personName}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </CardContent>

        {/* Chat Messages Container */}
        <CardContent
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            borderTop: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* Messages will go here */}
        </CardContent>

        {/* Input Field */}
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <TextField fullWidth placeholder="Type a message..." size="small" />
          <Button variant="contained" sx={{ ml: 1 }}>
            Send
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatBox;
