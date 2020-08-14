import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function CharacterShoppingCart() {
  const history = useHistory();
  const {
    characterItems,
    currentCharacter,
    selectCharacter,
    setCharacterItems,
  } = useContext(Context);

  const removeItem = (index) => {
    setCharacterItems([...characterItems.filter((item, i) => index !== i)]);
  };

  const submitToDb = async (e) => {
    try {
      const updateCharacterItem = {
        items: [...currentCharacter.items, ...characterItems],
      };
      await axios.put(
        `https://dnd-backend-node.herokuapp.com/characters/${selectCharacter}`,
        updateCharacterItem,
        { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }
      );
      history.push(`/character/edit/${selectCharacter}?itemsAdded=true`);
      setCharacterItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = () => {
    console.log(characterItems);
    return characterItems.map((item, i) => (
      <div key={i}>
        <li key={i}>{item.name}</li>
        <button onClick={() => removeItem(i)}>X</button>
      </div>
    ));
  };

  return (
    <div className="character-cart">
      <ul>{characterItems.length === 0 ? "Cart is empty" : renderItem()}</ul>

      <button onClick={submitToDb}>Finalize selection</button>
    </div>
  );
}
