import React from 'react';
import {Link} from "react-router-dom";
import TechStackPage from './TechStack'
import './Home.css'
import HomePageCharacter from "../imgs/HomePageCharacter.svg"
import featured1 from '../imgs/features-1.png'
import featured2 from '../imgs/features-2.png'
import featured3 from '../imgs/features-3.png'
import footerBack from '../imgs/gradient-back.jpg'

export default function Home() {
  return (
    <div>
    <img src={HomePageCharacter} alt="Introduction to TweetSight" height={650} width={650} style={{"alignSelf":"left"}}/>
    <h1 width="550" height="700"
      style={{"display":"inline-block","fontFamily":"Poppins","fontSize":"4.3em","fontWeight":"bold","marginLeft":"150px","position":"absolute"}}
    >
      <div style={{"paddingTop":"100px"}}>
      <br />Hey!👋 You finally met me.<br />
      I am TweetSight <br />
      
      <Link to="/SearchByKeyword" style={{"display":"inline-block","paddingBottom":"10%","textDecoration":"none","paddingTop":"50px"}}><button class="home_button"> Get Started!!</button></Link></div>
    </h1><br/>
    <br />
    <br /> 
    <TechStackPage />
    <div class="featured-body">
    <section id="features" class="features" data-aos="fade-up" style={{"fontFamily":"Poppins"}}>
      <div class="container"> 
        <div class="section-title">
        <center><br /><br />
          <h2 style={{"fontFamily":"Poppins","fontSize":"2em","fontWeight":"bold","color":"#003399","textDecoration":"underline"}}>Features</h2><br /><br />
        </center>
        </div>

        <div class="row content">
          <div class="col-md-5" data-aos="fade-right" data-aos-delay="100">
            <img src={featured1} class="img-fluid" alt="" />
          </div>
          <div class="col-md-7 pt-4" data-aos="fade-left" data-aos-delay="100">
            <h3>Tweet Pre-processing</h3>
            <p class="font-italic">
              At first we have the major goal to perform data cleaning and make the content suitable for sentimental analysis.
            </p>
            <ul>
              <li><i class="icofont-check"></i>Remove the unwanted textual part from the message. </li>
              <li><i class="icofont-check"></i>Perform the natural language processing techniques.</li>
              <li><i class="icofont-check"></i>Bring out the well pre-processed data from the text pre-processing.</li>
            </ul>
          </div>
        </div>

        <div class="row content">
          <div class="col-md-5 order-1 order-md-2" data-aos="fade-left">
            <img src={featured2} class="img-fluid" alt="" />
          </div>
          <div class="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
            <h3>Sentimental Analysis</h3>
            <p class="font-italic">
              Detect emotion from every word that we got from pre-processed text and take a count of it for further analytical process.
            </p>
            <ul>
              <li><i class="icofont-check"></i>Find the appropriate words that express emotions or feelings.</li>
              <li><i class="icofont-check"></i>Check the emotion category of each word.</li>
              <li><i class="icofont-check"></i>Store the count of emotions relevant to the words found.</li>
            </ul>
          </div>
        </div>

        <div class="row content">
          <div class="col-md-5" data-aos="fade-right">
            <img src={featured3} class="img-fluid" alt="" />
          </div>
          <div class="col-md-7 pt-5" data-aos="fade-left">
            <h3>Analysis Delivery</h3>
            <p class="font-italic">After sentimental analysis, there is the time of getting the significant output for the textual message we input earlier.</p>
            <ul>
              <li><i class="icofont-check"></i>The output will be in the form of Graphs, Tweets and many more formats.</li>
              <li><i class="icofont-check"></i>There will be emotions described in form of Happy, Sad, Angry, Fear and Suprise.</li>
              <li><i class="icofont-check"></i>Higher the score of a particular emotion category, we can conclude that the message belongs to that category.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </div>
    <div style={{"fontFamily":"Poppins","fontSize":"1em"}}>
      <br />
      <center>Made for Educational Purposes : Intellectual Property Rights Reserved ©</center>
      <br />
    </div>
  </div>
  )
}