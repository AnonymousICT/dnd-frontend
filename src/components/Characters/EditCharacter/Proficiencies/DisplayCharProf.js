import React from "react";

export default function displayCharProf({
    currentCharacter,
    characterProficiences,
    getRaceProficiencies,
    characterLanguages,
}) {
    return (
        <div className="char-prof">
            <h3>Character Proficiencies</h3>
            <ul>
                {characterProficiences()}
                {getRaceProficiencies(currentCharacter).map((prof) => {
                    return (
                        <li key={prof.name}>
                            {prof.name.replace("Skill: ", "")}
                        </li>
                    );
                })}
                {currentCharacter.raceProfChoice !== "" ? (
                    <li>{currentCharacter.raceProfChoice}</li>
                ) : null}
                {characterLanguages()}
                {currentCharacter.languageChoice !== "" ? (
                    <li>{currentCharacter.languageChoice}</li>
                ) : null}
            </ul>
        </div>
    );
}
