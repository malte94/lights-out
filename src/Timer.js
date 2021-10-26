import React, {useState, useEffect} from 'react';

export default function Timer(){
    const [timer, setTimer] = useState(0);

    useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    })

    return (
        <div className="Timer">
            <span>Verstrichen: {timer}</span>
        </div>
    )
}