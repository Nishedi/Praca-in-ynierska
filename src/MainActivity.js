import React, { useState } from 'react';
import './MainActivity.css';
import AutoCompleteInput from './AutoCompleteInput';

function MainActivity() {
    const [sugerowanaTrasa, setSugerowanaTrasa] = useState('');
    const [listOfLocations, setListOfLocations] = useState([
        // {
        //     lat: '17.021325',
        //     lng: '51.104418',
        //     name: 'Wrocław'
        // },
        // {
        //     lat: '19.021807',
        //     lng: '50.264798',
        //     name: 'Katowice'
        // },
        // {
        //     lat: '16.915342',
        //     lng: '52.407560',
        //     name: 'Poznań'
        // },
        // {
        //     lat: '19.469902',
        //     lng: '51.760327',
        //     name: 'Łódź'
        // }
    ]);
    const handleChange = (e, index) => {
        console.log(e.target.value);
        const newValues = [...listOfLocations];
        newValues[index] = e.target.value;
        setListOfLocations(newValues);
    };
    const handleAddInput = () => {
        if(listOfLocations.at(-1)==="") return; // Jeśli ostatni input jest pusty, nie dodajemy nowego
        setListOfLocations([...listOfLocations, {id: new Date()}]); // Dodajemy nowy pusty input
    };

    const remove = (id) => {
        setListOfLocations((prevListOfLocations) => prevListOfLocations.filter((location) => location.id !== id));
    };

    const [testInput, setTestInput] = useState('');
    const [locations, setLocations] = useState([]);

    const makeRequest = async () => {
        const message = listOfLocations;
        
        const response = await fetch('http://localhost:3000/run-script', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        const data = await response.json();
        setSugerowanaTrasa("Optymalna trasa: "+data.sortedLocations.map(location => location.name).join(' -> '));
    };
    return (
        <div className='flex-container'>
            {console.log(listOfLocations)}
            <button className='item' onClick={() => makeRequest(testInput)}>Run Script</button>
          
            {listOfLocations.map((value, index) => (
                <div key={value.id}>
                    {/* {console.log(value)}     */}
                    <AutoCompleteInput 
                        exercise={value} // Przekaż obiekt lokalizacji (lat, lng, name)
                        setSelectedExercises={setListOfLocations} // Ustaw nową listę lokalizacji
                        setItem={(location) => handleChange(location, index)} // Podmień cały obiekt
                        initialValue={value}  // Przekaż początkową wartość lokalizacji (obiekt z lat, lng, name)
                        remove={() => remove(value.id)} // Usuń lokalizację z listy
                        // inne opcje AutoCompleteInput...
                    />
                </div>
            ))}
            {/* {listOfLocations.map((value, index) => (
                <div>
                    {index}:{value.name}
                </div>    
            ))} */}
            <button onClick={handleAddInput}>Add input</button>
            {sugerowanaTrasa && <div className='item'>{sugerowanaTrasa}</div>}
        </div>
    )
}

export default MainActivity;
