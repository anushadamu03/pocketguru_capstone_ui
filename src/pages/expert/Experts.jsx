import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card.jsx";
import expert_img from "../../assets/images/student-image.jpg";
import "../../pages/expert/expert.scss";
import { useNavigate } from "react-router-dom";
import { Filter } from 'lucide-react';


// const EXPERTS = [
//   {
//     name: "John Doe",
//     title: "Frontend Developer",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: expert,
//   },

//   {
//     name: "Jane Doe",
//     title: "Backend Developer",
//     description:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     image: expert,
//   },

//   {
//     name: "Alice Doe",
//     title: "UI/UX Designer",
//     description:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     image: expert,
//   },

//   {
//     name: "Bob Doe",
//     title: "QA Engineer",
//     description:
//       "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
//     image: expert,
//   },

//   {
//     name: "Charlie Doe",
//     title: "Product Manager",
//     description:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
//     image: expert,
//   },

//   {
//     name: "David Doe",
//     title: "Project Manager",
//     description:
//       "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
//     image: expert,
//   },
// ];

const Experts = () => {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();


  const [experts_users, setUsers] = useState([]);
  const fetchUsers = async (role) => {
    try {
      const url = `http://localhost:5000/all-users?role=${role}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const filteredExperts = experts_users.filter((expert) =>
    expert.name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    fetchUsers("Mentor");
  }, []);

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
      <div className="card-filtertags-container">
      <div className="filter-tags">
        <div  style={{display: "flex",justifyContent: "space-between"}}>
        <h4>Filter </h4><div > <Filter /></div>
        </div>
       
        <div>
        <p>MernStack</p>
        <p>full-Stack </p>
        </div>
       <div>
       <p>Python </p>
       <p>Java</p>
       </div>

       <div>
       <p>Node.js </p>
       <p>React</p>
       </div>
       
        <div>
       <p>Go</p>
       <p>C++</p>
       </div>
    
       
     
       
        <div>
       <p>TypeScript</p>
       <p>Elm</p>
       </div>
       
        <div>
       <p>SQL</p>
       <p>NoSQL</p>
       </div>
       
      
       


      </div>
      <div className="expert_card_container">
        {filteredExperts.map((expert, index) => (
          <Card
            check={"expert"}
            key={index}
            title={expert.name}
            description={expert.expertise}
            image={expert_img}
            onClick={() =>
              navigate(`/chat/${index}`, { state: { expert, expert_img } })
            }
          />
        ))}
      </div>
      </div>
    
    </div>
  );
};

export default Experts;
