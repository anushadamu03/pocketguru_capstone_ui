import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import student_img from "../../assets/images/student.jpg";
import { useNavigate } from "react-router-dom";


const Students = () => {
  const navigate = useNavigate();

       const [student_users, setUsers] = useState([]);
       const [filterText, setFilterText] = useState("");

        const fetchUsers = async (role) => {
          try {
            const url =  `http://localhost:5000/all-users?role=${role}` ;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.users);
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        };

        const filteredStudents = student_users.filter((expert) =>
          expert.name.toLowerCase().includes(filterText.toLowerCase())
        );
      

        useEffect(()=>{
          fetchUsers('Student')
        },[])

       

  return (
    <div className="experts">
         <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="filter-input"
        />
        <button className="filter-button">Search</button>
      </div>
       <div className="expert_card_container">
      {filteredStudents.map((student, index) => (
        <Card
          key={student.id}
          title={student.name}
          course={student.bio}
          image={student_img}
          onClick={() =>navigate(`/chat/${index}`, { state: { expert : student ,expert_img: student_img } })}
        />
      ))}
    </div>
    </div>
   
  );
};

export default Students;
