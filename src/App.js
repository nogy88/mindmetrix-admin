import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppStore } from "./context/AppContext";
import LoginPage from "./views/Auth/Login";
import "api/interceptor";
import "./App.css";
import AppLayout from "layout";

function App() {
  return (
    <AppStore>
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
