import React from "react";
import CharacterGrid from "./CharacterGrid/CharacterGrid";
import { Link, useHistory } from "react-router-dom";

export default function Characters() {
  const history = useHistory();

  if (!localStorage.getItem("x-auth-token")) {
    history.push("/login");
    return null;
  }

  return (
    <div className="characters">
      <Link to="/createCharacter">Create a new character</Link>
      <CharacterGrid />
    </div>
  );
}
