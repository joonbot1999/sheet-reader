'use client'
import { headers } from '@/next.config';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    // Initialize globalArray by retrieving it from localStorage
    let globalArray = JSON.parse(localStorage.getItem('documentData')) || [];
    const [data, setData] = useState(globalArray);
    const [update, setUpdate] = useState(false);
    const [key, makeRef] = useState(null);
    const inputRef = useRef(null);
    const updateRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        // You can update globalArray here when necessary
        // globalArray = ...
        // localStorage.setItem('documentData', JSON.stringify(globalArray));
        
        // Update the state with the data from globalArray
        if (globalArray.length == 0) {
            router.push("/");
        }
        setData([...globalArray]);
    }, []);

    async function handlePost() {
        try {
            const inputValue = inputRef.current.value;
            if (data.includes(inputValue)) {
                alert("Task already exists");
            } else {
                const response = await fetch('/api/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputValue }),
                });
                if (response.status === 200) {
                    // Update the state with the new task
                    setData([...data, inputValue]);

                    // Update the globalArray
                    globalArray.push(inputValue);
                    localStorage.setItem('documentData', JSON.stringify(globalArray));
                } else {
                    alert("Something went wrong");
                }
            }
            inputRef.current.value = "";
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
        }
    }

    async function handleUpdate() {
        makeRef(null)
        setUpdate(!update)
        try {
            const updateValue = updateRef.current.value;
            if (data.includes(updateValue)) {
                alert("Task already exists");
            } else {
                const response = await fetch('/api/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ updateValue, key }),
                });
                if (response.status === 200) {
                    // Update the state with the new task 
                    globalArray[key] = updateValue;
                    setData(globalArray);

                    // Update the globalArray
                    localStorage.setItem('documentData', JSON.stringify(globalArray));
                } else {
                    alert("Something went wrong");
                }
                makeRef(null)
                setUpdate(!update)
            }
            inputRef.current.value = "";
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
        }
    }

    return (
        <main className='flex justify-center'>
            <section>
                <div className="font-bold text-center">
                    Update or add a task
                </div>
                <div>
                    {data && data.map((element, key) => (
                        <div className='flex'>
                            <div key={key}>
                                Task {key + 1}: {element}
                            </div>
                            <button className="bg-orange-300 text-zinc-700 rounded-md" onClick={() => {
                                setUpdate(!update);
                                makeRef(key);
                            }}>Update</button>
                        </div>
                    ))}
                </div>
                {update && (
                    <div className="absolute bg-slate-500 z-10 shadow-lg left-1/4 top-1/4 transform h-1/3 w-1/2 p-6 rounded-lg flex items-center justify-center">
                        <section className="flex-col">
                            <div>
                                Update task with reference {key + 1}
                            </div>
                            <input ref={updateRef} placeholder='updating task.....'></input>
                        </section>
                        <div className='ml-5 flex-col'>
                            <div>
                                <button onClick={() => handleUpdate()}>Update</button>
                            </div>
                            <div>
                                <button onClick={() => {setUpdate(!update)}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-5">
                    <input ref={inputRef} placeholder='add a new task'></input>
                    <button onClick={() => handlePost()}>add</button>
                </div>
            </section>
        </main>
    );
}
