import React, {useState, useEffect} from 'react';

const Timer = (props) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
    let interval;
    interval = setInterval(() => {
        setTimer(timer + 1);
        }, 10);

    })

    return (
        <div className="Timer">
            <span>{("0" + Math.floor((timer / 60000) % 60)).slice(-2)}</span>
        </div>
    )
}

export default Timer