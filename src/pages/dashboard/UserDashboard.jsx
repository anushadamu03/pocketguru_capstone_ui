import React, { useEffect, useState } from "react";
import image from "../../assets/images/student.jpg";
import "../dashboard/userProfile.scss";
import axios from "axios";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("web_userId");
  const userrole = localStorage.getItem("web_userrole");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile(userId);
        setUserData(data);
      } catch (err) {
        setError("Failed to load user profile");
      }
    };

    fetchData();
  }, [userId]);

  console.log(userData);

  const getUserProfile = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user-profile/${userId}`
      );
      return response.data; // Return user profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-card">
        <div className="profile-image">
          <img src={image} alt="User" />
        </div>
        <h2 className="profile-name">{userData?.user?.name}</h2>
        <p className="location">{userData?.user?.email}</p>
        <p className="bio">
          {userrole === "Student" ? (
            ""
          ) : (
            <>
              <strong> Expertise </strong>- {userData?.user?.expertise}
            </>
          )}
        </p>
        <div className="profile-stats">
          <strong> {userData?.user?.bio}</strong>
        </div>
        {}
      </div>
    </div>
  );
};

export default UserDashboard;


