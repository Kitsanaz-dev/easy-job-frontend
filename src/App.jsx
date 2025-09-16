import Header from "./components/Header";
import { useState } from "react";
import Homepage from "./components/Homepage"
import Profile from "./components/Profile"
import Favourites from "./components/Favourites"

function App() {
  const [activeTab, setActiveTab] = useState("Homepage");

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}></Header>
      <main>
        {activeTab === "Homepage" && (
          <Homepage></Homepage>
        )}
        {activeTab === "Profile" && (
          <Profile></Profile>
        )}
        {activeTab === "Favorites" && (
          <Favourites></Favourites>
        )}
      </main>
    </div>
  );
}

export default App;
