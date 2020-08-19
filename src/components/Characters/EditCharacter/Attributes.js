import React, { useState, useEffect } from "react";
import { modMath, attributeSort } from "../../Utilities/AttributeUtilities"

export default function Attributes({ currentCharacter }) {
  const [attributeValue, setAttributeValue] = useState({});
  const getAttributeValue = (attributeName) => attributeValue[attributeName];
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

  window.ccurrentCharacter = currentCharacter;

  const getClassLevels = (character) => {
      return (currentCharacter && currentCharacter.classData && currentCharacter.classData.classlevels) || [{level: 0, prof_bonus:2}];
  }

  const profBonus = () => {
    return getClassLevels(currentCharacter)
      .filter((cl) => cl.level <= (currentCharacter.level || 1) && cl.prof_bonus)
      .reverse()[0].prof_bonus;
  };

  const sortFunction = (a, b) =>
    attributeSort[a].sortOrder - attributeSort[b].sortOrder;

  const handleAttributeValueChange = async (attribute) => {
    const attributes = { ...attributeValue, ...attribute };
    setAttributeValue(attributes);
  };

  return (
    <div className="attribute-container">
      <div className="prof-bonus">
        Proficiency Bonus: <span>{profBonus()}</span>
      </div>
      {Object.keys(attributeValue)
        .sort(sortFunction)
        .map((attribute, i) => {
          return (
            <div className="attribute" key={i}>
              <label>{attribute}</label>
              <input
                type="number"
                min="3"
                max="20"
                name={attribute}
                value={attributeValue[attribute] || 10}
                onChange={(e) =>
                  handleAttributeValueChange({
                    [e.target.name]: +e.target.value,
                  })
                }
              />
              <label>Modifier {modMath(getAttributeValue(attribute))}</label>
            </div>
          );
        })}
    </div>
  );
}
