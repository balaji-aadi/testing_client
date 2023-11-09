import React, { useState, useEffect } from "react";
// import { Buffer } from 'Buffer';
import moment from "moment/moment";

const Display = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [lastLoginMessage, setLastLoginMessage] = useState("");
  const [userData, setUserData] = useState([])

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
        
        setUserData(data)
        console.log(data);

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

  // var base64Image = Buffer.from(userData[0].IMG.data).toString('base64');
  // var dataUrl = 'data:image/png;base64,' + base64Image;

  const buffer = userData[0]?.IMG.data
  // const buffer = new buffer(blob,'binary').tostring('base64');
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  console.log(base64String)
  // const blob  = new Blob([buffer], {type: "image/jpg"})
  // const dataUrl = URL.createObjectURL(blob)
  // console.log(`dataurl ==== ${dataUrl}`)
  
  // console.log(`imgage url ====== ${imageSrc}`)

  return (
    <div className="container">
      {/* <p>{welcomeMessage}</p>
      <p>{lastLoginMessage}</p> */}
      <h1>WELCOME TO EVENT</h1>
      <div className="user_data">
      <img
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHEP6t3gyEodjhHviOz1fBlxN_lDf8_jDQKw&usqp=CAU"
          src={`data:image/jpg;base64,${base64String}`}
          alt=""
          className="user_img"
        />
        <div className="user_info">
        {userData.map((item,index)=>{
          return (
            <>
            <h2> VISITOR ID : {item.USRID} </h2>
            <h2 style={{textTransform:"uppercase"}}> VISITOR NAME : {item.NM} </h2>
            <h3>CHECKIN TIME : {moment(item.SRVDT).format("DD-MM-YYYY HH:mm:ss")}</h3>
            </>
          )
        })}
          {/* <h2></h2> */}
          {/* <h3>Aadesh</h3> */}
        </div>
        
      </div>
    </div>
  );
};

export default Display;
