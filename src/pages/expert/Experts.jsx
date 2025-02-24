// import React, { useEffect, useState } from "react";
// import Card from "../../components/card/Card.jsx";
// import expert_img from "../../assets/images/student-image.jpg";
// import "../../pages/expert/expert.scss";
// import { useNavigate } from "react-router-dom";
// import { Filter } from "lucide-react";

// const Experts = () => {
//   const [filterText, setFilterText] = useState("");
//   const [selectedTag, setSelectedTag] = useState("");

//   const navigate = useNavigate();

//   const [experts_users, setUsers] = useState([]);
//   const fetchUsers = async (role) => {
//     try {
//       const url = `http://localhost:5000/all-users?role=${role}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const data = await response.json();
//       setUsers(data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//     }
//   };

//   const filteredExperts = experts_users.filter((expert) =>
//     expert.name.toLowerCase().includes(filterText.toLowerCase())
//   );

//   useEffect(() => {
//     fetchUsers("Mentor");
//   }, []);

//   const filteredExperts = experts.filter((expert) =>
//     selectedTag ? expert.expertise.toLowerCase().includes(selectedTag.toLowerCase()) : true
//   );

//   const handleTagClick = (tag) => {
//     setSelectedTag(tag);
//   };

//   return (
//     <div className="experts">
//       <div className="filter-container">
//         <input
//           type="text"
//           placeholder="Filter by name"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           className="filter-input"
//         />
//         <button className="filter-button">Search</button>
//       </div>

//       <div className="card-filtertags-container">

//         <div className="filter-tags">
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h4>Filter </h4>
//             <div>
//               {" "}
//               <Filter />
//             </div>
//           </div>

//           <div>
//             <p>MernStack</p>
//             <p>full-Stack </p>
//           </div>
//           <div>
//             <p>Python </p>
//             <p>Java</p>
//           </div>

//           <div>
//             <p>Node.js </p>
//             <p>React</p>
//           </div>

//           <div>
//             <p>Go</p>
//             <p>C++</p>
//           </div>

//           <div>
//             <p>TypeScript</p>
//             <p>Elm</p>
//           </div>

//           <div>
//             <p>SQL</p>
//             <p>NoSQL</p>
//           </div>
//         </div>
//         <div className="expert_card_container">
//           {filteredExperts.map((expert, index) => (
//             <Card
//               check={"expert"}
//               key={index}
//               title={expert.name}
//               description={expert.expertise}
//               image={expert_img}
//               onClick={() =>
//                 navigate(`/chat/${index}`, { state: { expert, expert_img } })
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Experts;

import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card.jsx";
import expert_img from "../../assets/images/student-image.jpg";
import "../../pages/expert/expert.scss";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";

const Experts = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [experts_users, setUsers] = useState([]);

  const navigate = useNavigate();

  // ✅ Fetch Users
  const fetchUsers = async (role) => {
    try {
      const url = `http://localhost:5000/all-users?role=${role}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers("Mentor");
  }, []);

  const normalize = (text) => text.toLowerCase().replace(/[-\s]/g, "");

  const filteredExperts = experts_users.filter(
    (expert) =>
      (selectedTag
        ? expert.expertise
            .split(",")
            .some((skill) => normalize(skill) === normalize(selectedTag))
        : true) &&
      (filterText
        ? expert.name.toLowerCase().includes(filterText.toLowerCase())
        : true)
  );

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const clearFilters = () => {
    setSelectedTag("");
    setFilterText("");
  };

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
        <button className="filter-button" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>

<div className="flex_card_filter">   
      <div className="filter-tags">
        
        <div style={{display:"flex",flexDirection:"row",gap:"80px"}}>
        <div>Filter</div> <Filter />
        </div>
         
        <div className="card-filtertags-container">
          {[
            "Mern Stack",
            "Full Stack",
            "Python",
            "Java",
            "Node.js",
            "React",
            "Go",
            "C++",
            "TypeScript",
            "Elm",
            "SQL",
            "NoSQL",
            "Devops"
          ].map((tag) => (
            <p key={tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </p>
          ))}
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
