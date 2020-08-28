import React, { useState, useEffect } from "react";
import { modMath } from "../../Utilities/AttributeUtilities";
import axios from "axios";
import DebounceInput from "react-debounce-input";
import { Checkbox } from "@material-ui/core";

export default function BattleStats({ currentCharacter, setCurrentCharacter }) {
    const [currentHitPoints, setCurrentHitPoints] = useState(0);
    const { dexterity, constitution, level, wisdom, job } = currentCharacter;

    let { currentHP } = currentCharacter;
    useEffect(() => {
        setCurrentHitPoints(currentHP);
    }, [currentHP]);

    const calculateInitialAC = () => {
        switch (job.toLowerCase()) {
            case "monk":
                return modMath(dexterity) + modMath(wisdom) + 10;
            case "barbarian":
                return modMath(dexterity) + modMath(constitution) + 10;
            default:
                return modMath(dexterity) + 10;
        }
    };

    const calculateEquippedAC = (character) => {
        let equippedArmor = character.items.filter((item) => item.isEquipped);

        let armorStats = (equippedArmor[0] || { armor_class: null })
            .armor_class;
        if (
            character.items.length === 0 ||
            !equippedArmor ||
            !armorStats ||
            !armorStats.base
        ) {
            return calculateInitialAC();
        } else if (armorStats.dex_bonus) {
            if (!armorStats.max_bonus) {
                return armorStats.base + modMath(dexterity);
            } else {
                if (modMath(dexterity) > armorStats.max_bonus) {
                    return armorStats.base + armorStats.max_bonus;
                } else {
                    return armorStats.base + modMath(dexterity);
                }
            }
        } else {
            return armorStats.base;
        }
    };

    const calculateSpeed = (character, job) => {
        if (job === "Monk" && character.level > 1 && character.level <= 5) {
            return character.speed + 10;
        } else if (job === "Monk" && character.level <= 9) {
            return character.speed + 15;
        } else if (job === "Monk" && character.level <= 13) {
            return character.speed + 20;
        } else if (job === "Monk" && character.level <= 17) {
            return character.speed + 25;
        } else if (job === "Monk" && character.level > 17) {
            return character.speed + 30;
        } else {
            return character.speed;
        }
    };
    const handleCurrentHpChange = (e) => {
        let hpValue = +e.target.value;
        setCurrentCharacter({ ...currentCharacter, currentHP: hpValue });
        submitToDb(hpValue);
    };

    const submitToDb = async (hp) => {
        try {
            const updateCharacterCurrentHP = {
                currentHP: hp,
            };
            await axios.put(
                `/characters/${currentCharacter._id}`,
                updateCharacterCurrentHP,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("x-auth-token"),
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    const averagetHitDie = (hitDie) => {
        return hitDie / 2 + 1;
    };

    const getClassData = (character) => {
        return (
            (currentCharacter && currentCharacter.classData) || { hit_die: 0 }
        );
    };

    const calculateMaxHP = () => {
        return (
            (averagetHitDie(getClassData(currentCharacter).hit_die) +
                modMath(constitution)) *
            level
        );
    };

    return (
        <div className="battle-stats-container">
            <div className="first-row">
                <div className="battle-stat">
                    <p>{calculateEquippedAC(currentCharacter)}</p>
                    <p title="Armor Class">AC</p>
                </div>
                <div className="battle-stat">
                    <p>{modMath(dexterity)}</p>
                    <p title="Initiative Bonus">Initiative</p>
                </div>
                <div className="battle-stat">
                    <p>{calculateSpeed(currentCharacter, job)}ft</p>
                    <p>Speed</p>
                </div>
            </div>
            <div className="second-row">
                <h4>Hit Points</h4>
                <div className="hit-points">
                    <div>
                        <label>Current</label>
                        <DebounceInput
                            type="number"
                            max={calculateMaxHP(currentCharacter) || 0}
                            onChange={handleCurrentHpChange}
                            placeholder="Current Hp"
                            value={currentHitPoints || 0}
                        />
                    </div>
                    <p title="Initial Hit points are calculated by adding your Constitution Modifier and the average hit die value multiplied by your character's level or (HP = Level * (Hit Die average + CON modifier))">
                        Max <span>{calculateMaxHP()}</span>
                    </p>
                </div>
            </div>
            <div className="third row">
                <p>Hit Dice: 1d{getClassData(currentCharacter).hit_die}</p>

                <div className="death-saves">
                    <label title="If you're character's hit points are reduced to 0, you must roll 11 or higher on a d20 to succeed. If you roll a natural 20 you automatically get up with 1 hp">
                        Successful Death Saves
                    </label>
                    <div>
                        <Checkbox />
                        <Checkbox />
                        <Checkbox />
                    </div>
                    <label title="If you're character's hit poitns are reduced to 0 roll a d20. If you roll 10 or below you have failed 1 death save. If you roll a natural 1 you have failed two death saves">
                        Failed Death Saves
                    </label>
                    <div>
                        <Checkbox color="primary"/>
                        <Checkbox color="primary"/>
                        <Checkbox color="primary"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
