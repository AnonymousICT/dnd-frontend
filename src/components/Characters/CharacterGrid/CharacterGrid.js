import React, {useContext} from 'react'
import {Context} from '../../../context/Context'
import CharacterCard from './CharacterCard'


export default function CharacterGrid() {
    const {allCharacters} = useContext(Context)
    return (
        <div>
            {!allCharacters ? "Loading" : allCharacters.map(character => <CharacterCard key={character._id} character={character}/>)}
            {/* {(allCharacters || []).map(character => 
                <CharacterCard 
                key={character._id} 
                character={character} 
                />)
            } */}
        </div>
    )
}
