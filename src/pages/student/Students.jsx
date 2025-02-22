import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import student_img from "../../assets/images/student.jpg";
import { useNavigate } from "react-router-dom";

// const STUDENTS = [
//   {
//     id: 1,
//     name: "Aarav Mehta",
//     age: 21,
//     course: "Computer Science",
//     image: student,
//   },
//   {
//     id: 2,
//     name: "Ishika Sharma",
//     age: 22,
//     course: "Business Administration",
//     image: student,
//   },
//   {
//     id: 3,
//     name: "Kabir Singh",
//     age: 20,
//     course: "Mechanical Engineering",
//     image: student,
//   },
//   {
//     id: 4,
//     name: "Saanvi Patel",
//     age: 23,
//     course: "Data Science",
//     image: student,
//   },
//   {
//     id: 5,
//     name: "Rohan Verma",
//     age: 21,
//     course: "Electrical Engineering",
//     image: student,
//   },
//   {
//     id: 6,
//     name: "Mira Kapoor",
//     age: 22,
//     course: "Psychology",
//     image: student,
//   },

//   {
//     id: 7,
//     name: "John Doe",
//     age: 24,
//     course: "Mathematics",
//     image: student,
//     onClick: () => console.log("Clicked on John Doe"),
//   },
// ];

const Students = () => {
  const navigate = useNavigate();

       const [student_users, setUsers] = useState([]);
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

        useEffect(()=>{
          fetchUsers('Student')
        },[])

       

  return (
    <div className="expert_card_container">
      {student_users.map((student, index) => (
        <Card
          key={student.id}
          title={student.name}
          course={student.bio}
          // description={`Age: ${student.age}`}
          image={student_img}
          // onClick={() => console.log(`Clicked on ${student.name}`)}
          onClick={() =>navigate(`/chat/${index}`, { state: { expert : student ,expert_img: student_img } })}
        />
      ))}
    </div>
  );
};

export default Students;
