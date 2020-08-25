export const defaultValues = {
    currentCharacter: {
        name: "",
        level: "",
        race: "",
        job: "",
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intellgence: 10,
        wisdom: 10,
        charisma: 10,
        items: [
            {
                name: "potato armor",
                isEquipped: false,
                equipment_category: {
                    name: "Armor",
                    url: "/api/equipment-categories/armor",
                },
            },
        ],
        profChoice: [],
    },
    isChecked: (classDataParam) =>
        classDataParam.proficiency_choices
            .map((choiceObj, choiceIndex) =>
                choiceObj.from.map(
                    (skill, i) => "proficiencies" + choiceIndex + "-" + i
                )
            )
            .reduce((obj, item) => {
                return { ...obj, [item]: false };
            }, {}),
    allAttributes: [
        { index: "cha", name: "CHA" },
        { index: "con", name: "CON" },
        { index: "dex", name: "DEX" },
        { index: "int", name: "INT" },
        { index: "str", name: "STR" },
        { index: "wis", name: "WIS" },
    ],
    attributeValue: (allAttrs) =>
        allAttrs.reduce((obj, item) => {
            return { ...obj, [item.name]: 10 };
        }, {}),
    specificSpell: {
        name: "Nothingness",
        level: 0,
        range: "0 feet",
        components: ["V", "S", "M"],
        school: { name: "Abyssal" },
        classes: [
            {
                name: "Homunculus",
                url: "/api/classes/wizard",
            },
        ],
        material: "",
        desc: [""],
        duration: "Instantaneous",
        higher_level: [""],
        ritual: false,
        concentration: false,
        casting_time: "50 actions",
    },
    specificEquipment: {
        name: "Birthday suit",
        equipment_category: {
            name: "Armor",
            url: "/api/equipment-categories/armor",
        },
        armor_category: "Light",
        armor_class: {
            base: 10,
            dex_bonus: true,
            max_bonus: null,
        },
        str_minimum: 0,
        stealth_disadvantage: false,
        weight: 0,
        cost: {
            qurantity: 0,
            unit: "gp",
        },
        url: "api/equipment/birthday_suit",
    },
    classData: {
        index: "onion-knight",
        name: "Onion Knight",
        hit_die: 1,
        proficiency_choices: [
            {
                choose: 99,
                type: "proficiencies",
                from: [
                    {
                        url: "/api/proficiencies/skill-animal-handling",
                        name: "Skill: Animal Handling",
                    },
                ],
            },
        ],
        proficiencies: [
            {
                name: "Light armor",
                url: "/api/proficiencies/light-armor",
            },
        ],
        saving_throws: [
            {
                name: "CHA",
                url: "/api/ability-scores/cha",
            },
        ],
        subclasses: [
            {
                url: "/api/subclasses/all",
                name: "All",
            },
        ],
    },
    equipmentCategory: [
        {
            name: "worthless metal",
            url: "api/equipment/shield",
        },
    ],
    raceData: {
        index: "missing-no",
        name: "MissingNo",
        speed: 30,
        ability_bonuses: [
            {
                name: "CON",
                url: "/api/ability-scores/con",
                bonus: 2,
            },
        ],
        alignment: "",
        age: "",
        size: "Medium",
        size_description: "Your size is Medium.",
        starting_proficiencies: [
            {
                url: "/api/proficiencies/404",
                name: "",
            },
        ],
        starting_proficiency_options: {
            choose: 1,
            type: "proficiencies",
            from: [
                {
                    url: "/api/proficiencies/404",
                    name: "",
                },
            ],
        },
        languages: [
            {
                url: "/api/languages/common",
                name: "Common",
            },
        ],
        language_desc: "You can speak, read, and write Common.",
        traits: [
            {
                name: "",
                url: "/api/traits/404",
            },
        ],
        subraces: null,
    },
};

window.defaultValues = defaultValues;
