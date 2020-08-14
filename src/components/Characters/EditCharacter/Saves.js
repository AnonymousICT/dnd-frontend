import React, { useEffect, useContext } from "react";
import { AttributeContext } from "../../../context/AttributeContext";
import { Context } from "../../../context/Context";
import displayCheckboxes from "./DisplayCheckBoxes";

const saveArray = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export default function Saves({ userClass: { saving_throws }, filteredLevel }) {
  const { attributeValue, modMath, setAttributeValue } = useContext(
    AttributeContext
  );
  const { currentCharacter } = useContext(Context);

  useEffect(() => {
    setAttributeValue({
      STR: currentCharacter.strength,
      DEX: currentCharacter.dexterity,
      CON: currentCharacter.constitution,
      INT: currentCharacter.intelligence,
      WIS: currentCharacter.wisdom,
      CHA: currentCharacter.charisma,
    });
  }, [currentCharacter, setAttributeValue]);

  const savingThrows = !saving_throws
    ? []
    : saving_throws.map((save) => save.name);

  return (
    <div className="skills-save-container">
      <div className="save-container">
        <h2>Saving Throws</h2>
        {displayCheckboxes(
          saveArray,
          savingThrows,
          null,
          filteredLevel,
          attributeValue,
          modMath
        )}
      </div>
    </div>
  );
}
