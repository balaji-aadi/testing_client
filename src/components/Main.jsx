import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUsers, setCurrentUser] = useState({
    userName: currentUser?.user.name,
    image: currentUser?.userImg.image,
  });
  const [showAnotherData, setShowAnotherData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentUser({
        user: { name: "" }, // Empty user data
        userImg: { image: "" }, // Empty user image data
      });
      setShowAnotherData(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {showAnotherData ? (
        <h1>Welcome to Nable</h1>
      ) : (
        <>
          <h4>
            Welcome back
            <span style={{ color: "blue", padding: "0rem 0.5rem" }}>
              {currentUsers.userName}
            </span>
          </h4>
          <img
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={currentUsers.image}
            alt=""
          />
        </>
      )}
    </div>
  );
};

export default Main;
