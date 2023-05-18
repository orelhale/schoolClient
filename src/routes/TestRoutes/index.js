import { Route, Routes } from "react-router-dom";
import TestPage from "../../tests/TestPage.js";


function TestRoutes() {
   return (
      <Routes>
         <Route path="/test" element={<TestPage />} />
      </Routes>
   )
}

export default TestRoutes