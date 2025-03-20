// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function useChatbase() {
//   const location = useLocation();

//   useEffect(() => {
//     const scriptId = "chatbase-script";

//     // Only load the script on the desired page (e.g., "/chat")
//     if (location.pathname === "/" && !document.getElementById(scriptId)) {
//       fetch("http://localhost:5000/api/chatbase-key")
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.key) {
//             loadChatbase(data.key);
//           }
//         })
//         .catch((err) => console.error("Error fetching Chatbase key:", err));
//     }
//   }, [location.pathname]);

//   function loadChatbase(secretKey) {
//     if (!document.getElementById("chatbase-script")) {
//       const script = document.createElement("script");
//       script.src = "https://www.chatbase.co/embed.min.js";
//       script.id = "chatbase-script";
//       script.dataset.chatbaseKey = secretKey;
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }
// }

// export default useChatbase;
