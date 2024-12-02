import React from 'react'

const btnClasses = "btn mr-4 border border-gray-400 rounded px-4 py-2 mt-4"

export const Counter = () => {
    const [count, setCount] = React.useState(0)
    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)
  return (
    <section className='my-4 border border-blue-400 rounded p-4 relative'>
    <span className="absolute top-2 right-2 text-xs text-blue-500">React Component</span>
    <div>Counter: <span className="font-bold inline-block ml-2">{count}</span></div>
    <div>
        <button className={btnClasses} onClick={increment}>Increment</button>
        <button className={btnClasses} onClick={decrement}>Decrement</button>
    </div>
    </section>
  )
}
