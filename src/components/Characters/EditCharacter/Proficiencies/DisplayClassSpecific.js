import React from "react";
import { classLabels } from "../../../Utilities/classLabels";

const overrideFunctions = {
    martial_arts: (ma, key) => (
        <div data-key={key} key={key}>
            Unarmed Strike: {ma.dice_count}d{ma.dice_value}{" "}
        </div>
    ),
    sneak_attack: (sa, key) => (
        <div data-key={key} key={key}>
            {sa.dice_count}d{sa.dice_value}{" "}
        </div>
    ),
};

const hasOverrideFunction = (key) => {
    return overrideFunctions.hasOwnProperty(key);
};
export default function DisplayClassSpecific({
    currentCharacter,
    getClassSpecific,
}) {
    const JobInfo = (value) => {
        if (currentCharacter.job === "Sorcerer") {
            return (
                <ul>
                    <li>Level 1 Spell Slot: 2 Sorc Points</li>
                    <li>Level 2 Spell Slot: 3 Sorc Points</li>
                    <li>Level 3 Spell Slot: 5 Sorc Points</li>
                    <li>Level 4 Spell Slot: 6 Sorc Points</li>
                    <li>Level 5 Spell Slot: 7 Sorc Points</li>
                </ul>
            );
        }
    };
    return (
        <div className="class-specific-info">
            <h3>Class Specific Info</h3>
            <ul>
                {Object.entries(getClassSpecific || {}).map(([key, value]) => (
                    <li key={key + value + "key"}>
                        {classLabels[key] || key}:{" "}
                        {typeof value === "object"
                            ? hasOverrideFunction(key)
                                ? overrideFunctions[key](value, key)
                                : Array.isArray(value)
                                ? JobInfo(currentCharacter)
                                : null
                            : value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
// value.map((conversionObj) =>
//                                       Object.entries(conversionObj).map(
//                                           ([objKey, objVal]) =>
//                                               `${classLabels[objKey] || objKey}: ${objVal}`
//                                       )
//                                   )
