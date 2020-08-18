import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../../context/Context";
import { ResourceContext } from "../../../context/ResourceContext";
import { AttributeContext } from "../../../context/AttributeContext";
import { useHistory } from "react-router-dom";
import NameLevelInput from "./step1-NameLevelInput";
import RaceSelector from "./step2-RaceSelector";
import SelectCharacterClass from "./step3-SelectCharacterClass";
import AttributeEntry from "./step4-AttributeEntry";
import Confirm from "./step5-Confirm";

export default function CreateCharacter() {
  const [formPage, setFormPage] = useState(1);
  const [newCharacter, setNewCharacter] = useState({});
  const [validForm, setValidForm] = useState({});

  const {updateAllCharacters} = useContext(Context);

  const nextStep = () => {
    setFormPage(formPage + 1);
  };

  const prevStep = () => {
    setFormPage(formPage - 1);
  };

  //const [choicesArray, setChoicesArray] = useState([]);
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   setChoicesArray(
  //     Object.keys(isChecked)
  //       .filter((el) => el !== (null || undefined))
  //       .map((key) => isChecked[key].key)
  //   );
  // }, [isChecked]);

  // Object.keys(attributeTotal).forEach(
  //   (key) => (attributeTotal[key] += racialBonus(key))
  // );

  const handleCharacterSubmit = async (e) => {
    try {
      await axios.post(
        `https://dnd-backend-node.herokuapp.com/characters/new`,
        newCharacter
      );
      history.push("/characters?created");
      updateAllCharacters();
    } catch (err) {
      console.error(err);
    }
  };

  const renderPage = () => {
    switch (formPage) {
      case 1:
        return <NameLevelInput newCharacter={newCharacter} setNewCharacter={setNewCharacter} setValid={setValidForm} />;
      case 2:
        return <RaceSelector newCharacter={newCharacter} setNewCharacter={setNewCharacter} setValid={setValidForm} />;
      case 3:
        return <SelectCharacterClass newCharacter={newCharacter} setNewCharacter={setNewCharacter} setValid={setValidForm} />;
      case 4:
        return <AttributeEntry newCharacter={newCharacter} setNewCharacter={setNewCharacter} setValid={setValidForm} />;
      case 5:
        return <Confirm newCharacter={newCharacter} setNewCharacter={setNewCharacter} setValid={setValidForm} />;
      default:
        console.log("this is a multi-step form");
    }
  };

  return (
    <div className="character-create-form">
      <h3>New Character</h3>
      {renderPage()}
      <div className="form-page-buttons">
        {formPage !== 1 ? 
          <button onClick={prevStep}>
            Go Back
          </button> : null
        }
        {formPage !== 5 ?
          <button onClick={nextStep} >
            Next
          </button> : null
        }
        {formPage === 5 ?
          <button onClick={handleCharacterSubmit} >
            Submit
          </button> : null
        }
      </div>
    </div>
  );
}
