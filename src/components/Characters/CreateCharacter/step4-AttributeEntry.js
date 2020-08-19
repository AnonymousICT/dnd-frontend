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

    useEffect(()=>{
      setNewCharacter((previousState)=>{
        return {
          ...previousState,
          strength: combineAttributeAndRacialBonus("STR", previousState.raceData, attributeValue),
          dexterity: combineAttributeAndRacialBonus("DEX", previousState.raceData, attributeValue),
          constitution: combineAttributeAndRacialBonus("CON", previousState.raceData, attributeValue),
          intelligence: combineAttributeAndRacialBonus("INT", previousState.raceData, attributeValue),
          wisdom: combineAttributeAndRacialBonus("WIS", previousState.raceData, attributeValue),
          charisma: combineAttributeAndRacialBonus("CHA", previousState.raceData, attributeValue),
        }
      })
    },[setNewCharacter, attributeValue])

    useEffect(() => {
      setValid(true);
    },[setValid]);

    return (
        <div className="attribute-entry">
            <h3>Enter your Attributes below</h3>
            {allAttributes.sort(sortFunction).map((attribute, i) => {
                return (
                    <div className="attribute" key={i}>
                        <label value={attribute[1]} key={i}>
                            {attribute[0]}
                        </label>
                        <input
                            type="number"
                            min="3"
                            max="18"
                            placeholder="10"
                            name={attribute[0] || ""}
                            value={attributeValue[attribute[0]] || 10}
                            onChange={(e) =>
                                handleAttributeValueChange({
                                    [e.target.name]: +e.target.value,
                                })
                            }
                        />
                        <label name={`${attribute[0]} total`}>
                            {combineAttributeAndRacialBonus(attribute[0], newCharacter.raceData, attributeValue)} Total
                        </label>

                        <label name={`${attribute[0]} modifier`}>
                            {modMath(combineAttributeAndRacialBonus(attribute[0], newCharacter.raceData, attributeValue))} Modifier
                        </label>

                        <label
                            name={`${attribute[0]} racial bonuses`}
                        >{`${racialBonus(
                            attribute[0],
                            newCharacter.raceData
                        )} racial bonuses`}</label>
                    </div>
                );
            })}
        </div>
    );
}
