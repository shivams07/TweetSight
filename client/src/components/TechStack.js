import React from 'react';
import { Card } from "@material-ui/core";
import ReactLogo from '../imgs/react-logo.png';
import TwitterAPI from '../imgs/twitter-api-logo.png';
import DockerLogo from '../imgs/docker-logo.png';
import PythonLogo from '../imgs/Pyhton-logo.png';
import axiosLogo from '../imgs/axios-logo.png';

function TechStack() {
  return (
    <div style={{"width":"100%","height":"500px","background":"#303179"}}>
        <center><br /><br /><h2 style={{"fontFamily":"Poppins","fontSize":"2em","fontWeight":"bold","color":"#FFFFFF","textDecoration":"underline"}}>Our Tech Stack</h2><br /> <br /></center>
        <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"250px",height:"280px",display:"block",position:"absolute","marginRight":"200px","marginLeft":"500px",backgroundColor: "#fad5ef",paddingLeft:"25px",paddingTop:"20px"}}><img src={ReactLogo} alt="React" height={200} width={200} />
        <div style={{"fontFamily":"Poppins","fontSize":"1.5em","fontWeight":"bold","color":"#303179",display:"block"}}><center> React Js</center></div></Card>
        <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"250px",height:"280px",display:"inline-flex",position:"absolute",marginLeft:"650px","marginRight":"450px",backgroundColor: "#fad5ef",paddingLeft:"25px",paddingTop:"20px"}}><img src={TwitterAPI} alt="Twitter API" height={200} width={200} />
        <div style={{"fontFamily":"Poppins","fontSize":"1.5em","fontWeight":"bold","color":"#303179",display:"block",position:"absolute",marginTop:"200px",marginLeft:"35px"}}><center> Twitter API</center></div></Card>
        <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"275px",height:"300px",display:"inline-flex",position:"absolute",marginLeft:"850px","marginRight":"450px",backgroundColor: "#fad5ef",paddingLeft:"20px",paddingTop:"50px",zIndex:"3"}}><img src={DockerLogo} alt="Docker" height={120} width={220} />
        <div style={{"fontFamily":"Poppins","fontSize":"1.5em","fontWeight":"bold","color":"#303179",display:"block",position:"absolute",marginTop:"170px",marginLeft:"60px"}}><center> Docker</center></div></Card>
        <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"250px",height:"280px",display:"inline-flex",position:"absolute",marginLeft:"1050px","marginRight":"450px",backgroundColor: "#fad5ef",paddingLeft:"28px",paddingTop:"20px",zIndex:"2"}}><img src={PythonLogo} alt="Python" height={175} width={175} />
        <div style={{"fontFamily":"Poppins","fontSize":"1.5em","fontWeight":"bold","color":"#303179",display:"block",position:"absolute",marginTop:"200px",marginLeft:"60px"}}><center>  Python</center></div></Card>
        <Card style={{borderRadius:"18px",boxShadow:"5px 5px 15px rgba(0,0,0,0.9)",width:"250px",height:"280px",display:"inline-flex",position:"absolute",marginLeft:"1250px","marginRight":"450px",backgroundColor: "#fad5ef",paddingLeft:"28px",paddingTop:"70px"}}><img src={axiosLogo} alt="Axios" height={120} width={175} />
        <div style={{"fontFamily":"Poppins","fontSize":"1.5em","fontWeight":"bold","color":"#303179",display:"block",position:"absolute",marginTop:"150px",marginLeft:"60px"}}><center>  Axios</center></div></Card>
  </div>
  )
}

export default TechStack;