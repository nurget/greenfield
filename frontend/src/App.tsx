import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import RecordsPage from "./pages/RecordsPage";
import PredictionsPage from "./pages/PredictionsPage";
import StatsPage from "./pages/StatsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TickerBanner from "./components/TickerBanner.tsx";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/*<Navbar />*/}
                <TickerBanner />  {/* Navbar 대신 사용 */}

                <div className="flex-1"> {/* min-h-screen과 bg-gray-100 제거 */}
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/records/2024" element={<RecordsPage/>}/>
                        <Route path="/predictions/2025" element={<PredictionsPage/>}/>
                        <Route path="/stats" element={<StatsPage/>}/>
                        <Route path="/analytics/2025" element={<AnalyticsPage/>}/>
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
