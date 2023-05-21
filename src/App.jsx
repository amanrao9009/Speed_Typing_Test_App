import React from "react";
import { useState , useRef } from "react";

export default function Quotable() {
  const [data, setData] = React.useState(null);
  const inputRef = useRef();
  const spamAarrayRef = useRef("asdf")

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
    await getQuote();      
  }








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
     if(correct){
      quoteDisplay();
     }
    setData(newArr)
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
              <p>Accuracy 100% </p>
              <p>Speed 50 WPM</p>
            </div>
          </div>

          <div className="timer-wrap">
            <div className="options">
              <button>1 min</button>
              <button>3 min</button>
              <button>5 min</button>

            </div>
            <div className="timer">
              100 sec
            </div>
          </div>

          <div className="main">
            <div ref={spamAarrayRef} className="santance"> {data}</div>
            <textarea onChange={()=>{check()}} type="text" ref={inputRef}  name="" id="" cols="30" rows="10"></textarea>
          </div>
        
    </div>
  );
}
