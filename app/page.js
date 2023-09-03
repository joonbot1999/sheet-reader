'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the data is stored in local storage
        const storedData = localStorage.getItem('documentData');
        if (storedData) {
          setData(JSON.parse(storedData));
          setIsLoading(false);
          const response = await fetch('/api/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const returnedData = await response.json();
            setData(returnedData.list);
            // Store the data in local storage for future use
            localStorage.setItem('documentData', JSON.stringify(returnedData.list));
          }
        } else {
          // If data is not in local storage, fetch it from the server
          const response = await fetch('/api/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const returnedData = await response.json();
            setData(returnedData.list);
            // Store the data in local storage for future use
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

  return (
    <main className='flex justify-center'>
      <section>
        <div className="font-bold text-center">
          Todo list
        </div>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data && data.map((element, index) => (
              <div key={index}>
                Task {index + 1}: {element}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
