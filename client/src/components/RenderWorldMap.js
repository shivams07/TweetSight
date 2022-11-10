import React, { useState } from "react";
import {VectorMap} from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Loader from "react-loader-spinner";
import '../components/RenderWorldMap.css'

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        fontFamily: "Poppins",
        "&$focused": {
          // increase the specificity for the pseudo class
          fontFamily: "Poppins",
          color: "#3949AB",
        },
      },
    },
    MuiInputBase: {
      input: {
        background: "#fbfbfb",
      },
    },
  },
});

const useStyles = makeStyles(() => ({
  textField: {
    margin: 0,
    flex: 1,
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
  },
}));

const handleClick = (e, countryCode) => {
  console.log(countryCode);
};
function RenderWorld(){const classes = useStyles();
  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapValues, setmapValues] = useState({});
  const SubmitHandler = () => {
    setLoading(true);
    setSubmitted(false);
    
   try {
      axios
        .get("http://localhost:8000/getuserlocation", {
          params: {
            text: term,
          },
        })
        .then((response) => { {
          console.log(response.data.results)
          var curr=response.data.results
          console.log(curr)
          let mapData={}
          for (var i =0; i < curr.length; i = i + 1) {
            console.log(curr[i].country)
            mapData[curr[i].country] = curr[i].count
            }
          console.log(mapData)
          setmapValues(mapData)
          setSubmitted(true)
          setLoading(false);
          
    }});
    } catch (e) {
      console.log(e);
    }
  };


  const showMainContent = () => {
    if(mapValues===null)
    {
      setmapValues({"IN":4})
    }
    if (loading) {
      return (
        <div class="loader">
          <Loader
            type="Grid"
            color="#3949AB"
            visible={loading}
            height={50}
            width={50}
          />
        </div>
      );
    } else {
      return (
        <div>
        <div class="container">
          <br />
          <br />
          <ThemeProvider theme={theme}>
            <center><h2 style={{"fontFamily":"Poppins","fontSize":"1.5em"}}>Search with Topic or #Hashtag</h2></center>
            <TextField
              variant="outlined"
              className={classes.textField}
              value={term}
              label="We are here to help you analyze the Global trends        "
              onChange={(e) => setTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </ThemeProvider>
          <br /> <br />
          <div class="row">
            <div class="col-sm-12">
              <div class="text-center">
                <button
                  class="btn text-center btn-outline-secondary submit"
                  type="button"
                  onClick={SubmitHandler}
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          
        </div>
        {submitted ? RenderWorldMap() : <br />}
        </div>
      );
    }
  };
const RenderWorldMap = () => {
  return (
    <div style={{width:"1500px",height:"600px",marginLeft:"0%"}}>
      <VectorMap
        map={worldMill}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomButtons ={false}
        containerStyle={{
          width: "100%",
          height: "520px"
        }}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapValues, //this is your data
              scale: ["#146804", "#ff0000"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </div>
  );
};

return (
  <div>
    <p>{showMainContent()}</p>
  </div>
);
}
export default RenderWorld;