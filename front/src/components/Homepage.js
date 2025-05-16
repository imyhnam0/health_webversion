import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";


import { auth } from "./firebase";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const Homepage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setName(docSnap.data().name || "이름 없음");
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Life is gorip</h1>
      <p className="homepage-subtitle">{name && `환영합니다, ${name}님!`}</p>
      <div className="button-group">
        <button className="homepage-button" onClick={() => navigate("/FoodManage")}>
          식단관리
        </button>
        <button className="homepage-button" onClick={() => navigate("/RoutineManage")}>
          루틴관리
        </button>
      </div>
    </div>
  );
};

export default Homepage;
