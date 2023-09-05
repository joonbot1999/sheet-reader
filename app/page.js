'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completeStates, setCompleteStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('documentData');
        if (storedData) {
          setData(JSON.parse(storedData));
          setCompleteStates(Array(JSON.parse(storedData).length).fill(false));
          setIsLoading(false);
        } else {
          const response = await fetch('/api/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const returnedData = await response.json();
            setData(returnedData.list);
            setCompleteStates(Array(returnedData.list.length).fill(false));
            localStorage.setItem('documentData', JSON.stringify(returnedData.list));
          } else {
            console.error('Failed to fetch data from the server');
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompleteToggle = (index) => {
    const newCompleteStates = [...completeStates];
    newCompleteStates[index] = !newCompleteStates[index];
    setCompleteStates(newCompleteStates);
  };

  return (
    <main className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <section className='bg-white p-4 shadow-md rounded-md w-1/2'>
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data && data.map((element, index) => (
              <motion.div 
              className='flex items-center justify-between border-b-2 py-2' 
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}>
                <motion.div 
                  animate={completeStates[index] ? {opacity: 0.2, color: 'green'} : {opacity: 1, color: 'black'}}
                  transition={{duration: 1}}
                  className={`flex items-center`}
                >
                  Task {index + 1}: {element}
                </motion.div>
                <motion.div
                  whileHover={{scale: 1.5}}
                  className={`w-5 h-5 cursor-pointer ${completeStates[index] ? 'bg-green-600' : 'bg-slate-400'}`}
                  onClick={() => handleCompleteToggle(index)}
                >
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
