import {
  Backdrop,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import store from "./store";
import * as actions from "./actionTypes";
import CharacterCard from "./Components/CharacterCard";
import "./App.css";
import Tilt from "react-tilt";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 32,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  placeholder: {
    marginTop: 10,
  },
}));

export default function App() {
  const classes = useStyles();

  const [locations, setLocations] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();

  const [currentCharacter, setCurrentCharacter] = useState({});
  const [showCharacter, seTshowCharacter] = useState(false);

  useEffect(async () => {
    await store.dispatch({
      type: actions.FETCH_LOCATION,
    });
    store.getState().then((res) => {
      setLocations(res.locations);
    });
  }, []);

  const handleChange = (event) => {
    store.dispatch({
      type: actions.SET_LOCATION,
      payload: { location: locations[event.target.value] },
    });
  };

  const handleViewCharacter = (character) => {
    setCurrentCharacter(character);
    seTshowCharacter(true);
  };

  store.subscribe(() => {
    store.getState().then((res) => {
      setCurrentLocation(res.currentLocation);
      setCharacters(res.characters);
    });
  });

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <h1 className="main_heading">Rick & Morty Character</h1>
        </Grid>

        {/* Select Component */}
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Locations 
            </InputLabel>
            <Select
              native
              onChange={handleChange}
              label="Location"
              inputProps={{
                name: "Locations",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {locations?.map((place, index) => (
                <option key={index} value={index} defaultChecked={place.name.earth}>
                  {place.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Select Component */}
      </Grid>

      {/* Characters Card */}
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {currentLocation ? (
          Array.isArray(characters) ? (
            characters?.map((character, index) => (
              <Grid
                className="character_card"
                key={index} 
                item
                xs={12}
                sm={6}
                onClick={() => handleViewCharacter(character)}
              >
                <Tilt
                  className="Tilt"
                  options={{ max: 15 }}
                  scale={0.1}
                  style={{ height: "auto", width: "100%" }}>
                  
                  <CharacterCard character={character}/>

                </Tilt>
                
              </Grid>
            ))
          ) : (
            ""
          )
        ) : (
          <h3 className={classes.placeholder}>Select Location</h3>
        )}
      </Grid>
      {/* Characters Card */}

      {/* Full Screen Card */}
      <Backdrop
        className={classes.backdrop}
        open={showCharacter}
        onClick={() => seTshowCharacter(false)}
      >
        
          <CharacterCard character={currentCharacter} />
          
      </Backdrop>
      {/* Full Screen Card */}
      
    </div>
  );
}
