import React, { useContext } from "react";
import { Context } from "../../../context/Context";

export default function NameLevelInput() {
  const {
    characterName,
    setCharacterName,
    characterLevel,
    setCharacterLevel,
  } = useContext(Context);

  return (
    <div className="character-name">
      <label>Name</label>
      <input
        type="string"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Character Name"
      />
      <label>Level</label>
      <input
        type="number"
        value={characterLevel}
        onChange={(e) => setCharacterLevel(e.target.value)}
        placeholder="level 1"
        min="1"
        max="20"
      />
    </div>
  );
}
