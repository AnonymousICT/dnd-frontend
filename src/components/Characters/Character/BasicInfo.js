import React, {useState, useContext} from 'react'


export default function BasicInfo() {
    const [proficiency, setProficiency ] = useState(2)
    // 5th, 9th, 13, 17
    // if (characterLevel <= 4) {
    //     return proficiency
    // } else if (characterLevel >= 5) {
    //     setProficiency(3)
    // } else if (characterLevel >= 9){
    //     setProficiency(4)
    // } else if (characterLevel >= 13) {
    //     setProficiency(5)
    // } else if (characterLevel >= 17) {
    //     setProficiency(6)
    // } 

    console.log(proficiency)
    return (
        <div>
            {/* Character Name
            Username(display name)
            Class 
            Level 
            Race 
            Alignment
            Background
            Experience points
            Proficiency bonus = determined by Level
            inspiration */}

        </div>
    )
}

