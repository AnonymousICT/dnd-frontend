import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { fetchAllSpecificSpellData, fetchSpecificSpell } from "../../api/SpellAPI";

import bookloading from "./bookloading.gif";
import RenderTable from "../Utilities/Table/RenderTable";

export default function AllSpells({ setShowModal, setSpecificSpell }) {
  
    const [loading, setLoading] = useState(true);
    const [allSpellModels, setAllSpellModels] = useState([]);
    const [spellMasterList, setSpellMasterList] = useState([]);
    const { selectCharacter, allCharacters } = useContext(Context);
    const [spellSelection, setSpellSelection] = useState("");

    useEffect(() => {
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(spellSelection));
        };
        fetchedSpecificSpellData(spellSelection);
    }, [setSpecificSpell, spellSelection]);

    useEffect(() => {
        setLoading(true);
        const fireAndForget = async () => {
            if (!JSON.parse(localStorage.getItem("spells"))) {
                const data = await fetchAllSpecificSpellData();
                const sortedSpells = data.sort((a, b) => a.level - b.level);
                sortedSpells.map((spell, idx) => (spell.row = idx));
                setSpellMasterList(sortedSpells);
                localStorage.setItem("spells", JSON.stringify(sortedSpells));
            }
            setSpellMasterList(JSON.parse(localStorage.getItem("spells")));
            setLoading(false);
        };
        fireAndForget();
    }, []);

    useEffect(() => {
        let character = allCharacters.find(
            (char) => char._id === selectCharacter
        );
        if (!spellMasterList) {
            setAllSpellModels([]);
        } else if (spellMasterList.length && character) {
            setAllSpellModels([
                ...spellMasterList.filter((spell) => {
                    return spell.classes.find(
                        (job) => job.name === character.job
                    );
                }),
            ]);
        } else {
            setAllSpellModels([...spellMasterList]);
        }
    }, [allCharacters, selectCharacter, spellMasterList]);

    const rowClicked = (row) => {
        setSpellSelection(row.url);
        setShowModal(true);
    };

    return (
        <div className="all-spells-container">
            <div className="table-container">
                {loading ? (
                    <img src={bookloading} alt="Loading..." />
                ) : (
                    <RenderTable
                        data={allSpellModels}
                        rowClicked={rowClicked}
                    />
                )}
            </div>
        </div>
    );
}
