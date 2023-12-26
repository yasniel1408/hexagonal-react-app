import {NavLink} from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    return (
        <main>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/users/add">Add User</NavLink></li>
            </ul>
        </main>
    );
}
