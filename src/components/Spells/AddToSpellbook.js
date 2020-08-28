import React,  { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default function AddToSpellbook({spellCart, setSpellCart}) {
    const history = useHistory();
    const {
        currentCharacter,
        updateAllCharacters,
        selectCharacter,
    } = useContext(Context);

    const removeItem = (index) => {
        setSpellCart([
            ...spellCart.filter((spell, i) => index !== i),
        ]);
    };

    const submitSpellsToDb = async (e) => {
        try {
            const updateSpellCart = {
                spells: [...currentCharacter.spells, ...spellCart],
            };
            await axios.put(
                `/characters/${selectCharacter}`,
                updateSpellCart,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("x-auth-token"),
                    },
                }
            );
            updateAllCharacters();
            history.push(`/character/edit/${selectCharacter}?spellsAdded=true`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="character-spellbook">
            <ul>
                {spellCart.length === 0
                    ? "Add some spells to your spellbook"
                    : spellCart.map((spell, i) => (
                          <div className="spell-in-cart" key={i}>
                              <li key={i}>{spell.name}</li>
                              <button onClick={() => removeItem(i)}>X</button>
                          </div>
                      ))}
            </ul>
            <Button
                onClick={submitSpellsToDb}
                variant="contained"
                type="submit"
                color="secondary"
            >
                Add to spellbook
            </Button>
        </div>
    );
}
