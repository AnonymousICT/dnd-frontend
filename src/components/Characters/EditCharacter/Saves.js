import React, { useState, useEffect } from "react";
import { modMath, attributeSort } from "../../Utilities/AttributeUtilities";

export default function Saves({
    currentCharacter,
    attributeValue,
    setAttributeValue,
    profBonus,
}) {
    const [proficientSavingThrows, setProficientSavingThrows] = useState({});
    const getClassSavingThrows = (character) => {
        return (
            (character &&
                character.classData &&
                character.classData.saving_throws) || [{ name: "potato save" }]
        );
    };

    useEffect(() => {
        const characterProficientSaves = () => {
            const saves = getClassSavingThrows(currentCharacter).reduce(
                (obj, save) => {
                    return { ...obj, [save.name]: profBonus() };
                },
                {}
            );
            setProficientSavingThrows(saves);
        };
        characterProficientSaves();
    }, [currentCharacter, profBonus]);

    const displaySaves = (name) => {
        if(proficientSavingThrows[name]) {
            return (
                <li className="isProficient" key={name}>
                    {name}:{" "}
                    {(proficientSavingThrows[name] || 0) +
                        modMath(attributeValue[name])}
                </li>
            );
        } else {
            return (
                <li key={name}>
                    {name}:{" "}
                        {modMath(attributeValue[name])}
                </li>
            )
        }
    };
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

    return (
        <div className="skills-save-container">
            <div className="save-container">
                <h2>Saving Throws</h2>
                <ul>
                    {Object.keys(attributeValue)
                        .sort(sortFunction)
                        .map((save) => {
                            return displaySaves(save);
                        })}
                </ul>
            </div>
        </div>
    );
}
