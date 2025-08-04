
// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main app
import MainApp from "./pages/MainApp";

// Login Page
import LoginPage from "./pages/LoginPage";

// 404 Not Found
import NotFound from "./pages/NotFound";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>

        {/* Main route */}
        <Route path='/' element={<LoginPage />} />

        {/* Route for home */}
        <Route path='/home' element={<MainApp />} />

        {/* Route not found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
