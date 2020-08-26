import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BasicInfo({ currentCharacter, setCurrentCharacter }) {
    const { name, race, level, job, _id } = currentCharacter;

    const [newLevel, setNewLevel] = useState(+level);

    const incrementLevel = () => {
        if (level < 20) {
            setNewLevel(level + 1);
        }
    };

    const decrementLevel = () => {
        if (level > 1) {
            setNewLevel(level - 1);
        }
    };

    useEffect(() => {
        setNewLevel(level);
    }, [level]);

    useEffect(() => {
        if (newLevel && newLevel > 0) {
            const submitNewLevelToDb = async () => {
                try {
                    const updateCharacterLevel = {
                        level: newLevel,
                    };
                    await axios.put(
                        `https://dnd-backend-node.herokuapp.com/characters/${_id}`,
                        updateCharacterLevel,
                        {
                            headers: {
                                "x-auth-token": localStorage.getItem(
                                    "x-auth-token"
                                ),
                            },
                        }
                    );
                    setCurrentCharacter((previousState) => {
                        return { ...previousState, level: newLevel };
                    });
                } catch (err) {
                    console.error(err);
                }
            };
            submitNewLevelToDb();
        }
    }, [_id, newLevel, setCurrentCharacter]);

    return (
        <div className="basic-info">
            <h1>{name}</h1>
            <h2>
                Level {level} <span>{race} </span> {job}
            </h2>
            <button onClick={(e) => decrementLevel()}>
                <i className="fas fa-arrow-down"></i>
            </button>
            <span>Manage Character Level</span>
            <button onClick={(e) => incrementLevel()}>
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
}
