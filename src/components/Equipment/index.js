import React, { useState, useContext } from "react";
import AllEquipment from "./AllEquipment";
import SelectCharacter from "../Characters/SelectCharacter";
import CharacterShoppingCart from "./CharacterShoppingCart";
import SpecificEquipment from "./SpecificEquipment";
import Modal from "../Utilities/Modal/Modal"
import { Context } from "../../context/Context";

import "./equipment.scss";

export default function Equipment() {
  const {
    currentCharacter,
  } = useContext(Context);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="cart">
        <div>
          <SelectCharacter />
          {currentCharacter ? <CharacterShoppingCart /> : null }
        </div>
      </div>
      <AllEquipment setShowModal={setShowModal} />
      <Modal showModal={showModal} closeModal={closeModal}>
        <SpecificEquipment closeModal={closeModal} />
      </Modal>
    </div>
  );
}
