import { Routes,Route } from "react-router-dom";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import CreatePostPage from "./page/CreatePostPage";
import PostDatial from "./page/PostDatial";
import React from 'react'

<<<<<<< Updated upstream
function App() {
  

=======
const App = () => {
>>>>>>> Stashed changes
  return (
     <div className="relative h-full w-full">
      <div className=""/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<PostDatial />} />
      </Routes>
    </div>
  )
}

export default App