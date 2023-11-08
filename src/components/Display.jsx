import React, { useState, useEffect } from "react";

const Display = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [lastLoginMessage, setLastLoginMessage] = useState("");

  useEffect(() => {
    // Set an initial welcome message
    setWelcomeMessage("Welcome, user!");

    // Fetch the last login event every 5 seconds
    const fetchLastLoginEvent = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/users/lastlogin"
        );
        const data = await response.json();

        if (response.status === 200) {
          setLastLoginMessage(`Last Login: ${data.userName}`);
        } else {
          setLastLoginMessage("No login events found.");
        }
      } catch (error) {
        console.error(error);
        setLastLoginMessage("Failed to fetch login event.");
      }
    };

    // Fetch the last login event immediately when the component mounts
    fetchLastLoginEvent();

    // Poll for the last login event every 5 seconds
    const interval = setInterval(fetchLastLoginEvent, 3000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="container">
      {/* <p>{welcomeMessage}</p>
      <p>{lastLoginMessage}</p> */}
      <h1>Welcome to Nable Solution</h1>
      <div className="user_data">
        <div className="user_info">
          <h2>859689892635656852</h2>
          <h3>Aadesh</h3>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHEP6t3gyEodjhHviOz1fBlxN_lDf8_jDQKw&usqp=CAU"
          alt=""
          className="user_img"
        />
      </div>
    </div>
  );
};

export default Display;
