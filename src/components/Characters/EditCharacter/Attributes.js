import React, { useEffect } from "react";
import { modMath, attributeSort } from "../../Utilities/AttributeUtilities";

export default function Attributes({
    currentCharacter,
    attributeValue,
    setAttributeValue,
    getAttributeValue,
    profBonus,
}) {
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
                            <label>
                                Modifier {modMath(getAttributeValue(attribute))}
                            </label>
                        </div>
                    );
                })}
        </div>
    );
}
