import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, IconButton, FormLabel } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function AllItems({ currentCharacter, setCurrentCharacter }) {
    const [isEquipmentChecked, setIsEquipmentChecked] = useState({});
    useEffect(() => {
        if (currentCharacter.items.length > 0) {
            const checkboxes = currentCharacter.items.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.uid]: checkItemRequirements(item, currentCharacter)
                        ? item.isEquipped
                        : false,
                };
            }, {});
            setIsEquipmentChecked(checkboxes);
        }
    }, [currentCharacter]);

    useEffect(() => {
        if (currentCharacter.items.length > 0) {
            const checkboxes = currentCharacter.items.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.uid]: checkItemRequirements(item, currentCharacter)
                        ? item.isEquipped
                        : false,
                };
            }, {});
            setIsEquipmentChecked(checkboxes);
        }
    }, [currentCharacter, currentCharacter.strength]);

    const checkItemRequirements = (item, character) => {
        if (character.strength >= item.str_minimum) {
            return true;
        } else {
            item.isEquipped = false;
            return false;
        }
    };

    const handleEquipped = (e, item) => {
        if (checkItemRequirements(item, currentCharacter)) {
            item.isEquipped = e.target.checked;
            setIsEquipmentChecked({
                ...isEquipmentChecked,
                [item.uid]: e.target.checked,
            });
            let characterItems = currentCharacter.items.map((equipment) =>
                equipment.uid === item.uid ? item : equipment
            );

            setCurrentCharacter({ ...currentCharacter, items: characterItems });

            submitToDb(characterItems);
        } else {
            e.preventDefault();
        }
    };

    const submitToDb = async (items) => {
        try {
            const updateCharacterItem = {
                items: items,
            };
            await axios.put(
                `https://dnd-backend-node.herokuapp.com/characters/${currentCharacter._id}`,
                updateCharacterItem,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("x-auth-token"),
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    const removeItem = (e) => {
        const updatedItems = currentCharacter.items.filter(
            (item) => item.uid !== e
        );
        submitToDb(updatedItems);
        window.location.reload(true);
    };

    const renderEquipped = (item, key) => {
        if (!item) {
            return <li>Missing Item</li>;
        }
        if (item.equipment_category.name === "Armor") {
            return (
                <li key={key} title="check to equip">
                    <IconButton
                        aria-label="delete"
                        value={item.uid}
                        onClick={(e) =>
                            removeItem(e.target.getAttribute("value"))
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                    <FormLabel>{item.name}</FormLabel>
                    <Checkbox
                        value={item.name}
                        checked={isEquipmentChecked[item.uid] || false}
                        onChange={(e) => handleEquipped(e, item)}
                    />
                </li>
            );
        } else {
            return (
                <li key={key}>
                    <IconButton
                        aria-label="delete"
                        value={item.uid}
                        onClick={(e) =>
                            removeItem(e.target.getAttribute("value"))
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                    <FormLabel>{item.name}</FormLabel>
                </li>
            );
        }
    };

    return (
        <div className="equipment-wrapper">
            <h2>Inventory & Equipment</h2>
            {!currentCharacter.items ? (
                <ul>
                    <li>Loading...</li>
                </ul>
            ) : (
                <ul className="equipment list">
                    {currentCharacter.items.map((item, i) =>
                        renderEquipped(item, i)
                    )}
                </ul>
            )}
        </div>
    );
}
