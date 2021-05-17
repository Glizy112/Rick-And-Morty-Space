import axios from "./axios";
import * as actions from "./actionTypes";

const getLocations = async (state) => {
  const request = await axios.get("/location");
  let locations = [];
  for (let i = 1; i <= request.data.info.pages; ++i) {
    const newRequest = await axios.get(`/location?page=${i}`);
    locations = [...locations, ...newRequest.data.results];
  }
  return { ...state, locations: locations };
};

const setLocation = async (state, location) => {
  let charactersIds = [];
  location?.residents.map((item) => {
    charactersIds.push(item.substring(item.lastIndexOf("/") + 1));
  });
  let query = charactersIds.toString();
  const request = await axios.get("/character/" + query);
  if (Array.isArray(request.data))
    return {
      ...state,
      currentLocation: location?.name,
      characters: request.data,
    };
  else
    return {
      ...state,
      currentLocation: location?.name,
      characters: [request.data],
    };
};

export default function reducer(
  state = { currentLocation: "", characters: [], locations: [] },
  action
) {
  switch (action.type) {
    case actions.FETCH_LOCATION:
      return getLocations(state).then((res) => res);
    case actions.SET_LOCATION:
      return setLocation(state, action.payload.location).then((res) => res);
      default:
        return state;
    }
}
