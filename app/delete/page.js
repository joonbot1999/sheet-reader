'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
    // Initialize globalArray by retrieving it from localStorage
    let globalArray = JSON.parse(localStorage.getItem('documentData')) || [];
    const [data, setData] = useState(globalArray);
    const router = useRouter();

    useEffect(() => {
        if (globalArray.length === 0) {
            router.push("/");
        }
        setData([...globalArray]);
    }, []);

    async function handleDelete(key) {
        try {
            const response = await fetch('/api/update', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key }),
            });
            if (response.status === 200) {
                globalArray.splice(key, 1);
                setData(globalArray);
                localStorage.setItem('documentData', JSON.stringify(globalArray));
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
        }
    }

    return (
        <main className='flex justify-center min-h-screen bg-gray-100'>
            <section className=' bg-white p-6 rounded-lg shadow-md w-1/2'>
                <h1 className='text-2xl font-bold text-center mb-4'>Update or Add a Task</h1>
                <AnimatePresence>
                {data && data.map((element, key) => (
                    <motion.div 
                        initial={{x:-1000}}
                        animate={{x:0}}
                        exit={{x:1000}}
                        className='flex items-center justify-between mb-2' 
                        transition={{ duration: 0.5, delay: 0.2 + key * 0.1 }}
                        key={key}
                    >
                        <div className='text-lg text-black'>
                            Task {key + 1}: {element}
                        </div>
                        <button
                            className='px-4 py-2 bg-orange-300 text-zinc-700 rounded-md'
                            onClick={() => {
                                handleDelete(key);
                            }}
                        >
                            Delete
                        </button>
                    </motion.div>
                ))}
                </AnimatePresence>
            </section>
        </main>
    );
}
