import React ,{useCallback, useState} from 'react'
import TestChild from './TestChild'

export default function Test() {
    const [count, setCount] = useState(0)
    const [input, setInput] = useState("")

    const updateChildCount = useCallback(()=>setCount(count+1), [count])
    
    return (
        <div>
            This will increment: {count}
            <br></br>
            <button onClick={()=>setCount(count +1)}>increment</button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            <TestChild count={count} updateChildCount={updateChildCount}/>
        </div>
    )
}
