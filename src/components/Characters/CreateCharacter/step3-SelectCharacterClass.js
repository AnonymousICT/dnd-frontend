import React, { useState, useEffect } from "react";
import { renderClassLevel } from "./renderClassLevels";
import { validCells } from "./validCells";
import { defaultValues } from "../../../context/DefaultValues";
import {
    fetchClassData,
    fetchSpecificClass,
    fetchClassLeveling,
} from "../../../api/ClassAPI";

export default function SelectCharacterClass({
    newCharacter,
    setNewCharacter,
    setValid,
}) {
    const [characterClass, setCharacterClass] = useState("");
    const [allClasses, setAllClasses] = useState([]);
    const [classData, setClassData] = useState(defaultValues.classData);
    const [classLevels, setClassLevels] = useState([]);
    const [isChecked, setIsChecked] = useState({});

    useEffect(() => {
        const fetchedAllClasses = async () => {
            setAllClasses(await fetchClassData());
        };
        fetchedAllClasses();
    }, []);

    useEffect(() => {
        const fetchedSpecificClassData = async () => {
            setClassData(await fetchSpecificClass(characterClass));
        };
        fetchedSpecificClassData();
    }, [characterClass]);

    useEffect(() => {
        const fetchedLevelsData = async () => {
            setClassLevels(await fetchClassLeveling(characterClass));
        };
        fetchedLevelsData();
    }, [characterClass]);

    useEffect(() => {
        setNewCharacter((previousState) => {
            return {
                ...previousState,
                job: classData.name,
                classData: { ...classData, classlevels: classLevels },
                profChoice: Object.keys(isChecked).map((propName) =>
                    isChecked[propName].key.replace("Skill: ", "")
                ),
            };
        });
    }, [isChecked, classData, setNewCharacter, classLevels]);

    useEffect(() => {
        const requiredCount = (classData.proficiency_choices || []).reduce(
            (count, choice) => {
                return count + choice.choose;
            },
            0
        );
        setValid(
            classData &&
                (newCharacter.profChoice || []).length === requiredCount
        );
    }, [classData, newCharacter, setValid]);

    const {
        name,
        hit_die,
        saving_throws,
        proficiencies,
        proficiency_choices,
        subclasses,
    } = classData;

    const handleChecks = (e) => {
        const group = e.target.getAttribute("data-group");
        const choiceCount = e.target.getAttribute("data-count");
        const key = e.target.getAttribute("value");
        const currentCount = Object.keys(isChecked)
            .map((item) => isChecked[item])
            .filter((check) => check.group === group && check.checked).length;

        const currentCheckbox = isChecked[e.target.name] || {
            checked: false,
            count: 0,
        };

        if (currentCheckbox.checked || currentCount < choiceCount) {
            setIsChecked({
                ...isChecked,
                [e.target.name]: {
                    checked: !currentCheckbox.checked,
                    group: group,
                    key: key,
                },
            });
        } else {
            e.preventDefault();
        }
    };

    let headers = validCells;

    return (
        <div className="select-class-container">
            <h3>Choose your character's class</h3>
            <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
            >
                <option key="noOp" value="">
                    -----
                </option>
                {allClasses.map((index) => (
                    <option key={index[0]} value={index[1]}>
                        {index[0]}
                    </option>
                ))}
            </select>
            <div className="class-info-wrapper">
                <div className="class-info-container">
                    <h1>{name}</h1>

                    {!hit_die ? null : (
                        <>
                            <h3 title="the value that determines how many hit points you will gain per level up">
                                Hit Die
                            </h3>
                            <p>1d{hit_die} </p>
                        </>
                    )}

                    <ul className="class-saving-throws">
                        {!saving_throws ? null : (
                            <>
                                <h3>Saving Throws</h3>
                                {saving_throws.map((index) => (
                                    <li key={"st-" + index.name}>
                                        {index.name}
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>

                    <ul className="class-proficiences">
                        {!proficiencies ? null : (
                            <>
                                <h3>Class Proficiences</h3>
                                {proficiencies.map((index) => (
                                    <li key={"cp-" + index.name}>
                                        {index.name}
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>

                    {!proficiency_choices
                        ? null
                        : proficiency_choices.map((choiceObj, choiceIndex) => {
                              return (
                                  <div
                                      className="border choices"
                                      data-key={choiceObj.choose}
                                      key={choiceIndex}
                                  >
                                      <h3>
                                          Choose {choiceObj.choose} from the
                                          list
                                      </h3>
                                      <br />
                                      {choiceObj.from.map((skill, i) => {
                                          return (
                                              <div key={i}>
                                                  <label
                                                      key={
                                                          choiceIndex +
                                                          "-" +
                                                          i +
                                                          "label"
                                                      }
                                                  >
                                                      {skill.name}
                                                  </label>
                                                  <input
                                                      type="checkbox"
                                                      className="prof-choice"
                                                      onChange={handleChecks}
                                                      name={
                                                          "proficiencies" +
                                                          choiceIndex +
                                                          "-" +
                                                          i
                                                      }
                                                      data-count={
                                                          choiceObj.choose
                                                      }
                                                      data-group={
                                                          "group" + choiceIndex
                                                      }
                                                      checked={
                                                          isChecked[
                                                              "proficiencies" +
                                                                  choiceIndex +
                                                                  "-" +
                                                                  i
                                                          ]
                                                              ? isChecked[
                                                                    "proficiencies" +
                                                                        choiceIndex +
                                                                        "-" +
                                                                        i
                                                                ].checked
                                                              : false
                                                      }
                                                      value={skill.name}
                                                      key={
                                                          choiceIndex + "-" + i
                                                      }
                                                  />
                                              </div>
                                          );
                                      })}
                                  </div>
                              );
                          })}

                    {!subclasses ? null : (
                        <>
                            <h3>Available sub-classes</h3>
                            <p>{subclasses.map((subClass) => subClass.name)}</p>
                        </>
                    )}
                </div>

                {!classLevels ? null : (
                    <div className="class-levels-container">
                        <table>
                            <thead>
                                <tr>
                                    {headers.map((header, i) => (
                                        <th className={header.key} key={i}>
                                            {header.displayText}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {classLevels
                                    .reduce((obj, item) => {
                                        return item.level !== obj.length
                                            ? [
                                                  ...obj,
                                                  classLevels.filter(
                                                      (cl) =>
                                                          cl.level ===
                                                          item.level
                                                  ),
                                              ]
                                            : obj;
                                    }, [])
                                    .map((classLevel) => (
                                        <tr
                                            key={
                                                "class-row" +
                                                classLevel[0].level
                                            }
                                        >
                                            {headers.map((header, id) => (
                                                <td key={"class-cell" + id}>
                                                    {classLevel
                                                        ? renderClassLevel(
                                                              classLevel,
                                                              header.key
                                                          )
                                                        : null}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
