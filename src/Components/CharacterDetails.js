import React from 'react';
import './charDetails.css';

const CharacterDetails = (props) => {

    const {image, name, species, gender, status, episode}= props.location.state;
    
return (
        <main className="container">
            <div className="wrap_container">
             
                <img src={image} alt="char_photo" className="char_img"/>
                <div className="status">
                    <span
                        style={{
                            backgroundColor:
                              status === "Alive"
                            ? "green"
                            : status === "unknown"
                            ? "gold"
                            : "red",
                        }}
                        className="icon"
                    ></span>
                    <h4 className="status_info">{status}</h4>
                </div>

             <div className="data_wrap">
                <div className="char_details">
                    <h1 className="char_name">{name}</h1>        
                </div>

                <div className="others">
                    <h4 className="char_species">{species}</h4>
                    <h4 className="char_gender">{gender}</h4>
                </div>

                <div className="episodes">
                    <h4 className="char_species">
                        No. of Episodes : {episode?.length}
                    </h4>
                </div>
             </div>
            </div>
        </main>
    )
 
}

export default CharacterDetails
