import React from 'react'

interface Props {
    title: string,
    deadline: string
    priority: string
    tag: string
    cssPriority: string
}

const Todotask = ({ title, deadline, priority, tag, cssPriority}: Props) => {
  return (
    <div className={`flex flex-col border p-4 gap-6 rounded-xl shadow-xl ${cssPriority}`}>
        <h4 className='font-bold text-xl'>{title} - {deadline}</h4>
        <p>{priority}</p>
        <p className='font-bold'>#{tag}</p>
    </div>
  )
}

export default Todotask