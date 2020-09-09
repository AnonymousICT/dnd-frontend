import React, { useContext } from "react";
import CharacterGrid from "./CharacterGrid/CharacterGrid";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import Button from "@material-ui/core/Button";

export default function Characters() {
	const { userData } = useContext(Context);
	const history = useHistory();
	const authToken = localStorage.getItem("x-auth-token");

	if ((!userData.user || !authToken || { auth: null }).auth) {
		history.push("/login");
		return null;
	}

	const handleNewCharacter = () => {
		history.push("/createCharacter")
	};

	return (
		<div className="characters">
			<Button
				className="newCharacter-btn"
				variant="contained"
				onClick={handleNewCharacter}
				color="secondary"
			>
				Create a new character
			</Button>
			<CharacterGrid />
		</div>
	);
}
