import { jwtDecode } from "jwt-decode";

export const getAuthDetails = () => {
  const token = localStorage.getItem("token");
  if (!token) return { userId: null, userType: null, token: null };

  console.log("token is " + token);

  try {
    const decodedToken = jwtDecode(token);
    return {
      userId: decodedToken.userId,
      userType: decodedToken.role,
      token: token,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return { userId: null, userType: null, token: null };
  }
};
