import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PeoplePage from "../pages/PeoplePage"

const AppRouter: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<PeoplePage />} />
        </Routes>
    )
}

export default AppRouter;