import React, { useState, useEffect } from "react";

export default function NameLevelInput({
  setNewCharacter,
  setValid,
}) {
  const [characterName, setCharacterName] = useState("");
  const [characterLevel, setCharacterLevel] = useState(1);

  useEffect(() => {
    setValid(characterName.length > 0);
  }, [characterName, setValid]);

  useEffect(() => {
    setNewCharacter(previousState => {
      return {...previousState, name: characterName, level: +characterLevel}
    });
  }, [characterName, characterLevel, setNewCharacter]);

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
