import React, { useEffect, useState } from 'react'

const RecordComponent = (props) => {

    const [solveState, setSolveState] = useState(0);

    if (props.socketObj.current !== null) {
        props.socketObj.current.onmessage = async function (e) {

            if (e !== null && e !== undefined) {
                setSolveState(parseFloat(e.data))
            }

        }
    }

    useEffect(() => {
        console.log(solveState);
        if(solveState == 1){
            props.socketObj.current.close();
            props.socketObj.current = null;
        }
    }, [solveState])

    return (
        <div id='record'>
            <input value={solveState * 100}></input>
            <progress max={100} value={solveState * 100}></progress>
        </div>
    )
}

export default RecordComponent