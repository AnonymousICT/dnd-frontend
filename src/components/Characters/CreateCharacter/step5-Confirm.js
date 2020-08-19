import React, {useEffect} from "react";

export default function Confirm({ newCharacter, setValid }) {
    useEffect(() => {
		setValid(true);
	  },[setValid]);

    const {
        name,
        level,
        race,
        job,
        classData,
        languageChoice,
        traitChoice,
        profChoice,
        speed,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
    } = newCharacter;
    return (
        <div className="confirm-container">
            <h3>Confirm your character</h3>
            <ul>
                <li>Name: {name}</li>
                <li>
                    Level: {level} {race} {job}
                </li>
				{classData.proficiencies.map(prof => <li key={prof.name+'key'}>{prof.name}</li>)}
                {profChoice.map((choice) => (
                    <li key={choice+'key'}>{choice}</li>
                ))}
                {languageChoice ? (
                    <li>Language Choice: {languageChoice}</li>
                ) : null}
                {traitChoice ? (
                    <li>Breath Weapon Choice: {traitChoice}</li>
                ) : null}
				{}
                <li>Speed: {speed} ft</li>
                <li>Strength: {strength}</li>
                <li>Dexterity: {dexterity}</li>
                <li>Constitution: {constitution}</li>
                <li>Intelligence: {intelligence}</li>
                <li>Wisdom: {wisdom}</li>
                <li>Charisma: {charisma}</li>
            </ul>
        </div>
    );
}
