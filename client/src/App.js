import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import SearchUsername from './components/SearchByUsername';
import SearchKeyword from './components/SearchByKeyword';
import HomePage from "./components/Home";
import RenderMap from "./components/RenderWorldMap"
import ChartRender from "./components/RenderGraphs"
import './App.css'

function App() {
  return (
    <div>
        <Router>
    <div style={{"marginTop":"3%"}}>
    <script src="../src/imgs/jquery-jvectormap-world-mill-en.js"></script>

      <Link to="/" style={{"fontFamily":"Poppins","fontSize":"2em","color":"#000080","marginLeft":"3%","fontWeight":"bold","paddingTop":"10%","textDecoration":"none"}}>TweetSight</Link>
      <Link to="/" style={{ "margin-right" : "2%","marginLeft":"50%","marginTop":"2%","color":"#000080","textDecoration":"none","fontWeight":"bold","fontSize":"1em"}}>Home</Link>
      <Link to="/SearchByKeyword" style={{ "margin-right" : "2%","marginTop":"2%","color":"#000080","textDecoration":"none","fontWeight":"bold","fontSize":"1em"}}> Hashtag Search</Link>
      <Link to="/SearchByUsername" style={{ "margin-right" : "2%","marginTop":"2%","color":"#000080","textDecoration":"none","fontWeight":"bold","fontSize":"1em"}}>Profile Search</Link>
      <Link to="/RenderMap" style={{ "margin-right" : "2%","marginTop":"2%","color":"#000080","textDecoration":"none","fontWeight":"bold","fontSize":"1em"}}>Location Analysis</Link>
      <Link to="/RenderCharts" style={{ "margin-right" : "2%","marginTop":"2%","color":"#000080","textDecoration":"none","fontWeight":"bold","fontSize":"1em"}}>Chart Analysis</Link>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/SearchByUsername" element={<SearchUsername />} />
        <Route path="/SearchByKeyword" element={<SearchKeyword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/RenderMap" element={<RenderMap />} />
        <Route path="/RenderCharts" element={<ChartRender />} />
      </Routes>
    </div>
    </Router>
    
   </div>
  );
}

export default App;