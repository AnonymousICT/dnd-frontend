import React, { useState } from "react";
import NameLevelInput from "./step1-NameLevelInput";
import RaceSelector from "./step2-RaceSelector";
import SelectCharacterClass from "./step3-SelectCharacterClass";
import AttributeEntry from "./step4-AttributeEntry";
import Confirm from "./step5-Confirm";

export default function CreateCharacter() {
  const [formPage, setFormPage] = useState(1);

  const nextStep = () => {
    setFormPage(formPage + 1);
  };

  const prevStep = () => {
    setFormPage(formPage - 1);
  };

  switch (formPage) {
    case 1:
      return <NameLevelInput nextStep={nextStep} />;
    case 2:
      return <RaceSelector nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <SelectCharacterClass nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <AttributeEntry nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <Confirm prevStep={prevStep} />;
    default:
      console.log("this is a multi-step form");
  }

  return (
    <div>
      <form className="character-create-form">
        <NameLevelInput />
        <RaceSelector />
        <SelectCharacterClass />
        <AttributeEntry />
        <Confirm />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
