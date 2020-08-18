import React, { useState, useEffect, createContext } from "react";
import { fetchSpellData, fetchSpecificSpell } from "../api/SpellAPI";

import {
  fetchEquipmentData,
  fetchEquipmentCategories,
  fetchEquipmentCategory,
  fetchSpecificEquipment,
} from "../api/EquipmentAPI";

import { defaultValues } from "./DefaultValues";

const ResourceContext = createContext();

function ResourceContextProvider({ children }) {
  //the user's character class
  const [spellSelection, setSpellSelection] = useState("");
  const [equipmentSelection, setEquipmentSelection] = useState("");

  /* SPELL API CALLS*/
  const [allSpells, setAllSpells] = useState([]);
  const [specificSpell, setSpecificSpell] = useState(
    defaultValues.specificSpell
  );

  useEffect(() => {
    const fetchedAllSpells = async () => {
      setAllSpells(await fetchSpellData());
    };
    fetchedAllSpells();
  }, []);

  useEffect(() => {
    const fetchedSpecificSpellData = async () => {
      setSpecificSpell(await fetchSpecificSpell(spellSelection));
    };
    fetchedSpecificSpellData(spellSelection);
  }, [spellSelection]);

  /* EQUIPMENT API CALLS*/
  const [allEquipment, setAllEquipment] = useState([]);
  const [equipmentCategories, setEquipmentCategories] = useState([]);
  const [equipmentCategory, setEquipmentCategory] = useState(
    defaultValues.equipmentCategory
  );

  const [specificEquipmentSelection, setSpecificEquipmentSelection] = useState(
    ""
  );
  const [specificEquipment, setSpecificEquipment] = useState(
    defaultValues.specificEquipment
  );

  useEffect(() => {
    const fetchedAllEquipment = async () => {
      setAllEquipment(await fetchEquipmentData());
    };
    fetchedAllEquipment();
  }, []);

  useEffect(() => {
    const fetchedEquipmentCategories = async () => {
      setEquipmentCategories(await fetchEquipmentCategories());
    };
    fetchedEquipmentCategories();
  }, []);

  useEffect(() => {
    const fetchedEquipmentCategory = async () => {
      setEquipmentCategory(await fetchEquipmentCategory(equipmentSelection));
    };
    fetchedEquipmentCategory(equipmentSelection);
  }, [equipmentSelection]);

  useEffect(() => {
    const fetchedSpecificEquipment = async () => {
      setSpecificEquipment(
        await fetchSpecificEquipment(specificEquipmentSelection)
      );
    };
    fetchedSpecificEquipment(specificEquipmentSelection);
  }, [specificEquipmentSelection]);

  return (
    <ResourceContext.Provider
      value={{
        allSpells,
        setAllSpells,
        specificSpell,
        setSpecificSpell,
        equipmentSelection,
        setEquipmentSelection,
        spellSelection,
        setSpellSelection,
        allEquipment,
        equipmentCategories,
        equipmentCategory,
        specificEquipment,
        setSpecificEquipment,
        specificEquipmentSelection,
        setSpecificEquipmentSelection,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export { ResourceContext, ResourceContextProvider };
