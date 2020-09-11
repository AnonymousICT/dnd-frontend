import React, { useState, useEffect, createContext } from "react";
import { defaultValues } from "./DefaultValues";
import { fetchUsersCharacters } from "../api/userAPI";
const Context = createContext();

function ContextProvider({ children }) {
    // user auth state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const [fetchNewData, setFetchNewData] = useState(false);

    // user's choice state
    const [currentCharacter, setCurrentCharacter] = useState(
        defaultValues.currentCharacter
    );
    const [characterId, setCharacterId] = useState("");
    const [allCharacters, setAllCharacters] = useState([]);

    const [AttributeData, setAttributeData] = useState([]);
    //for equipment
    const [selectCharacter, setSelectCharacter] = useState("");
    const [characterItems, setCharacterItems] = useState([]);

    const nonSpellCaster = ["Barbarian", "Fighter", "Monk", "Rogue"];

    const [modalOpen, setModalOpen] = useState(false);

    const currentUser = (userContainer) => {
        return userContainer.user || { user: { auth: null } };
    };

    //fetch all user's characters
    useEffect(() => {
        const user = currentUser(userData);
        if (user.auth) {
            const fetchedCharacters = async () => {
                const characters = await fetchUsersCharacters(userData.user);
                setAllCharacters(characters);
            };
            fetchedCharacters();
        } else {
            return;
        }
    }, [fetchNewData, userData]);

    useEffect(() => {
        const auth = localStorage.getItem("x-auth-token");
        const displayName = localStorage.getItem("displayName");
        const id = localStorage.getItem("userId");
        setUserData({ user: { auth, displayName, id } });
    }, []);

    const updateAllCharacters = () => setFetchNewData(!fetchNewData);

    return (
        <Context.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                userData,
                setUserData,
                AttributeData,
                setAttributeData,
                characterId,
                setCharacterId,
                allCharacters,
                setAllCharacters,
                selectCharacter,
                setSelectCharacter,
                characterItems,
                setCharacterItems,
                currentCharacter,
                setCurrentCharacter,
                nonSpellCaster,
                modalOpen,
                setModalOpen,
                updateAllCharacters,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { ContextProvider, Context };
