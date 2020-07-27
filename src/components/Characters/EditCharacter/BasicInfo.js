import React from 'react'

export default function BasicInfo({character:{name, level, race, job}}) {
    return (
        <div className="basic-info">
            <h1>{name}</h1>
            <h2>Level {level} {race} {job}</h2>
        </div>
    )
}
