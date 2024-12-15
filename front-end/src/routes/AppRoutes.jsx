import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import OfflinePage from "../pages/offline/OfflinePage";
import RobotPage from "../pages/robot/RobotPage";

const AppRoutes = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/offline" element={<OfflinePage />} />
        <Route path="/robot" element={<RobotPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
