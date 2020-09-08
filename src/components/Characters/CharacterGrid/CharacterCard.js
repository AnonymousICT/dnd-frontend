import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./characterCard.scss";

export default function CharacterCard({ character }) {
  const { setCurrentCharacter } = useContext(Context);
  const history = useHistory();

  const handleRedirect = (char) => {
    setCurrentCharacter(char);
    history.push(`/character/edit/${char._id}`);
  };

  return (
    <div
      className={"character-card " + character.job.toLowerCase()}
      onClick={() => handleRedirect(character)}
    >
      <h2>{character.name}</h2>
      <p>
        Level {character.level} <span className="race">{character.race}</span>{" "}
        <span className="class">{character.job}</span>
      </p>
    </div>
  );
}
