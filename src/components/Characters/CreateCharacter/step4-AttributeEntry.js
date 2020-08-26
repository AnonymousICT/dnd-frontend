import React, { useState, useEffect } from "react";
import { defaultValues } from "../../../context/DefaultValues";
import { fetchAbilityScores } from "../../../api/AbilityScoreAPI";
import {
    modMath,
    sortFunction,
    racialBonus,
    combineAttributeAndRacialBonus,
} from "../../Utilities/AttributeUtilities";

export default function AttributeEntry({
    newCharacter,
    setNewCharacter,
    setValid,
}) {
    const [allAttributes, setAttributes] = useState(
        defaultValues.allAttributes
    );
    const [attributeValue, setAttributeValue] = useState(
        defaultValues.attributeValue(allAttributes)
    );

    const handleAttributeValueChange = async (attribute) => {
        const attributes = { ...attributeValue, ...attribute };
        setAttributeValue(attributes);
    };

    useEffect(() => {
        const fetchedData = async () => {
            setAttributes(await fetchAbilityScores());
        };
        fetchedData();
    }, []);

    useEffect(() => {
        setNewCharacter((previousState) => {
            return {
                ...previousState,
                strength: combineAttributeAndRacialBonus(
                    "STR",
                    previousState.raceData,
                    attributeValue
                ),
                dexterity: combineAttributeAndRacialBonus(
                    "DEX",
                    previousState.raceData,
                    attributeValue
                ),
                constitution: combineAttributeAndRacialBonus(
                    "CON",
                    previousState.raceData,
                    attributeValue
                ),
                intelligence: combineAttributeAndRacialBonus(
                    "INT",
                    previousState.raceData,
                    attributeValue
                ),
                wisdom: combineAttributeAndRacialBonus(
                    "WIS",
                    previousState.raceData,
                    attributeValue
                ),
                charisma: combineAttributeAndRacialBonus(
                    "CHA",
                    previousState.raceData,
                    attributeValue
                ),
            };
        });
    }, [setNewCharacter, attributeValue]);

    useEffect(() => {
        setValid(true);
    }, [setValid]);

    return (
        <div className="attribute-entry">
            <h3>Enter your Attributes below</h3>
            <table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Ability</th>
                        <th>Input</th>
                        <th>Race</th>
                        <th>Mod</th>
                    </tr>
                </thead>
                <tbody>
                    {allAttributes.sort(sortFunction).map((attribute, i) => {
                        return (
                            <tr>
                                <td>
                                    {combineAttributeAndRacialBonus(
                                        attribute[0],
                                        newCharacter.raceData,
                                        attributeValue
                                    )}
                                </td>
                                <td>{attribute[0]}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="3"
                                        max="18"
                                        placeholder="10"
                                        name={attribute[0] || ""}
                                        value={
                                            attributeValue[attribute[0]] || 10
                                        }
                                        onChange={(e) =>
                                            handleAttributeValueChange({
                                                [e.target.name]: +e.target
                                                    .value,
                                            })
                                        }
                                    />
                                </td>
                                <td>{`${racialBonus(
                                    attribute[0],
                                    newCharacter.raceData
                                )}`}</td>
                                <td>
                                    {modMath(
                                        combineAttributeAndRacialBonus(
                                            attribute[0],
                                            newCharacter.raceData,
                                            attributeValue
                                        )
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
