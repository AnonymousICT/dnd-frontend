import React from "react";
import lodash from "lodash";
import { validCells } from "./validCells";

export const renderClassLevel = (obj, key) => {
  if (!validCells.filter((cell) => cell.key === key).length) {
    return null;
  }

  if (
    obj === undefined ||
    obj === null ||
    (typeof obj === "object" && lodash.isEmpty(obj))
  ) {
    return <span data-cell-name={key}> </span>;
  }

  let renderString = "";
  const classLabels = {
    rage_count: "Rage Count",
    rage_damage_bonus: "Rage Damage Bonus",
    brutal_critical_dice: "Brutal Critical Dice",
    bardic_inspiration_die: "Bardic Inspiration: 1d",
    song_of_rest_die: "Song of Rest: 1d",
    magical_secrets_max_5: "Magical Secrets - max spell level 5",
    magical_secrets_max_7: "Magical Secrets - max spell level 7",
    magical_secrets_max_9: "Magical Secrets - max spell level 9",
    cantrips_known: "Cantrips known",
    spells_known: "Spells known",
    spell_slots_level_1: "Level 1 spell slots",
    spell_slots_level_2: "Level 2 spell slots",
    spell_slots_level_3: "Level 3 spell slots",
    spell_slots_level_4: "Level 4 spell slots",
    spell_slots_level_5: "Level 5 spell slots",
    spell_slots_level_6: "Level 6 spell slots",
    spell_slots_level_7: "Level 7 spell slots",
    spell_slots_level_8: "Level 8 spell slots",
    spell_slots_level_9: "Level 9 spell slots",
    channel_divinity_charges: "Channel Divinity charges",
    destroy_undead_cr: "Destroy Undead(Cr)",
    wild_shape_max_cr: "Wild Shape (CR)",
    wild_shape_swim: "Wild Shape Swim",
    wild_shape_fly: "Wild Shape Fly",
    action_surges: "Action Surges",
    indomitable_uses: "Indomitable Uses",
    extra_attacks: "Extra Attacks",
    ki_points: "Ki Points",
    unarmored_movement: "Unarmored Movement bonus speed",
    aura_range: "Aura Range (ft)",
    favored_enemies: "Favored Enemies",
    favored_terrain: "Favored Terrain",
    sorcery_points: "Sorcery Points",
    metamagic_known: "Metamagic known",
    spell_slot_level: "spell slot level",
    sorcery_point_cost: "Sorcery Point, cost",
    invocations_known: "Invocations Known",
    mystic_arcanum_level_6: "Mystic Arcanum spell level 6",
    mystic_arcanum_level_7: "Mystic Arcanum spell level 7",
    mystic_arcanum_level_8: "Mystic Arcanum spell level 8",
    mystic_arcanum_level_9: "Mystic Arcanum spell level 9",
    arcane_recovery_levels: "Arcane Recovery Levels",
  };

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

  const renderSubItem = (childObj, key) => (
    <div data-key={key} key={key}>
      {classLabels[key] || key}: {childObj[key]}
    </div>
  )
  
  const hasOverrideFunction = (key) =>
    Object.keys(overrideFunctions).filter((funcName) => funcName === key)
      .length;
  
  //childObj is the node we're looking at
  const renderNestedObject = (childObj) => {
    //we're looking for either martial arts or sneak attack
    //convert the childobj into an array of its keys and then we map over it
    return Object.keys(childObj).map((key) =>
      //we're evaluating the key to see if it's an object
      typeof childObj[key] === "object" ? (
        //is it either martial arts or sneak attack?
        hasOverrideFunction(key) ? (
          //if it is MA or SA do the override function else start over from the top using the key of the childObj
          overrideFunctions[key](childObj[key], key)
        ) : (
          renderNestedObject(childObj[key])
        )
      ) : (
        //otherwise it's a literal and can be easily rendered. aka it's chill dude
        renderSubItem(childObj, key)
      )
    );
  };

  const reduceByKey = (obj, key, value) => {
    return obj ? obj
      .reduce((features, item) => {
        return item[key]
          ? [...features, item[key]]
          : Array.isArray(item)
          ? [...features, ...item]
          : features;
      }, [])
      .map((f) => (value ? f[value] : f))
      : null;
  };

  switch (key) {
    case "subclass":
      renderString = (
        <span data-key="subclass">
          {[ ...new Set(reduceByKey(obj, key, "name"))].join(", ")}
        </span>
      );
      break;
    case "level":
      renderString = <h3 data-key="level">
          {[ ...new Set(reduceByKey(obj, key))].join(", ")}
        </h3>;
      break;
    case "ability_score_bonuses":
      renderString = (
        <span data-key="ability_score_bonuses">
          {[ ...new Set(reduceByKey(obj, key))].join(", ")}
        </span>
      );
      break;
    case "features":
      renderString = (
        <span data-key="features">
          {reduceByKey(reduceByKey(obj, key), key, "name").join(", ")}
        </span>
      );
      break;
    case "feature_choices":
      renderString = (
        <span data-key="feature choices">
          {reduceByKey(reduceByKey(obj, key), key, "name").join(", ")}
        </span>
      );
      break;
    case "class_specific":
      renderString = <span data-cell-name={key}> </span>;
      renderString = (
        <span data-key={key}>
          {renderNestedObject([ ...new Set(reduceByKey(obj, key))][0])}
        </span>
      );
      break;
    case "prof_bonus":
      renderString = <span data-key="prof_bonus">{[ ...new Set(reduceByKey(obj, key))].join(", ")}</span>;
      break;
    case "spellcasting":
      renderString = <span data-cell-name={key}> </span>; // <span data-key={key}>{renderNestedObject(obj)}</span>;
      break;
    default:
      renderString = <span data-key={key}>{JSON.stringify(obj)}</span>;
  }

  return renderString;
};
