import React from 'react'
import lodash from 'lodash'
import {validCells} from './validCells'

export const renderClassLevel = (obj, key) => {

    if(!validCells.filter(cell => cell === key).length) {
        return null;
    }

    if(obj === undefined || obj === null || (typeof obj === 'object' && lodash.isEmpty(obj)) ) {
        return <span data-cell-name={key}> </span>;
    }

    let renderString = ""
    const classLabels = {
        rage_count: "Rage Count",
        rage_damage_bonus: "Rage Damage Bonus",
        brutal_critical_dice: "Brutal Critical Dice"
    };

    
    const overrideFunctions = {
        martial_arts: (ma, key) => <div data-key={key} key={key}>Unarmed Strike: {ma.dice_count}d{ma.dice_value} </div>,
        sneak_attack: (sa, key) => <div data-key={key} key={key}>Sneak Attack: {sa.dice_count}d{sa.dice_value} </div>
    }
    //childObj is the node we're looking at
    const renderNestedObject = (childObj) => {
        //we're looking for either martial arts or sneak attack?
        let hasOverrideFunction = (key) => Object.keys(overrideFunctions).filter(funcName => funcName === key).length;
        //convert the childobj into of its keys and then we map over it
        return Object.keys(childObj).map(key => 
            //key of childObj that we're examining an object? 
            typeof childObj[key] === 'object' ?
                //is it either martial arts or sneak attack?
                hasOverrideFunction(key) ?
                //if it is MA or SA do the thing override function else start over from the top using the key of the childObj
                overrideFunctions[key](childObj[key], key) : renderNestedObject(childObj[key]) 
                //otherwise it's a literal and can be easily rendered. aka it's chill dude
            : <div data-key={key} key={key}>{classLabels[key] || key}: {childObj[key]}</div>
        );
    }
    
    switch (key) {
        case "subclass": renderString = <span data-key="subclass">{obj.name}</span>;
        break;
        case "level": renderString = <h3 data-key="level">{obj}</h3>;
        break;
        case "ability_score_bonuses": renderString = <span data-key="ability_score_bonuses">{obj}</span>;
        break;
        case "features": renderString = <span data-key="features">{obj.map(feature => feature.name).join(", ")}</span>;
        break;
        case "class_specific": renderString= <span data-key={key}>{renderNestedObject(obj)}</span>;
        break;
        case "prof_bonus": renderString = <span data-key="prof_bonus">{obj}</span>;
        break;
        case "spellcasting": renderString=  <span data-key={key}>{renderNestedObject(obj)}</span>;
        break;
        default: renderString= <span data-key={key}>{JSON.stringify(obj)}</span>;
    }
    
    return (
        renderString
    )
}
