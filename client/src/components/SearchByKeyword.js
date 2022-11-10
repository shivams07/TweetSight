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
    flex: 2,
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
};

function SearchByKeyword() {const classes = useStyles();

  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([44, 55, 41]);
  const [tweets, setTweets] = useState([]);
  const [termDesc, setTermDesc] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [url1,setWikiURL]=useState("");

  const submitHandler = () => {
    setLoading(true);
    setSubmitted(false);

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
          setSeries([Happy, Sad, Angry, Fear, Suprise]);
        });
    } catch (e) {
      console.log(e);
    }

    try {
      var url =
        "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=" +
        term;
      setWikiURL("https://en.wikipedia.org/wiki/"+term);
      axios.get(url,{
        params: {
          
        }
      }).then(function (response) {
        const keys = Object.keys(response.data["query"]["pages"]);
        console.log(response.data["query"]["pages"]);
        setTermDesc(response.data["query"]["pages"][keys[0]]["extract"]);
        setCurrentTerm(term);
      });
    } catch (e) {
      console.log(e);
    }

    try {
      axios
        .get("http://localhost:8000/gettweets", {
          params: {
            text: term,
          },
        })
        .then(function (response) {
          setTweets(response.data.results);
          setSubmitted(true);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const showAnalysis = () => {
    const shorten = termDesc ? termDesc.substring(0, 1000) : 'Nothing to Display';
    if (submitted) {
      return (
        <div class="row">
          <div class="col-sm-4">
            <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"125%",height:"300px"}}>
            <Chart
              options={plotOptions}
              series={series}
              type="donut"
              width="420"
            /></Card>
          </div>
          <div class="offset-sm-1 col-sm-7">
            <h1 class="desc_heading">About {currentTerm} :</h1>
            
            <h1 class="desc_content">{shorten}</h1> 
            <a href={url1} target="_blank" rel="noreferrer">Read More</a>
            <br />
            <br />
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
        <div class="container">
          <br />
          <br />
          <ThemeProvider theme={theme}>
            <center><h2 style={{"fontFamily":"Poppins","fontSize":"1.5em"}}>Search for your desired #Hashtag or Topic</h2></center>
            <TextField
              variant="outlined"
              className={classes.textField}
              value={term}
              label="Looking for tweets? We will get it for you.     "
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
          {showAnalysis()}
          <br />
          {submitted ? renderTweets() : <br />}
        </div>
      );
    }
  };

  const renderTweets = () =>
    tweets.map(function (item, i) {
      var color = "#46BFBD";
      var emoji="😊";
      if (item.emotion === "Happy") {
        color = "#46BFBD";
        emoji="😊"
      }
      if (item.emotion === "Surprise") {
        color = "#C9936F";
        emoji="😮";
      }
      if (item.emotion === "Sad") {
        color = "#F7464A";
        emoji="😔";
      }
      if (item.emotion === "Fear") {
        color = "#8D72E1";
        emoji="😱"
      }
      if (item.emotion === "Angry") {
        color = "#c92929";
        emoji="😡"
      }
      return (
        <div key={i} class="tweets">
          <h2><p style={{"marginRight":"60%","display":"inline","position":"absolute"}}>@{item.username}</p><p style={{"paddingLeft":"40%","display":"inline", "position":"absolute"}}>{item.createdon}</p></h2>
          <p><br />{item.text}</p>
          <h3 style={{ color: color }}>Predicted Sentiment - {item.emotion} {emoji}</h3>
        </div>
      );
    });

    return (
      <div>   
        <p>{showMainContent()}</p>
      </div>
    );
}

export default SearchByKeyword;