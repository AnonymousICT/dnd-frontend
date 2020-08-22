import React from "react";

export default function DisplayCharTraits({
    currentCharacter,
    characterTraits,
}) {
    return (
        <div>
            <ul>
                <h3>Character Traits</h3>
                {characterTraits()}
                {currentCharacter.traitChoice !== "" ? (
                    <li>{currentCharacter.traitChoice}</li>
                ) : null}
            </ul>
        </div>
    );
}
