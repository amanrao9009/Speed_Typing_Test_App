import React from "react";
import { useState , useRef , useEffect } from "react";
import Popup from "./components/Popup";

export default function Quotable() {
  const [data, setData] = React.useState(null);
  const inputRef = useRef();
  const spamAarrayRef = useRef("asdf")

  const [close, setClose] = React.useState(false) 

  const [time , SetTime] = useState(60000)

  const [clock , setClock] = useState(60)

  const [startTime , setStartTime] = useState(null)
  const [endTime , setEndTime] = useState(null)


  const [wpa ,setWpa] = useState(50)
  const [accuracy , setAccuracy] = useState(100)

  const timeIdentifer = useRef();


  async function getQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...val } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);

      const str = val.content.split("").map((chr , idx)=>{
       return <spam key={idx} className="">{chr}</spam>
      })
      console.log(str)
      setData(str);
      
    } catch (error) {
     
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
    
    inputRef.current.value = '';

   
  
    
  }


  async function quoteDisplay(){
    setStartTime(null)
    await getQuote();      
  }



useEffect(()=>{

  if(clock == 0){
     
    setClock(60)

    clearInterval(timeIdentifer.current)
    setClose(true)

     
     console.log(clock)
  }
     
},[clock])




  // Run `getQuote` once when component mounts
  React.useEffect(() => {
    quoteDisplay();
  }, []);
  // Do not render until the first quote is loaded
  if (!data) return null;

  function check() {

    const inputStr = event.target.value.split("");
    let correct = true;
    let currentWord = -1;
    const newArr = data.map((c,i)=>{

     
      if(inputStr[i] == null && i == currentWord+1){
        correct = false;
        return <spam key={i} className="upcoming">{c.props.children}</spam>
      }
      else if(inputStr[i] == null){
        correct = false;
        return <spam key={i}>{c.props.children}</spam>
      }else if(inputStr[i] == c.props.children){
        currentWord = i;
        return <spam key={i} className="correct">{c.props.children}</spam>
        
      }else{
        currentWord = i;
        correct = false;
        return <spam key={i} className="incorrect">{c.props.children}</spam>

      }
      
    })  

      const wordCount = event.target.value.trim().split(/\s+/).length

      const  minutes = ((Math.floor((Date.now()/(1000))) -Math.floor((startTime/(1000))) )/60).toFixed(2) 

      setWpa(Math.floor(wordCount/parseFloat(minutes)))
      
      // console.log(Math.floor(wordCount/parseFloat(minutes)))


      const typedString = event.target.value;
      console.log(typedString)
      const lenth = typedString.length
      let correctChars = 0;

       for (let i = 0; i < data.length; i++) {


        if( data[i].props.children == typedString[i]){
          correctChars++;
        } 
        
      
    }

      //  console.log(   Math.floor(   (correctChars/lenth)*100)   )

      setAccuracy( Math.floor(   (correctChars/lenth)*100) )





     if(correct){
      setClose(true)
     
      clearInterval(timeIdentifer.current)
      setClock(60)
      quoteDisplay();
     }
    setData(newArr)
  }


  function StartTheClock(){


    timeIdentifer.current = setInterval(() => {

      setClock(p => p-1)
     
      console.log(clock)
    }, 1000);


   
  }


  function handelTime(){
    if(startTime == null){
      setStartTime(Date.now())
      StartTheClock()
      
    }

   

    // console.log(Math.floor((Date.now()/(1000))     )    -     Math.floor((startTime/(1000)))          )
     
  }



  function setTimer(val){
    SetTime(val)
    setClock(val / 1000)

    console.log(time)
  }

  function stoptClock(){
    clearInterval(timeIdentifer.current)
  }



  return (
    <div className="App">


          {/* <div id="quoteDisplay">
        {data}
          </div>
          <button variant="primary" onClick={quoteDisplay}>
            New Quote
          </button>  */}

          <div className="header">
            <div className="heaidng">Touch Typing Test</div>
            <div className="details">
              <p>Accuracy {accuracy}% </p>
              <p>Speed {wpa} WPM</p>
            </div>
          </div>

          <div className="timer-wrap">
            <div className="options">
              <button onClick={()=>{setTimer( 60000) ; inputRef.current.focus()  }}>1 min</button>
              <button onClick={()=>{setTimer( 180000) ; inputRef.current.focus()   }} >3 min</button>
              <button onClick={()=>{setTimer( 300000); inputRef.current.focus()  }}>5 min</button>

            </div>
            <div className="timer">
              {clock === null ? 100: clock} sec
            </div>
          </div>

          <div className="main">
            <div ref={spamAarrayRef} className="santance"> {data}</div>
            <textarea onChange={()=>{check();  handelTime()}} type="text" ref={inputRef}  name="" id="" cols="30" rows="10"></textarea>
          </div>


          {
            close &&  (
              <Popup Accuracy = {accuracy} Speed = {wpa} setClose={setClose} ></Popup> 
            )
           
          }

          {/* <button onClick={()=>{setClose(true); stoptClock()}}>T</button> */}
          <button className="startbtn" onClick={()=>{inputRef.current.focus()}}>Click to Start</button>


          {/* <div>{startTime}</div> */}

          
        
    </div>
  );
}
