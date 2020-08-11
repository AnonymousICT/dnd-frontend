import React, { memo, useMemo } from 'react'

const TestChild = props => {
    const {count, updateChildCount} = props

    const childNumber = useMemo(()=> {
        let output = 0;
        for(let i=0; i < 500000000; i++) {
        output++;
}
    return output } ,[]);

    console.log("I only want to see this when the child NEEDS to rerender")

    return (
        <div>
            I'm a child {childNumber} {count}
            <br />
            <button onClick={updateChildCount}>child count increment</button>
        </div>
    )
}

export default memo(TestChild)