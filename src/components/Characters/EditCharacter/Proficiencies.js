import React from "react";

export default function Proficiencies({ currentCharacter }) {
    const getClassProficiencies = (character) => {
        return (
            (character &&
                character.classData &&
                character.classData.proficiencies) || [{ name: "potato" }]
        );
    };
    const getRaceProficiencies = (character) => {
        return (
            (character &&
                character.classData &&
                character.raceData.starting_proficiencies) || [
                { name: "potato weapon" },
            ]
        );
    };

    const characterProficiences = () => {
        return getClassProficiencies(currentCharacter).map((prof) => (
            <li key={prof.name}>{prof.name}</li>
        ));
    };

    const getRacialTraits = (character) => {
        return (
            (character && character.raceData && character.raceData.traits) || [
                { name: "potato sense" },
            ]
        );
    };
    const getLanguages = (character) => {
        return (
            (character &&
                character.raceData &&
                character.raceData.languages) || [{ name: "speak to potatoes" }]
        );
    };

    const characterTraits = () => {
        return getRacialTraits(currentCharacter).map((trait) => (
            <li key={trait.name}>{trait.name}</li>
        ));
    };

    const characterLanguages = () => {
        return getLanguages(currentCharacter).map((language) => (
            <li key={language.name}>{language.name}</li>
        ));
    };

    return (
        <div>
            <h3>Character Proficiencies</h3>
            <ul>
                {characterProficiences()}
                {getRaceProficiencies(currentCharacter).map(prof=> {
                    return <li key={prof.name}>{prof.name.replace("Skill: ", "")}</li>
                })}
                {currentCharacter.raceProfChoice !== "" ? (
                    <li>{currentCharacter.raceProfChoice}</li>
                ) : null}
                {characterLanguages()}
                {currentCharacter.languageChoice !== "" ? (
                    <li>{currentCharacter.languageChoice}</li>
                ) : null}
            </ul>
            <h3>Character Traits</h3>
            <ul>
                {characterTraits()}
                {currentCharacter.traitChoice !== "" ? (
                    <li>{currentCharacter.traitChoice}</li>
                ) : null}
            </ul>
        </div>
    );
}
