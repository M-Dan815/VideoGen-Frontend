import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from './components/Footer.jsx';
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Payment from './pages/Payment.jsx'
import Cards from './pages/Cards.jsx'
import Amazon from "./pages/Amazon.jsx";
import Ebay from "./pages/Ebay.jsx";
import Shopify from "./pages/Shopify.jsx";
import View from "./pages/View.jsx";
import AmazonScraper from "./components/AmazonScraper.jsx"; 
import Merge from "./components/Merge.jsx";
// --- Scroll-to-top helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/about" element={<About />} />
        <Route path="/amazon" element={<Amazon />} />
        <Route path="/ebay" element={<Ebay />} />
        <Route path="/shopify" element={<Shopify />} />
        <Route path="/view" element={<View />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
