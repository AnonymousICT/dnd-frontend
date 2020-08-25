import React from "react";

import RenderTable from "../Utilities/Table/RenderTable";

export default function AllEquipment({
    setShowModal,
    allEquipment,
    equipmentCategories,
    setEquipmentSelection,
    equipmentCategory,
    setSpecificEquipmentSelection,
}) {
    const filteredGear = (gearType) =>
        gearType ? equipmentCategory : allEquipment || [];

    const rowClicked = (row) => {
        setSpecificEquipmentSelection(row.url);
        setShowModal(true);
    };

    return (
        <div className="equipment-container">
            <div className="equipment-filters">
                {!equipmentCategories ? (
                    <h1>Loading...</h1>
                ) : (
                    equipmentCategories.map((category) => (
                        <button
                            onClick={(e) =>
                                setEquipmentSelection(e.target.value)
                            }
                            value={category[1]}
                            key={category[0]}
                            className={`zaho ${category[2]}`}
                        />
                    ))
                )}
            </div>
            <div className="table-container">
                <RenderTable
                    data={filteredGear(equipmentCategory)}
                    rowClicked={rowClicked}
                />
            </div>
        </div>
    );
}
