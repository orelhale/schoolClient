import { Route, Routes } from "react-router-dom";
import TestPage from "../../tests/TestPage.js";


function TestRoutes() {
   return (
      <Routes>
         <Route path="/test" element={<TestPage />}>
         </Route>
      </Routes>
   )
}

export default TestRoutes