import axios from "axios";
import { api_url } from "./AbilityScoreAPI";

export const fetchEquipmentData = async () => {
  const url = `${api_url}/equipment`;

  try {
    const {
      data: { results },
    } = await axios.get(url);
    return results;
  } catch (error) {
    return error;
  }
};

export const fetchEquipmentCategories = async () => {
  const url = `${api_url}/equipment-categories`;

  try {
    const {
      data: { results },
    } = await axios.get(url);
    return results.map((item) => {
      return [item.name, item.url];
    });
  } catch (error) {
    return error;
  }
};

export const fetchEquipmentCategory = async (selection) => {
  const url = `https://www.dnd5eapi.co${selection}`;

  try {
    const { data } = await axios.get(url);
    return data.equipment;
  } catch (error) {
    return error;
  }
};

export const fetchSpecificEquipment = async (selection) => {
  const url = `https://www.dnd5eapi.co${selection}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
