import React, { useState } from "react";
import { defaultValues } from "../../context/DefaultValues";
import AllSpells from "./AllSpells";
import SpecificSpell from "./SpecificSpell";
import AddToSpellbook from "./AddToSpellbook";
import SelectSpellcaster from "./SelectSpellcaster";
import Modal from "../Utilities/Modal/Modal";
import "./spells.scss";

export default function Spells() {
    const [showModal, setShowModal] = useState(false);
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
                    <AddToSpellbook />
                </div>
            )}
            <AllSpells
                setShowModal={setShowModal}
                setSpecificSpell={setSpecificSpell}
            />
            <Modal showModal={showModal} closeModal={closeModal}>
                <SpecificSpell
                    closeModal={closeModal}
                    specificSpell={specificSpell}
                />
            </Modal>
        </div>
    );
}
