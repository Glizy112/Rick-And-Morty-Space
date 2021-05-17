import React from "react";
import "./characterCard.css";
import {Link} from 'react-router-dom'; 

function CharacterCard({ character }) {
  
  return (
    <main className="profile_container">
      <div className="wraps">
        <div
          style={{ backgroundImage: `url(${character.image})` }}
          className="profile_img"
        >
          <span></span>
        </div>
        <div className="profile_details">
          <h1 className="username">{character.name}</h1>
          <h4 className="meta_species">Species : {character.species}</h4>
          <h4 className="meta_gender">Gender : {character.gender}</h4>

          <div className="alive_status">
            <span
              style={{
                backgroundColor:
                  character.status === "Alive"
                    ? "green"
                    : character.status === "unknown"
                    ? "gold"
                    : "red",
              }}
              className="dot"
            ></span>
            <h4 className="meta_status">Status : {character.status}</h4>
          </div>

          <h4 className="meta_species">
            No. of Episodes : {character.episode?.length}
          </h4>
          <h4 className="know_more"> 
            <Link to={{pathname: `/details/${character.id}`, state: character}} className="know_more_link">
              Know More
            </Link>
          </h4>
        </div>
      </div>
    </main>
  );
}

export default CharacterCard;
