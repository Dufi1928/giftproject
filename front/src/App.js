import './App.css';
import GiftList from "./components/GiftList/GiftList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageGift from "./ManageGift/ManageGift";
import EditGifts from "./components/EditGifts/EditGifts";

function App() {
  return (
    <div className="App">

        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GiftList />} />
                    <Route path="/edit/:id" element={<EditGifts />} />
                    <Route path="/admin" element={<ManageGift />} />
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
