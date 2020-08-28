const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId },
    name: { type: String },
    level: { type: Number },
    race: { type: String },
    raceData: { type: Object },
    raceProfChoice: { type: String },
    job: { type: String },
    classData: { type: Object },
    languageChoice: { type: String },
    traitChoice: { type: String },
    profChoice: { type: Array },
    speed: { type: Number },
    currentHP: { type: Number },
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    intelligence: { type: Number },
    wisdom: { type: Number },
    charisma: { type: Number },
    items: { type: Array },
    spells: { type: Array },
});

const immutableElements = ["_id", "userId", "race"];

module.exports = {
    Character: mongoose.model("Character", characterSchema),
    sanitizeInput: (dictOfChanges) => {
        Object.keys(dictOfChanges).forEach((key) => {
            if (immutableElements.filter((ie) => ie === key).length > 0) {
                delete dictOfChanges[key];
            }
        });
    },
};
