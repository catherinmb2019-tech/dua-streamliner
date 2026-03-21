import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../presentation/pages/LoginPage";
import { DashboardPage } from "../presentation/pages/DashboardPage";
import { GeneratorPage } from "../presentation/pages/GeneratorPage";
import { ProgressPage } from "../presentation/pages/ProgressPage";
import { ResultPage } from "../presentation/pages/ResultPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/generate" element={<GeneratorPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};