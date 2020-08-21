import React from "react";

export default function BasicInfo({ currentCharacter }) {
    const { name, level, race, job } = currentCharacter;

    return (
        <div className="basic-info">
            <h1>{name}</h1>
            <h2>
                Level {level} <span>{race} </span> {job}
            </h2>
        </div>
    );
}
