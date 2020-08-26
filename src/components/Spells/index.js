import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { defaultValues } from "../../context/DefaultValues";
import AllSpells from "./AllSpells";
import SpecificSpell from "./SpecificSpell";
import AddToSpellbook from "./AddToSpellbook";
import SelectSpellcaster from "./SelectSpellcaster";
import Modal from "../Utilities/Modal/Modal";
import "./spells.scss";

export default function Spells() {
    const { selectCharacter, allCharacters } = useContext(Context);

    const [showModal, setShowModal] = useState(false);
    const [spellCart, setSpellCart] = useState([]);
    const [specificSpell, setSpecificSpell] = useState(
        defaultValues.specificSpell
    );
    const closeModal = () => {
        setShowModal(false);
    };
    const auth = localStorage.getItem("x-auth-token");
    return (
        <div className="spells">
            {!auth ? null : (
                <div className="cart">
                    <SelectSpellcaster />
                    <AddToSpellbook
                        spellCart={spellCart}
                        setSpellCart={setSpellCart}
                    />
                </div>
            )}
            <AllSpells
                setShowModal={setShowModal}
                setSpecificSpell={setSpecificSpell}
                selectCharacter={selectCharacter}
                allCharacters={allCharacters}
            />
            <Modal showModal={showModal} closeModal={closeModal}>
                <SpecificSpell
                    spellCart={spellCart}
                    setSpellCart={setSpellCart}
                    closeModal={closeModal}
                    specificSpell={specificSpell}
                />
            </Modal>
        </div>
    );
}
