import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import CreatePostPage from "./page/CreatePostPage";
import PostDatial from "./page/PostDatial";
import Header from "./components/Header";
import ProfilePage from "./page/ProfilePage";
import FavoritePage from "./page/FavoritePage";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // pages where header should NOT appear
  const noHeaderPaths = ["/", "/register", "/create-post"];
  const hideHeader =
    noHeaderPaths.includes(location.pathname) ||
    location.pathname.startsWith("/post/"); // matches /post/:id

  return (
    <div className="min-h-screen flex flex-col">
      {/* fixed header (hidden on some pages) */}
      {!hideHeader && <Header />}

      {/* main grows to fill remaining height; add top padding if header is visible */}
      <main className={`flex-1 ${!hideHeader ? "pt-20" : ""}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDatial />} />
        </Routes>
      </main>

      {/* footer is last child so it sits at the bottom */}
      <Footer />
    </div>
  );
}
