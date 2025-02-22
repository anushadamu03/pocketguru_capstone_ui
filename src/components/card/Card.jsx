import React from "react";
import "./Card.scss";

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
      
        {check==="expert" ? <button className="card__button" onClick={onClick}>
            Chat
          </button>
          : <button className="card__button" onClick={onClick}>
            Explore More
          </button>
          }
      </div>
    </div>
  );
};

export default Card;
