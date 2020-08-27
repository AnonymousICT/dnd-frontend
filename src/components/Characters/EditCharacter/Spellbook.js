import React from "react";

const spellLabels = {
    cantrips_known: "Cantrips known: ",
    spell_slots_level_1: "Spell Slots LV 1: ",
    spell_slots_level_2: "Spell Slots LV 2: ",
    spell_slots_level_3: "Spell Slots LV 3: ",
    spell_slots_level_4: "Spell Slots LV 4: ",
    spell_slots_level_5: "Spell Slots LV 5: ",
    spell_slots_level_6: "Spell Slots LV 6: ",
    spell_slots_level_7: "Spell Slots LV 7: ",
    spell_slots_level_8: "Spell Slots LV 8: ",
    spell_slots_level_9: "Spell Slots LV 9: ",
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
