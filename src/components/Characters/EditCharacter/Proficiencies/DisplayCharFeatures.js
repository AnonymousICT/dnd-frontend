import React from "react";

export default function DisplayCharFeatures({ characterLevels }) {
    return (
        <div>
            <h3>Class Features</h3>
            <ul>
                {(characterLevels || []).map((item, i) => {
                    if (
                        item.name === "Ability Score Improvement 1" ||
                        item.name === "Ability Score Improvement 2" ||
                        item.name === "Ability Score Improvement 3" ||
                        item.name === "Ability Score Improvement 4" ||
                        item.name === "Ability Score Improvement 5" ||
                        item.name === "Ability Score Improvement 6" 
                        ||
                        item.name === "Wild Shape (CR 1/4 or below, no flying or swim speed)"
                        ||
                        item.name === "Wild Shape (CR 1/2 or below, no flying speed)"
                        ||
                        item.name === "Wild Shape (CR 1 or below)"||
                        item.name === "Draconic Resilience"||
                        item.name === "Elemental Affinity" ||
                        item.name === "Dragon Wings"||
                        item.name === "Draconic Presence"
                    ) {
                        return null;
                    } else return <li key={i}>{item.name}</li>;
                })}
            </ul>
        </div>
    );
}
