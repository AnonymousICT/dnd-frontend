import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import Axios from "axios";

import BasicInfo from "./BasicInfo";
import Attributes from "./Attributes";
import Saves from "./Saves";
import Skills from "./Skills";
import BattleStats from "./BattleStats";
import AllItems from "./AllItems";
import Spellbook from "./Spellbook";

export default function EditCharacter() {
  const { currentCharacter, setCurrentCharacter, nonSpellCaster } = useContext(
    Context
  );

  const [userClass, setUserClass] = useState([]);
  const [classLevels, setClasslevels] = useState([]);
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

  const { job, languageChoice, traitChoice } = currentCharacter;

  useEffect(() => {
    const usersClassData = async () => {
      if (job.toLowerCase() !== "stand user") {
        const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}`;
        const { data } = await Axios.get(url);
        setUserClass(data);
      }
    };
    usersClassData();
  }, [job]);

  useEffect(() => {
    const usersLevelData = async () => {
      if (job.toLowerCase() !== "stand user") {
        const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}/levels`;
        const { data } = await Axios.get(url);
        setClasslevels(data);
      }
    };
    usersLevelData();
  }, [job]);

  const filteredLevel = classLevels.filter((level) => {
    return level.level === currentCharacter.level;
  });

  useEffect(() => {
    focusSlideCarousel();
  }, []);

  const focusSlideCarousel = () => {
    const input = document.querySelector(".character-container");
    input.focus();
  };

  const handleSlideMove = (e) => {
    moveSlider(e.currentTarget.className);
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
      case "nav previous":
        scrollValue = element.offsetWidth * (pager - 1);
        setPager(pager - 1);
        break;
      case "nav next":
        scrollValue = element.offsetWidth * (pager + 1);
        setPager(pager + 1);
        break;
      case "attributes":
        scrollValue = element.offsetWidth;
        setPager(1);
        break;
      case "skills":
        scrollValue = element.offsetWidth * 2;
        setPager(2);
        break;
      case "languages":
        scrollValue = element.offsetWidth * 3;
        setPager(3);
        break;
      case "equipment":
        scrollValue = element.offsetWidth * 4;
        setPager(4);
        break;
      case "spells":
        scrollValue = element.offsetWidth * 5;
        setPager(5);
        break;
      default:
        setPager(0);
        scrollValue = 0;
    }

    element.scroll({
      left: scrollValue,
      behavior: "smooth",
    });
    focusSlideCarousel();
  };

  return (
    <div className="slider-container">
      <div
        tabIndex="0"
        className="character-container"
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => e.preventDefault()}
      >
        <div>
          <BasicInfo />
          <BattleStats userClass={userClass} filteredLevel={filteredLevel} />
        </div>
        <div>
          <Attributes filteredLevel={filteredLevel} />
          <Saves userClass={userClass} filteredLevel={filteredLevel} />
        </div>
        <Skills userClass={userClass} filteredLevel={filteredLevel} />
        <div>
          {!languageChoice ? null : languageChoice}
          {!traitChoice ? null : traitChoice}
        </div>
        <AllItems />
        {!nonSpellCaster.includes(currentCharacter.job) ? (
          <Spellbook filteredLevel={filteredLevel} />
        ) : (
          <h2>No Spells Dummy</h2>
        )}
      </div>
      <button
        className="nav previous"
        disabled={pager === 0}
        onClick={handleSlideMove}
      >
        ➤
      </button>
      <button
        className="nav next"
        disabled={
          pager === (nonSpellCaster.includes(currentCharacter.job) ? 4 : 5)
        }
        onClick={handleSlideMove}
      >
        ➤
      </button>
      <div className="page-buttons">
        <button
          className={`character${pager === 0 ? " active" : ""}`}
          title="Character Summary"
          onClick={handleSlideMove}
        >
          <span role="img" aria-label="character">
            👤
          </span>
        </button>
        <button
          className={`attributes${pager === 1 ? " active" : ""}`}
          title="Attributes and Saving Throws"
          onClick={handleSlideMove}
        >
          <span role="img" aria-label="attributes">
            💪
          </span>
        </button>
        <button
          className={`skills${pager === 2 ? " active" : ""}`}
          title="Skills"
          onClick={handleSlideMove}
        >
          <span role="img" aria-label="skills">
            🎭
          </span>
        </button>
        <button
          className={`languages${pager === 3 ? " active" : ""}`}
          title="Languages"
          onClick={handleSlideMove}
        >
          <span role="img" aria-label="languages">
            🗣️
          </span>
        </button>
        <button
          className={`equipment${pager === 4 ? " active" : ""}`}
          title="Equipment"
          onClick={handleSlideMove}
        >
          <span role="img" aria-label="equipment">
            ⚔️
          </span>
        </button>
        {!nonSpellCaster.includes(currentCharacter.job) ? (
          <button
            className={`spells${pager === 5 ? " active" : ""}`}
            title="Spells"
            onClick={handleSlideMove}
          >
            <span role="img" aria-label="spells">
              🔮
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
