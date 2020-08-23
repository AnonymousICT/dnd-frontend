import React from "react";
import { classLabels } from "../../../Utilities/classLabels";

export default function DisplayClassSpecific({ getClassSpecific }) {
    const overrideFunctions = {
        martial_arts: (ma, key) => (
            <div data-key={key} key={key}>
                Unarmed Strike: {ma.dice_count}d{ma.dice_value}{" "}
            </div>
        ),
        sneak_attack: (sa, key) => (
            <div data-key={key} key={key}>
                Sneak Attack: {sa.dice_count}d{sa.dice_value}{" "}
            </div>
        ),
    };

    const hasOverrideFunction = (key) =>
        Object.keys(overrideFunctions).filter((funcName) => funcName === key)
            .length;

    return (
        <div className="class-specific-info">
            <h3>Class Specific Info</h3>
            <ul>
                {Object.entries(getClassSpecific || {}).map(([key, value]) => (
                    <li key={value +"key"}>
                        {classLabels[key] || key}:{" "}
                        {typeof value === "object"
                            ? hasOverrideFunction(key)
                                ? overrideFunctions[key](value, key)
                                : value.map((conversionObj) =>
                                      Object.entries(conversionObj).map(
                                          ([objKey, objVal]) => (
                                              <p key={objVal + "key"}>
                                                  {objKey}: {objVal}
                                              </p>
                                          )
                                      )
                                  )
                            : value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
