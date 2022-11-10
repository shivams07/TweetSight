import React, { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, createMuiTheme, ThemeProvider,Card } from "@material-ui/core";
import Chart from "react-apexcharts";
import Loader from "react-loader-spinner";
import axios from "axios";
import './SearchByKeyword.css'

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
const plotOptions = {
  colors: ["#46BFBD", "#F7464A", "#c92929","#8D72E1","#C9936F"],
  labels: ["Happy", "Sad", "Angry", "Fear", "Suprise"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
        },
      },
    },
},
  chart: {
    toolbar: {
      show: true
    }
  },
};

const plotOptionsBar = {
  colors: ["#46BFBD", "#F7464A", "#c92929","#8D72E1","#C9936F"],
  labels: ["Happy", "Sad", "Angry", "Fear", "Suprise"],
    chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Happy", "Sad", "Angry", "Fear", "Suprise"]
      }
  };

function SearchByKeyword() {const classes = useStyles();

  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barFlag, setbarFlag] = useState(false);
  const [series, setSeries] = useState([44, 55, 41]);
  const [seriesBar,setSeriesBar]=useState([]);

  const submitHandler = () => {
    setLoading(true);
    setSubmitted(false);
    
    try {
      axios
        .get("http://localhost:8000/analyzeBarhashtag", {
          params: {
            text: term,
          },
        })
        .then(function (response) {
          var d=response.data.results         
          d.map((val) => {
            seriesBar.push(
              {
                name: val.name,   //
                data: val.data  //
              }
            );
          });
          setbarFlag(true);
        });
    } catch (e) {
      console.log(e);
    }

    try {
      axios
        .get("http://localhost:8000/analyzeEmotionhashtag", {
          params: {
            text: term,
          },
        })
        .then(function (response) {
          const Happy = response.data.Happy;
          const Sad = response.data.Sad;
          const Angry = response.data.Angry;
          const Fear = response.data.Fear;
          const Suprise = response.data.Suprise;
          setSubmitted(true);
          setLoading(false)
          setSeries([Happy, Sad, Angry, Fear, Suprise]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const showAnalysis = () => {
    if (submitted && barFlag) 
    {
      return (
        <div class="row" style={{position:"absolute", width:"100%",marginBottom:"200px"}}>
          <div class="col-sm-4" style={{position:"absolute", width:"100%"}}>
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"block",position:"absolute",marginLeft:"150px"}}>
            <Chart
              options={plotOptions}
              series={series}
              type="donut"
              width="420"
            /></Card>
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"block",position:"absolute",marginLeft:"650px"}}>
            <Chart
              id="BarGraph"
              options={plotOptionsBar}
              series={seriesBar}
              type="bar"
              width="420"
            /></Card>
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"inline-flex",position:"relative",marginLeft:"1150px"}}>
            <Chart
              id="BarGraph"
              options={plotOptionsBar}
              series={seriesBar}
              type="line"
              width="420"
            /></Card>
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"block",position:"absolute",marginTop:"50px",marginLeft:"150px",marginBottom:"50px"}}>
            <Chart
              id="BarGraph"
              options={plotOptionsBar}
              series={seriesBar}
              type="area"
              width="420"
            /></Card>
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"block",position:"absolute",marginLeft:"650px",marginTop:"50px",marginBottom:"50px"}}>
            <Chart
              options={plotOptions}
              series={series}
              type="radialBar"
              width="420"
            /></Card>
             <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"450px",height:"275px",display:"inline-flex",position:"relative",marginLeft:"1150px",marginTop:"50px",marginBottom:"50px"}}>
            <Chart
              id="polarArea"
              options={plotOptions}
              series={series}
              type="polarArea"
              width="420"
            /></Card>
          </div>
        </div>
      );
    }
  };

  const showMainContent = () => {
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
              label="We can make your work easier. Here are some graphs for better Analysis       "
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
                  onClick={submitHandler}
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
          </div>
          {showAnalysis()}
          <br />
        </div>
      );
    }
  };


    return (
      <div>   
        <p>{showMainContent()}</p>
      </div>
    );
}

export default SearchByKeyword;