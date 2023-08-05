import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import './App.css';
import RootLayout from "./components/Root";
import Paintings from "./components/Paintings";
import Photography from "./components/Photography";
import About from "./components/About";
import Contact from "./components/Contact";
import HomePage from "./components/HomePage";
import ImageUpload from "./components/ImageUpload";
import SignIn from "./components/SignIn";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* public routes */}
      <Route path="" element={<HomePage />}/>
      <Route path="homepage" element={<HomePage />} />
      <Route path="paintings" element={<Paintings />} />
      <Route path="photography" element={<Photography />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="imageupload" element={<SignIn />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
