import axios from "axios";

import { api_url } from "./AbilityScoreAPI";

export const fetchRaceData = async () => {
  const url = `${api_url}/races/`;

  try {
    const {
      data: { results },
    } = await axios.get(url);
    return results.map((index) => {
      return [index.name, index.url];
    });
  } catch (error) {
    return error;
  }
};

export const fetchSpecificRace = async (race) => {
  const url = `https://www.dnd5eapi.co${race}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
