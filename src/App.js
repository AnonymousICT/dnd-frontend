import React  from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Spells from './components/Spells'
import Characters from './components/Characters'
import CreateCharacter from './components/Characters/CreateCharacter/CreateCharacter'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import './App.css'

export default function App() {
    
    return (
        <div>
            <header>
                <h1>
                    Dungeons and Dragons 5th Edition Resource center
                </h1>
                <Navbar />
            </header>
            <main>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/spells'>
                        <Spells />
                    </Route>
                    <Route path='/characters'>
                        <Characters />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/register'>
                        <Register />
                    </Route>
                        <Route path='/createCharacter'>
                            <CreateCharacter />
                        </Route>
                </Switch>
            </main>
            <footer>

            </footer>
        </div>
    )
}
