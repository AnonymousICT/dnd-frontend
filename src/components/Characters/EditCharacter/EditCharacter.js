import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import Axios from "axios";

import BasicInfo from "./BasicInfo";
import Attributes from "./Attributes";
// import Saves from "./Saves";
// import Skills from "./Skills";
import BattleStats from "./BattleStats";
// import AllItems from "./AllItems";
// import Spellbook from "./Spellbook";

const pageButtons = [
  { name: "character", title: "Character Summary", icon: "👤" },
  { name: "attributes", title: "Attributes and Saving Throws", icon: "💪" },
  { name: "skills", title: "Skills", icon: "🎭" },
  { name: "languages", title: "Languages", icon: "🗣️" },
  { name: "equipment", title: "Equipment", icon: "⚔️" },
  { name: "spells", title: "Spells", icon: "🔮" },
];

export default function EditCharacter() {
  const { currentCharacter, setCurrentCharacter, nonSpellCaster } = useContext(
    Context
  );

  const [pager, setPager] = useState(0);
  const characterId =
    window.location.href.split("/").pop() ||
    window.location.href.split("/").pop().pop();

  useEffect(() => {
    const fetchCharacter = async () => {
      const {
        data,
      } = await Axios.get(
        `https://dnd-backend-node.herokuapp.com/characters/${characterId}`,
        { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }
      );
      setCurrentCharacter(data);
    };
    fetchCharacter();
  }, [characterId, setCurrentCharacter]);

  useEffect(() => {
    focusSlideCarousel();
  }, []);

  const focusSlideCarousel = () => {
    const input = document.querySelector(".character-container");
    input.focus();
  };

  const handleSlideMove = (name) => {
    moveSlider(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (pager !== 0) {
        moveSlider("nav previous");
      } else {
        e.preventDefault();
      }
    } else if (e.key === "ArrowRight") {
      if (pager !== (nonSpellCaster.includes(currentCharacter.job) ? 4 : 5)) {
        moveSlider("nav next");
      } else {
        e.preventDefault();
      }
    }
  };

  const moveSlider = (className) => {
    let scrollValue = 0;
    const element = document.querySelector(".character-container");
    if (pager * element.offsetWidth !== element.scrollLeft) {
      return false;
    }

    switch (className) {
      case "previous":
        scrollValue = element.offsetWidth * (pager - 1);
        break;
      case "next":
        scrollValue = element.offsetWidth * (pager + 1);
        break;
      case "attributes":
        scrollValue = element.offsetWidth;
        break;
      case "skills":
        scrollValue = element.offsetWidth * 2;
        break;
      case "languages":
        scrollValue = element.offsetWidth * 3;
        break;
      case "equipment":
        scrollValue = element.offsetWidth * 4;
        break;
      case "spells":
        scrollValue = element.offsetWidth * 5;
        break;
      default:
        scrollValue = 0;
    }

    element.scroll({
      left: scrollValue,
      behavior: "smooth",
    });
    focusSlideCarousel();
  };

  const handleScroll = () => {
    const element = document.querySelector(".character-container");
    const page = Math.round(element.scrollLeft / element.offsetWidth);
    setPager(page);
  };

  return (
    <div className="slider-container">
      <div
        tabIndex="0"
        className="character-container"
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => e.preventDefault()}
        onScroll={handleScroll}
      >
        <div>
          <BasicInfo />
          <BattleStats
            currentCharacter={currentCharacter}
            setCurrentCharacter={setCurrentCharacter}
          />
        </div>
        <div>
          <Attributes currentCharacter={currentCharacter} />
          {/* <Saves userClass={userClass} /> */}
        </div>
        {/* <Skills userClass={userClass} /> */}
        <div></div>
        {/* <AllItems /> */}
        {/* {!nonSpellCaster.includes(currentCharacter.job) ? (
          <Spellbook />
        ) : (
          <h2 className="hidden">No Spells Dummy</h2>
        )} */}
      </div>
      <button
        className="nav previous"
        disabled={pager === 0}
        onClick={() => handleSlideMove("previous")}
      >
        ➤
      </button>
      <button
        className="nav next"
        disabled={
          pager === (nonSpellCaster.includes(currentCharacter.job) ? 4 : 5)
        }
        onClick={() => handleSlideMove("next")}
      >
        ➤
      </button>
      <div className="page-buttons">
        {pageButtons.map((page, i) =>
          !nonSpellCaster.includes(currentCharacter.job) ||
          page.name !== "spells" ? (
            <button
              key={page.name}
              className={`${page.name} ${pager === i ? " active" : ""}`}
              title={page.title}
              onClick={() => handleSlideMove(page.name)}
            >
              <span role="img" aria-label={page.name}>
                {page.icon}
              </span>
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
