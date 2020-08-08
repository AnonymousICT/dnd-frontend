import React  from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Spells from './components/Spells'
import Equipment from './components/Equipment'
import Characters from './components/Characters'
import CreateCharacter from './components/Characters/CreateCharacter/CreateCharacter'
import EditCharacter from './components/Characters/EditCharacter/EditCharacter'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import './App.scss'

export default function App() {

    return (
        <div className='App'>
            <header>
                <h1>D&D CG</h1>
                <h3>5th edition character generator</h3>
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
                    <Route path='/equipment'>
                        <Equipment />
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
                    <Route path='/character/edit'>
                        <EditCharacter />
                    </Route>
                </Switch>
            </main>
            <footer>

            </footer>
        </div>
    )
}
