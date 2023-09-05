'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  let globalArray = JSON.parse(localStorage.getItem('documentData')) || [];
  const [data, setData] = useState(globalArray);
  const [update, setUpdate] = useState(false);
  const [key, makeRef] = useState(null);
  const inputRef = useRef(null);
  const updateRef = useRef(null);
  const router = useRouter();

  // if the list is empty, redirect to the main page
  useEffect(() => {
    if (globalArray.length === 0) {
      router.push("/");
    }
    setData([...globalArray]);
  }, []);

  // handles post function
  async function handlePost() {
    try {
      const inputValue = inputRef.current.value;
      if (data.includes(inputValue)) {
        alert("Task already exists");
      } else if (inputValue === "") {
        alert("Task cannot be empty");
      } else {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputValue }),
        });
        if (response.status === 200) {
          setData([...data, inputValue]);
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

  // handles update function 
  async function handleUpdate() {
    makeRef(null);
    setUpdate(!update);
    try {
      const updateValue = updateRef.current.value;
      if (data.includes(updateValue)) {
        alert("Task already exists");
      } else if (updateValue === "") {
        alert("Task cannot be empty");
      } else {
        const response = await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateValue, key }),
        });
        if (response.status === 200) {
          // updates the local storage
          globalArray[key] = updateValue;
          setData(globalArray);
          localStorage.setItem('documentData', JSON.stringify(globalArray));
        } else {
          alert("Something went wrong");
        }
        makeRef(null);
        setUpdate(!update);
      }
      updateRef.current.value = "";
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex justify-center h-screen bg-gray-100'
    >
      <section
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white p-6 rounded-lg shadow-md w-1/2'
      >
        <h1
          className='text-2xl font-bold text-center mb-4'
        >
          Update or Add a Task
        </h1>
        {data &&
          data.map((element, key) => (
            <motion.div
              key={key}
              className='flex items-center justify-between mb-2'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + key * 0.1 }}
            >
              <motion.div
                className={`text-lg ${
                  update === key ? 'line-through text-green-600' : 'text-black'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Task {key + 1}: {element}
              </motion.div>
              <motion.button
                className={`px-4 py-2 bg-orange-300 text-zinc-700 rounded-md ${
                  update === key ? 'hidden' : 'block'
                }`}
                onClick={() => {
                  setUpdate(!update);
                  makeRef(key);
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Update
              </motion.button>
            </motion.div>
          ))}
        <AnimatePresence>
        {update && (
          <motion.div
            className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-slate-500 z-10 shadow-lg p-6 rounded-lg flex items-center justify-center w-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <section className="flex flex-col items-center">
              <motion.div
                className='mb-4 text-xl font-bold'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Update Task {key + 1}
              </motion.div>
              <input
                ref={updateRef}
                placeholder='Updating task...'
                className='px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              ></input>
            </section>
            <motion.div
              className='ml-5 flex flex-col'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => handleUpdate()}
                className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'
                whileHover={{ scale: 1.1 }}
              >
                Update
              </motion.button>
              <motion.button
                onClick={() => {
                  setUpdate(!update);
                  updateRef.current.value = "";
                }}
                className='px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700'
                whileHover={{ scale: 1.1 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
        <div className='mt-5'>
          <input
            ref={inputRef}
            placeholder='Add a new task...'
            className='px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
          ></input>
          <motion.button
            onClick={() => handlePost()}
            className='px-4 py-2 ml-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700'
            whileHover={{ scale: 1.1 }}
          >
            Add
          </motion.button>
        </div>
      </section>
    </motion.main>
  );
}
