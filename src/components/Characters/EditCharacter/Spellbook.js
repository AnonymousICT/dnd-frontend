import React from "react";

const spellLabels = {
    cantrips_known: "Cantrips known: ",
    spell_slots_level_1: "Level 1 spells: ",
    spell_slots_level_2: "Level 2 spells: ",
    spell_slots_level_3: "Level 3 spells: ",
    spell_slots_level_4: "Level 4 spells: ",
    spell_slots_level_5: "Level 5 spells: ",
    spell_slots_level_6: "Level 6 spells: ",
    spell_slots_level_7: "Level 7 spells: ",
    spell_slots_level_8: "Level 8 spells: ",
    spell_slots_level_9: "Level 9 spells: ",
};

export default function Spellbook({ currentCharacter }) {
    const getClassLevels = (character) => {
        return (
            (character &&
                character.classData &&
                character.classData.classlevels) ||
            []
        );
    };

    const getSpellcasting = (character) =>
        getClassLevels(character)
            .filter(
                (classLevel) =>
                    classLevel.level <= character.level && classLevel.spellcasting
            )
            .reverse()[0];

    const characterSpellSlots = (getSpellcasting(currentCharacter) || []).spellcasting;
    const spellsKnown = currentCharacter.spells;

    const renderSpellList = () => {
        return Object.keys(spellLabels).map((spellLabel, i) => (
            <div
                key={i}
                className={
                    (
                        !characterSpellSlots
                            ? 0
                            : characterSpellSlots[spellLabel] || 0
                    )
                        ? null
                        : "disabled"
                }
            >
                <label>
                    {spellLabels[spellLabel]}
                    {!characterSpellSlots
                        ? 0
                        : characterSpellSlots[spellLabel] || 0}
                </label>
                <ul>
                    {(spellsKnown || [])
                        .filter((spell) => spell.level === i)
                        .map((spell, i) => (
                            <li key={i}>{spell.name}</li>
                        ))}
                </ul>
            </div>
        ));
    };

    return (
        <div>
            <h2>Spells</h2>
            <div className="spells-container">{renderSpellList()}</div>
        </div>
    );
}
