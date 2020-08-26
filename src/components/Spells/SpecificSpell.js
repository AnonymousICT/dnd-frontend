import React, { useContext } from "react";
import { Context } from "../../context/Context";
import Button from "@material-ui/core/Button";

export default function SpecificSpell({
    closeModal,
    specificSpell,
    spellCart,
    setSpellCart,
}) {
    const {
        selectCharacter,
        currentCharacter,
    } = useContext(Context);

    const {
        index,
        name,
        level,
        range,
        components,
        school,
        classes,
        material,
        desc,
        duration,
        higher_level,
        ritual,
        concentration,
        casting_time,
    } = specificSpell;

    const addToCart = () => {
        setSpellCart((previousCart) => {
            return [...previousCart, specificSpell];
        });
        closeModal();
    };

    const renderButton = () => {
        return spellCart.find((spell) => spell.index === index) ? (
            <Button variant="container" color="disabled">
                Spell Already in Cart
            </Button>
        ) : !selectCharacter ? null : (
              currentCharacter || { spells: [] }
          ).spells.find((spell) => spell.index === index) ? (
            <Button variant="container" color="disabled">
                Spell Already Known
            </Button>
        ) : (
            <Button variant="contained" color="secondary" onClick={addToCart}>
                Add to Character
            </Button>
        );
    };

    const renderSpecificSpell = () => {
        return (
            <div className="specific-spell-container">
                {!name || name === "Nothingness" ? null : (
                    <section>
                        <h1 className="spell-name">{name}</h1>
                        <p>
                            Level: {level} {school.name}{" "}
                            {ritual ? "(ritual)" : null}
                        </p>
                        <p>Casting Time: {casting_time}</p>
                        <p>Spell Range: {range}</p>
                        <p>
                            Components: {components} {material}
                        </p>
                        <p>
                            Duration: {concentration ? "Concentration, " : null}{" "}
                            {duration}
                        </p>
                        <p>
                            Classes:{" "}
                            {classes.map((index) => index.name).join(", ")}
                        </p>
                        <p>Description: {desc}</p>
                        <p>{higher_level}</p>
                        {renderButton()}
                    </section>
                )}
            </div>
        );
    };

    return renderSpecificSpell();
}
