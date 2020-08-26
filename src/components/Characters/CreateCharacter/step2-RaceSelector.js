import React, { useState, useEffect } from "react";
import { fetchRaceData, fetchSpecificRace } from "../../../api/RaceAPI";
import { defaultValues } from "../../../context/DefaultValues";

export default function RaceSelector({ setNewCharacter, setValid }) {
    const [characterRace, setCharacterRace] = useState("");
    const [selectedProficiency, setSelectedProficiency] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedTrait, setSelectedTrait] = useState("");
    const [allRaces, setAllRaces] = useState([]);
    const [raceData, setRaceData] = useState(defaultValues.raceData);

    useEffect(() => {
        const fetchedRaceData = async () => {
            setAllRaces(await fetchRaceData());
        };
        fetchedRaceData();
    }, []);

    useEffect(() => {
        const fetchedSpecificRace = async () => {
            setRaceData(await fetchSpecificRace(characterRace));
        };
        fetchedSpecificRace();
    }, [characterRace]);

    const {
        name,
        speed,
        ability_bonuses,
        alignment,
        age,
        size,
        size_description,
        starting_proficiencies,
        starting_proficiency_options,
        languages,
        language_desc,
        language_options,
        traits,
        trait_options,
        subraces,
    } = raceData;

    useEffect(() => {
        setSelectedLanguage("");
        setSelectedTrait("");
    }, [characterRace, setSelectedLanguage, setSelectedTrait]);

    useEffect(() => {
        setNewCharacter((previousState) => {
            return {
                ...previousState,
                race: raceData.name,
                raceProfChoice: selectedProficiency,
                languageChoice: selectedLanguage,
                traitChoice: selectedTrait,
                speed: raceData.speed,
                raceData: raceData,
            };
        });
    }, [
        raceData,
        selectedTrait,
        selectedLanguage,
        selectedProficiency,
        setNewCharacter,
    ]);

    useEffect(() => {
        setValid(characterRace.length > 0);
    }, [characterRace, setValid]);

    return (
        <div className="select-race-container">
            <h3>Choose your character's race</h3>
            <select
                required
                value={characterRace}
                onChange={(e) => setCharacterRace(e.target.value)}
            >
                <option key="noOp" value="">
                    -----
                </option>
                {allRaces.map((index) => (
                    <option key={index[0]} value={index[1]}>
                        {index[0]}
                    </option>
                ))}
            </select>

            <div className="race-info-container">
                {!name ? null : (
                    <section className="race-info">
                        <h1>{name}</h1>
                        <p>Speed: {speed}</p>
                        {ability_bonuses.map((ability) => (
                            <p
                                key={ability.name}
                                value={ability.name + ": " + ability.bonus}
                            >
                                {ability.name} + {ability.bonus}
                            </p>
                        ))}
                        <p>{alignment}</p>
                        <p>{age}</p>
                        <p>
                            {size}: {size_description}
                        </p>
                        <h3>Starting Proficiencies</h3>
                        {starting_proficiencies.map((item, i) => (
                            <p key={i}>{item.name.replace("Skill: ", "")}</p>
                        ))}
                        {!starting_proficiency_options ? null : (
                            <div className="proficiency-options">
                                {starting_proficiency_options.from.map(
                                    (option, proficiencyIndex) => {
                                        return (
                                            <div key={proficiencyIndex}>
                                                <input
                                                    type="radio"
                                                    className="radio-choice"
                                                    name="proficiency-group"
                                                    onChange={(e) =>
                                                        setSelectedProficiency(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={option.name}
                                                    key={proficiencyIndex}
                                                />
                                                <label
                                                    className="radio-label"
                                                    key={proficiencyIndex +"-label"}
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}
                        <p>{language_desc}</p>
                        {languages.map((language, i) => (
                            <p key={i}>{language.name}</p>
                        ))}
                        {!language_options ? null : (
                            <div className="language-options">
                                {language_options.from.map(
                                    (option, languageIndex) => {
                                        return (
                                            <div key={languageIndex}>
                                                <input
                                                    type="radio"
                                                    className="radio-choice"
                                                    name="language-group"
                                                    onChange={(e) =>
                                                        setSelectedLanguage(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={option.name}
                                                    key={languageIndex}
                                                />
                                                <label
                                                    key={
                                                        languageIndex + "-label"
                                                    }
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}

                        <h3>Traits</h3>
                        {traits.map((trait, i) => (
                            <p key={i}>{trait.name}</p>
                        ))}
                        {!trait_options ? null : (
                            <div className="trait options">
                                {trait_options.from.map(
                                    (option, traitIndex) => {
                                        return (
                                            <div key={traitIndex}>
                                                <input
                                                    type="radio"
                                                    className="radio-choice"
                                                    name="trait-group"
                                                    onChange={(e) =>
                                                        setSelectedTrait(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={option.name}
                                                    key={traitIndex}
                                                />
                                                <label
                                                    key={traitIndex + "-label"}
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}

                        {!subraces || subraces.length === 0 ? null : (
                            <div>
                                <h3>Available Sub-races</h3>
                                {subraces.map((index) => index.name)}
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
