import React, {useContext} from "react";
import CharacterGrid from "./CharacterGrid/CharacterGrid";
import { Link, useHistory } from "react-router-dom";
import {Context} from '../../context/Context'

export default function Characters() {
  const {userData} = useContext(Context)
  const history = useHistory();

  if ((!userData.user || {auth: null}).auth) {
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
