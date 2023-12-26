import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {ListUserPage} from "./pages/UsersPage.tsx";
import {AddUserPage} from "./pages/AddUserPage.tsx";
import {Layout} from "./components/Layout.tsx";

function App() {

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={<ListUserPage />} />
                    <Route path="/users/add" element={<AddUserPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
