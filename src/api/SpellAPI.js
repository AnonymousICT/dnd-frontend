import axios from "axios";
import { defaultValues } from "../context/DefaultValues";
import { api_url } from "./AbilityScoreAPI";

const { specificSpell } = defaultValues;

export const fetchSpellData = async () => {
  const url = `${api_url}/spells/`;
  try {
    const {
      data: { results },
    } = await axios.get(url);
    return results;
  } catch (error) {
    return error;
  }
};

export const fetchAllSpecificSpellData = async () => {
  const url = `${api_url}/spells/`;
  try {
    const {
      data: { results },
    } = await axios.get(url);
    const allSpells = Promise.all(
      results.map((spell) => fetchSpecificSpell(spell.url))
    );
    return allSpells;
  } catch (error) {
    return error;
  }
};

export const fetchSpecificSpell = async (spell) => {
  if (!spell) return specificSpell;
  const url = `https://www.dnd5eapi.co${spell}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
