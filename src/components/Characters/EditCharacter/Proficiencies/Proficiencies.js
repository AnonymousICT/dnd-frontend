import React from "react";
import DisplayCharProf from "./DisplayCharProf";
import DisplayCharTraits from "./DisplayCharTraits";
import DisplayCharFeatures from "./DisplayCharFeatures";
import DisplayClassSpecific from "./DisplayClassSpecific";

export default function Proficiencies({ currentCharacter, getClassLevels }) {
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

    const characterLevels = getClassLevels
        .filter((item) => item.level <= currentCharacter.level)
        .reduce(function (accumulator, currentValue) {
            return [...accumulator, ...currentValue.features];
        }, []);

    const getClassSpecific = (
        getClassLevels.filter(
            (item) => item.level === currentCharacter.level
        )[0] || []
    ).class_specific;

    return (
        <div className="prof-wrapper">
            <h2>Proficiencies</h2>
            <div className="prof-container">
                <DisplayCharProf
                    currentCharacter={currentCharacter}
                    characterProficiences={characterProficiences}
                    getRaceProficiencies={getRaceProficiencies}
                    characterLanguages={characterLanguages}
                />
                <DisplayCharTraits
                    currentCharacter={currentCharacter}
                    characterTraits={characterTraits}
                />
                <DisplayCharFeatures characterLevels={characterLevels} />
                <DisplayClassSpecific
                    currentCharacter={currentCharacter}
                    getClassSpecific={getClassSpecific}
                />
            </div>
        </div>
    );
}
