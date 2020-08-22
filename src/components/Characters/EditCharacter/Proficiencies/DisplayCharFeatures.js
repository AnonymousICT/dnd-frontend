import React from "react";

export default function DisplayCharFeatures({characterLevels}) {
    return (
        <div>
            <h3>Class Features</h3>
            <ul>
                {(characterLevels || []).map((item, i) => {
                    return <li key={i}>{item.name}</li>;
                })}
            </ul>
        </div>
    );
}
