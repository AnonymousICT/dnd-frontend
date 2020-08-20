import React, { useEffect } from "react";
import { modMath, attributeSort } from "../../Utilities/AttributeUtilities";

export default function Saves({
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

    console.log(Object.keys(attributeValue).sort(sortFunction));
    console.log(attributeValue);

    return (
        <div className="skills-save-container">
            <div className="save-container">
                <h2>Saving Throws</h2>
                <ul>
                    {Object.keys(attributeValue)
                        .sort(sortFunction)
                        .map((save, i) => {
                            return (
                                <div key={save}>
                                    <label >{save}</label>
                                    <li>{modMath(attributeValue[save])}</li>
                                </div>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}
