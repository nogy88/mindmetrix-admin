import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppStore } from "./context/AppContext";
import LoginPage from "./views/Auth/Login";
import AppLayout from "layout";
import "api/interceptor";
import { ThemeSwitcher } from "components";
import "./App.css";

function App() {
  return (
    <AppStore>
      <ThemeSwitcher />

      <Router>
        <Routes>
          <Route path={"*"} element={<AppLayout />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </Router>
    </AppStore>
  );
}

export default App;
