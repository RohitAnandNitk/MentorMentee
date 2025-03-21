import React from "react";
import { Card, CardContent, Typography, Button, Box, Container, Grid } from "@mui/material";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Basic Mentorship",
    price: "$29/month",
    features: ["1 mentoring session per month", "Email support", "Access to community chat"],
  },
  {
    name: "Pro Mentorship",
    price: "$59/month",
    features: ["4 mentoring sessions per month", "Priority email & chat support", "Exclusive resources"],
  },
  {
    name: "Elite Mentorship",
    price: "$99/month",
    features: ["Unlimited mentoring sessions", "1-on-1 career coaching", "Personalized learning path"],
  },
];

const MentorshipPlans = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", display: "flex", flexDirection: "column" }}>
      {/* Heading Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Choose Your Mentorship Plan
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Select a plan that best fits your learning and career goals.
        </Typography>
      </Container>

      {/* Plans Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", padding: 3, borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">{plan.name}</Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold" mt={1}>
                    {plan.price}
                  </Typography>
                  <Box mt={2}>
                    {plan.features.map((feature, i) => (
                      <Typography key={i} variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                        <CheckCircle size={16} color="green" /> {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={() => alert(`You selected the ${plan.name} plan!`)}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MentorshipPlans;
