import React from 'react'

export default function DisplayCharTraits({currentCharacter, characterTraits}) {
    return (
        <div>
            <ul>
                {characterTraits()}
                {currentCharacter.traitChoice !== "" ? (
                    <li>{currentCharacter.traitChoice}</li>
                ) : null}
            </ul>
        </div>
    )
}
