import React, { useState, useEffect, createContext } from 'react'
import {
    fetchSpellData, fetchSpecificSpell,
    fetchClassData, fetchSpecificClass,
    fetchRaceData, fetchSpecificRace,
    fetchAbilityScores, fetchAbilityScoreDesc,
    fetchClassLeveling, fetchUsersCharacters
} from '../api'
const Context = createContext()

function ContextProvider({ children }) {
    const defaultValues = {
        isChecked: (classDataParam) => classDataParam
            .proficiency_choices.map((choiceObj, choiceIndex) =>
                choiceObj.from.map((skill, i) => "proficiencies" + choiceIndex + "-" + i))
            .reduce((obj, item) => { return { ...obj, [item]: false }; },
                {}),
        allAttributes: [
            { "index": "cha", "name": "CHA" },
            { "index": "con", "name": "CON" },
            { "index": "dex", "name": "DEX" },
            { "index": "int", "name": "INT" },
            { "index": "str", "name": "STR" },
            { "index": "wis", "name": "WIS" }
        ],
        attributeValue: (allAttrs) => allAttrs.reduce((obj, item) => { return { ...obj, [item.name]: 10 }; }, {}),
        specificSpell: {
            name: "Nothingness",
            level: 0,
            range: "0 feet",
            components: ["V", "S", "M"],
            school: { name: "Abyssal" },
            classes: [{
                "name": "Homunculus",
                "url": "/api/classes/wizard"
            }],
            material: "",
            desc: [""],
            duration: "Instantaneous",
            higher_level: [""],
            ritual: false,
            concentration: false,
            casting_time: "50 actions"
        },
        classData: {
            index: "onion-knight",
            name: "Onion Knight",
            hit_die: 1,
            proficiency_choices: [
                {
                    choose: 1,
                    type: "proficiencies",
                    from: [
                        {
                            "url": "/api/proficiencies/skill-animal-handling",
                            "name": "Skill: Animal Handling"
                        }
                    ]
                }
            ],
            proficiencies: [
                {
                    name: "Light armor",
                    url: "/api/proficiencies/light-armor"
                }
            ],
            saving_throws: [
                {
                    name: "CHA",
                    url: "/api/ability-scores/cha"
                }
            ],
            subclasses: [
                {
                    url: "/api/subclasses/all",
                    name: "All"
                }
            ]
        },
        raceData: {
            index: "missing-no",
            name: "MissingNo",
            speed: 30,
            ability_bonuses: [
                {
                    name: "CON",
                    url: "/api/ability-scores/con",
                    bonus: 2
                }
            ],
            alignment: "",
            age: "",
            size: "Medium",
            size_description: "Your size is Medium.",
            starting_proficiencies: [
                {
                    url: "/api/proficiencies/404",
                    name: ""
                }
            ],
            starting_proficiency_options: {
                choose: 1,
                type: "proficiencies",
                from: [
                    {
                        "url": "/api/proficiencies/404",
                        "name": ""
                    }
                ]
            },
            languages: [
                {
                    "url": "/api/languages/common",
                    "name": "Common"
                }
            ],
            language_desc: "You can speak, read, and write Common.",
            traits: [
                {
                    "name": "",
                    "url": "/api/traits/404"
                }
            ],
            subraces: null
        }
    }

    window.defaultValues = defaultValues;

    // all data state
    const [allSpells, setAllSpells] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [allRaces, setAllRaces] = useState([])
    const [allCharacters, setAllCharacters] = useState([])
    const [allAttributes, setAttributes] = useState(defaultValues.allAttributes)

    // specific data return
    const [specificSpell, setSpecificSpell] = useState(defaultValues.specificSpell)
    const [classData, setClassData] = useState(defaultValues.classData)
    const [classLevels, setClassLevels] = useState([])
    const [raceData, setRaceData] = useState(defaultValues.raceData)
    const [AttributeData, setAttributeData] = useState([])

    // user auth state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    // user's choice state
    const [characterName, setCharacterName] = useState('')
    const [characterLevel, setCharacterLevel] = useState(1)
    const [characterClass, setCharacterClass] = useState('')
    const [characterRace, setCharacterRace] = useState('')
    const [selectedSpell, setSelectedSpell] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [selectedTrait, setSelectedTrait] = useState('')
    const [hoveredAttribute, setHoveredAttribute] = useState('')

    const [characterId, setCharacterId] = useState('')
    const [isChecked, setIsChecked] = useState(defaultValues.isChecked(defaultValues.classData))

    const [attributeValue, setAttributeValue] = useState(defaultValues.attributeValue(allAttributes))

    //attribute-entry methods
    const attributeSort = {
        STR: 0,
        DEX: 1,
        CON: 2,
        INT: 3,
        WIS: 4,
        CHA: 5,
    }
    const sortFunction = (a, b) => attributeSort[a[0]] - attributeSort[b[0]]

    const handleAttributeValueChange = (e) => {
        setAttributeValue({ ...attributeValue, [e.target.name]: +e.target.value });
    }

    const { ability_bonuses } = raceData
    window.ability_bonuses = ability_bonuses;

    //copy an object to another variable without the references
    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

    const racialBonus = (name) => ((ability_bonuses || defaultValues.raceData.ability_bonuses).filter(bonus => bonus.name === name)[0] || { bonus: 0 }).bonus

    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));

    const displayAttributeModifer = (attributeTotal) => {
        return Math.round((attributeTotal - 1) / 2 - 4.9)
    }

    //fetches every spell
    useEffect(() => {
        const fetchedAllSpells = async () => {
            setAllSpells(await fetchSpellData())
        }
        fetchedAllSpells()
    }, [])

    //fetches a specific spell
    useEffect(() => {
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(selectedSpell))
        }
        fetchedSpecificSpellData(selectedSpell)
    }, [selectedSpell])

    // fetch all classses
    useEffect(() => {
        const fetchedAllClasses = async () => {
            setAllClasses(await fetchClassData())
        }
        fetchedAllClasses()
    }, [])

    //fetch specificClass
    useEffect(() => {
        const fetchedSpecificClassData = async () => {
            setClassData(await fetchSpecificClass(characterClass))
        }
        fetchedSpecificClassData()
    }, [characterClass])

    //fetch the specificClass' leveling
    useEffect(() => {
        const fetchedLevelsData = async () => {
            setClassLevels(await fetchClassLeveling(characterClass))
        }
        fetchedLevelsData()
    }, [characterClass])

    // fetch all races
    useEffect(() => {
        const fetchedRaceData = async () => {
            setAllRaces(await fetchRaceData())
        }
        fetchedRaceData()
    }, [])

    // fetch a specific Race
    useEffect(() => {
        const fetchedSpecificRace = async () => {
            setRaceData(await fetchSpecificRace(characterRace))
        }
        fetchedSpecificRace()
    }, [characterRace])

    //fetch all attribute scores
    useEffect(() => {
        const fetchedData = async () => {
            setAttributes(await fetchAbilityScores())
        }
        fetchedData()
    }, [])

    //fetch attribute score desc
    useEffect(() => {
        const fetchedData = async () => {
            setAttributeData(await fetchAbilityScoreDesc(hoveredAttribute))
        }
        fetchedData()
    }, [hoveredAttribute])


    //fetch all user's characters
    useEffect(()=>{
        const fetchedCharacters = async () => {
            setAllCharacters(await fetchUsersCharacters())
        }
        fetchedCharacters()
    },[])

    

    return (
        <Context.Provider value={{
            allSpells,
            specificSpell,
            selectedSpell, setSelectedSpell,
            allClasses, setAllClasses,

            email, setEmail,
            password, setPassword,
            userData, setUserData,

            characterName, setCharacterName,
            characterLevel, setCharacterLevel,
            characterClass, setCharacterClass,
            classData, setClassData,
            allRaces, setAllRaces,
            raceData, setRaceData,
            characterRace, setCharacterRace,
            selectedLanguage, setSelectedLanguage,
            selectedTrait, setSelectedTrait,
            allAttributes, setAttributes,
            AttributeData, setAttributeData,
            classLevels,
            hoveredAttribute, setHoveredAttribute,
            isChecked, setIsChecked,
            characterId, setCharacterId,
            allCharacters,
            racialBonus,

            attributeValue, setAttributeValue,
            attributeSort,
            sortFunction,
            handleAttributeValueChange,
            displayAttributeModifer,
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }