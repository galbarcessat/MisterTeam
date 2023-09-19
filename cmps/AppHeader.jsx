const { NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader() {

    return (
        <header className="app-header">
            <h1>MisterTeam App</h1>
            <nav>
                <NavLink to="/">Teams</NavLink> |
                <NavLink to="/contact">Contacts</NavLink>
            </nav>
        </header>
    );
}