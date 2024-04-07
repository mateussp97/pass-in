import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
