import Router from './components/routes/routes';
import NavBar from './components/navigation/NavBar';
import Footer from "./components/navigation/Footer";
import ScrollToTop from './components/navigation/ScrollToTop';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <NavBar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
