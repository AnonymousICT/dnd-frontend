import React, { useState, useEffect, useContext } from "react";
import AllEquipment from "./AllEquipment";
import SelectCharacter from "../Characters/SelectCharacter";
import CharacterShoppingCart from "./CharacterShoppingCart";
import SpecificEquipment from "./SpecificEquipment";
import Modal from "../Utilities/Modal/Modal";
import { Context } from "../../context/Context";
import { defaultValues } from "../../context/DefaultValues";
import {
    fetchEquipmentData,
    fetchEquipmentCategories,
    fetchEquipmentCategory,
    fetchSpecificEquipment,
} from "../../api/EquipmentAPI";

import "./equipment.scss";

export default function Equipment() {
    const { currentCharacter } = useContext(Context);
    const [equipmentSelection, setEquipmentSelection] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [allEquipment, setAllEquipment] = useState([]);
    const [equipmentCategories, setEquipmentCategories] = useState([]);
    const [specificEquipmentSelection,setSpecificEquipmentSelection] = useState("");
    const [equipmentCategory, setEquipmentCategory] = useState(
        defaultValues.equipmentCategory
    );

    const [specificEquipment, setSpecificEquipment] = useState(
        defaultValues.specificEquipment
    );
    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchedAllEquipment = async () => {
            setAllEquipment(await fetchEquipmentData());
        };
        fetchedAllEquipment();
    }, []);

    useEffect(() => {
        const fetchedEquipmentCategories = async () => {
            setEquipmentCategories(await fetchEquipmentCategories());
        };
        fetchedEquipmentCategories();
    }, []);

    useEffect(() => {
        const fetchedEquipmentCategory = async () => {
            setEquipmentCategory(
                await fetchEquipmentCategory(equipmentSelection)
            );
        };
        fetchedEquipmentCategory(equipmentSelection);
    }, [equipmentSelection]);

    useEffect(() => {
        const fetchedSpecificEquipment = async () => {
            setSpecificEquipment(
                await fetchSpecificEquipment(specificEquipmentSelection)
            );
        };
        fetchedSpecificEquipment(specificEquipmentSelection);
    }, [specificEquipmentSelection]);

    return (
        <div>
            <div className="cart">
                <div>
                    <SelectCharacter />
                    {currentCharacter ? <CharacterShoppingCart /> : null}
                </div>
            </div>
            <AllEquipment
                setShowModal={setShowModal}
                allEquipment={allEquipment}
                equipmentCategories={equipmentCategories}
                setEquipmentSelection={setEquipmentSelection}
                equipmentCategory={equipmentCategory}
                setSpecificEquipmentSelection={setSpecificEquipmentSelection}
            />
            <Modal showModal={showModal} closeModal={closeModal}>
                <SpecificEquipment
                    closeModal={closeModal}
                    specificEquipment={specificEquipment}
                />
            </Modal>
        </div>
    );
}
