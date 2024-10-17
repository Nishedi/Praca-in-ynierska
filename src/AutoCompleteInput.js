import React, { useEffect, useState } from 'react';
import styles from './AutoComplete.module.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const AutoCompleteInput = ({ exercise, setSelectedExercises, remove}) => {
    const [location, setLocation] = useState(exercise?.location||'');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // Funkcja do aktualizacji liczby powtórzeń
    /*   const updateExercise = () => {
        if(location){
            console.log(exercise.id);
            setSelectedExercises((prevExercises) =>
                prevExercises.map((item) =>(
                    item.id === exercise.id
                        ? { ...item, location: location } // Zaktualizuj tylko czas trwania
                        : item // Zwróć niezmienione elementy
                )
                    
                )
            );
        }
    };*/

    const getSuggestions = async (value) => {
        const promise = new Promise((resolve, reject) => {        
            const apiKey = "3351739dfa204e19a0a0177749229cc9";
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent("Wrocław " + location)}&limit=1&apiKey=${apiKey}`;
            if (location.length >= 3) {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.json().then(data => {
                                reject(data);
                                throw new Error(data);
                            });
                        }
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            }
        });
    
        promise.then((data) => {
            setSuggestions(data.features);
        }
        );
    }

    useEffect(() => {
        // return;
        if(location.length >= 5)
            getSuggestions(location);
    },[location]);


    return (
        <div>
            {/* <div>{exercise?.location}</div> */}
            <div className={styles.exercise_details}>
                <div className={styles.wholeInput}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder='Podaj lokalizację'
                        value={location}
                        onKeyDownCapture={() => setIsDropdownVisible(true)}
                        onChange={(e)=>{setLocation(e.target.value);}}
                    />
                    <IoIosClose
                        onClick={() => {
                                    setLocation("");
                                    setIsDropdownVisible(false);
                                    setSuggestions([]);
                                    setSelectedExercises((prevExercises) =>
                                        prevExercises.map((item) =>(
                                            item.id === exercise.id
                                                ? { ...item, location: ""}
                                                : item 
                                        ))
                                    );
                                }}
                        className={styles.test} 
                    />
                    {isDropdownVisible && (
                    <div className={styles.suggestions}>
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className={styles.suggestion}
                                onClick={() => {
                                    setLocation(suggestion.properties.formatted);
                                    setIsDropdownVisible(false);
                                    setSuggestions([]);
                                    setSelectedExercises((prevExercises) =>
                                        prevExercises.map((item) =>(
                                            item.id === exercise.id
                                                ? { ...item, location: suggestion.properties.formatted}
                                                : item 
                                        ))
                                    );
                                }}
                            >
                                {suggestion?.properties?.formatted ? suggestion.properties.formatted : suggestion.properties.name} 
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                <FaRegTrashAlt
                        onClick={() => {remove(exercise.id); setLocation(exercise.location);}}
                        className={styles.trash}
                    />
            </div>
        </div>
    );
};

export default AutoCompleteInput;
