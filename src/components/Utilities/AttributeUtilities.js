export const modMath = (score) => {
    return Math.round((score - 1) / 2 - 4.9);
};

const attributeSort = {
    STR: { sortOrder: 0, translation: "strength" },
    DEX: { sortOrder: 1, translation: "dexterity" },
    CON: { sortOrder: 2, translation: "constitution" },
    INT: { sortOrder: 3, translation: "intelligence" },
    WIS: { sortOrder: 4, translation: "wisdom" },
    CHA: { sortOrder: 5, translation: "charisma" },
    strength: { sortOrder: 0, translation: "STR" },
    dexterity: { sortOrder: 1, translation: "DEX" },
    constitution: { sortOrder: 2, translation: "CON" },
    intelligence: { sortOrder: 3, translation: "INT" },
    wisdom: { sortOrder: 4, translation: "WIS" },
    charisma: { sortOrder: 5, translation: "CHA" },
    [undefined]: { sortOrder: 99, translation: "strength" },
};

export const sortFunction = (a, b) =>
    attributeSort[a[0]].sortOrder - attributeSort[b[0]].sortOrder;

export const racialBonus = (name, raceData) => {
    return raceData
        ? (
              raceData.ability_bonuses.filter(
                  (bonus) => bonus.name === name
              )[0] || { bonus: 0 }
          ).bonus
        : 0;
};

export const combineAttributeAndRacialBonus = (
    attributeName,
    raceData,
    attributeValues
) => {
    return (
        attributeValues[attributeName] +
        racialBonus(attributeName, raceData)
    );
};
