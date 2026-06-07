import { Routes, Route } from "react-router-dom";
import Page1 from "./tasks/Page1";
import Page2 from "./tasks/Page2";
import Page3 from "./tasks/Page3";
import Page4 from "./tasks/Page4";
import Page5 from "./tasks/Page5";
import Page6 from "./tasks/Page6";
import Navbar from "./components/Navbar";
import { ogData } from "./common/ogData";
import OriginalDataGraph from "./components/OriginalDataGraph";
import "./index.css";

function App() {
  const ogYears = ogData.map(({ year }) => year);
  const ogPrices = ogData.map(({ price }) => price);
  const ogPayrolls = ogData.map(({ pay }) => pay);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<OriginalDataGraph />} />
        <Route path="/1" element={<Page1 x={ogPayrolls} y={ogPrices} />} />
        <Route path="/2" element={<Page2 x={ogPayrolls} y={ogPrices} />} />
        <Route path="/3" element={<Page3 prices={ogPrices} />} />
        <Route path="/4" element={<Page4 />} />
        <Route path="/5" element={<Page5 x={ogPayrolls} y={ogPrices} />} />
        <Route path="/6" element={<Page6 x={ogPayrolls} y={ogPrices} />} />
      </Routes>
    </>
  );
}

export default App;
