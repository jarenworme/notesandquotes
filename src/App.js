import React from "react";
import Router from './components/routes/routes';
import NavBar from './components/navigation/NavBar';
import ScrollToTop from './components/navigation/ScrollToTop';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
