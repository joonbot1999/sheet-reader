'use client'
import { headers } from '@/next.config';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedData = localStorage.getItem('documentData');
        console.log(storedData)
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, [])

    async function handlePost() {
        try {
            const inputValue = inputRef.current.value
            if (data.includes(inputValue)) {
                alert("task already exists")
            } else {
                const response = await fetch('/api/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applicatio/json'
                    },
                    body: JSON.stringify({inputValue})
                })
                if (response.status === 200) {
                    setData([...data, inputValue])
                } else {
                    alert("Something went wrong")
                }
            }
            inputRef.current.value = ""
        } catch (error) {
            
        }
    }

    return (
        <main className='flex justify-center'>
        <section>
            <div className="font-bold text-center">
            Update or add a task
            </div>
            <div>
                {data && data.map((element, index) => (
                <div key={index}>
                    Task {index + 1}: {element}
                </div>
                ))}
            </div>
            <div className="mt-5">
                <input ref={inputRef} placeholder='add a new task'></input>
                <button onClick={() => handlePost()}>add</button>
            </div>
        </section>
        </main>
    );
}
