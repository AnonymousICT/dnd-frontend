import React from "react";

export default function DisplayCharProf({
    currentCharacter,
    characterProficiences,
    getRaceProficiencies,
    characterLanguages,
}) {
    return (
        <div>
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
