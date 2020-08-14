import React, { useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export default function SelectCharacter() {
  const {
    allCharacters,
    selectCharacter,
    setSelectCharacter,
    setCurrentCharacter,
  } = useContext(Context);

  const handleSelection = (e) => {
    setSelectCharacter(e.target.value);
  };

  useEffect(() => {
    setCurrentCharacter(
      allCharacters.find((item) => item._id === selectCharacter)
    );
  }, [allCharacters, selectCharacter, setCurrentCharacter]);

  return (
    <div>
      <select value={selectCharacter} onChange={handleSelection}>
        <option value="NoOp">----</option>
        {allCharacters.map((character, i) => (
          <option data-character={character} value={character._id} key={i}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
}
