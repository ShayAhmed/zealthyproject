import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import App from "./App";
import Create from "./components/create/create";
import Admin from "./components/admin/admin";

const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
        </Routes>
    </BrowserRouter>
)

export default AppRouter;
