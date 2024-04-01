import './App.css';
import GiftList from "./components/GiftList/GiftList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageGiftList from "./ManageGiftList/ManageGiftList";
import EditGiftList from "./components/EditGiftList/EditGiftList";
import GiftListDetail from "./components/GiftListDetail/GiftListDetail";
import ManageGift from "./components/ManageGift/ManageGift";

function App() {
  return (
    <div className="App">

        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GiftList />} />
                    <Route path="/edit/:id" element={<EditGiftList />} />
                    <Route path="/edit/gift/:id" element={<GiftListDetail />} />
                    <Route path="/admin" element={<ManageGiftList />} />
                    <Route path="/edit-gift/:id" element={<ManageGift />} />
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
