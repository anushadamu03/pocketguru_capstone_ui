import React from "react";
import "./Card.scss";
import { Star } from 'lucide-react';


const Card = ({ title, description, image, onClick, course,check }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card__image" />}
      <div className="card__content">
    
        <h3 className="card__title">{title}</h3>
        {course && 
        <div className="card__course">{course}</div>
        }
        <p className="card__description">{description}</p>
        <div className="card__star">
         
        {check==="expert" ?  
        <>
         <Star fill="yellow" />
        <Star fill="yellow" />
        <Star fill="yellow" />
        <Star  />
        <Star />
        </>
        
          : ""
          }
      
        </div>
      
        {check==="expert" ? <button className="card__button" onClick={onClick}>
            Chat
          </button>
          : <button className="card__button" onClick={onClick}>
            Let's Chat
          </button>
          }
      </div>
    </div>
  );
};

export default Card;
