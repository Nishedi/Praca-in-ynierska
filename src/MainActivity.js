// import React, { useState } from 'react';
// import './MainActivity.css';
// import AutoCompleteInput from './AutoCompleteInput';
// import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'; 
// function MainActivity() {
//     const [sugerowanaTrasa, setSugerowanaTrasa] = useState('');
//     const [listOfLocations, setListOfLocations] = useState([
//         // {
//         //     lat: '17.021325',
//         //     lng: '51.104418',
//         //     name: 'Wrocław'
//         // },
//         // {
//         //     lat: '19.021807',
//         //     lng: '50.264798',
//         //     name: 'Katowice'
//         // },
//         // {
//         //     lat: '16.915342',
//         //     lng: '52.407560',
//         //     name: 'Poznań'
//         // },
//         // {
//         //     lat: '19.469902',
//         //     lng: '51.760327',
//         //     name: 'Łódź'
//         // }
//     ]);
//     const handleChange = (e, index) => {
//         console.log(e.target.value);
//         const newValues = [...listOfLocations];
//         newValues[index] = e.target.value;
//         setListOfLocations(newValues);
//     };
//     const handleAddInput = () => {
//         if(listOfLocations.at(-1)==="") return; // Jeśli ostatni input jest pusty, nie dodajemy nowego
//         setListOfLocations([...listOfLocations, {id: new Date()}]); // Dodajemy nowy pusty input
//     };

//     const remove = (id) => {
//         setListOfLocations((prevListOfLocations) => prevListOfLocations.filter((location) => location.id !== id));
//     };

//     const [testInput, setTestInput] = useState('');

//     const makeRequest = async () => {
//         const message = listOfLocations;
        
//         const response = await fetch('http://localhost:3000/run-script', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message: message }),
//         });
//         const data = await response.json();
//         setSugerowanaTrasa("Optymalna trasa: "+data.sortedLocations.map(location => location.name).join(' -> '));
//     };
//     return (
//         <div className='flex-container'>
//             {console.log(listOfLocations)}
//             <button className='item' onClick={() => makeRequest(testInput)}>Run Script</button>
          
//             {listOfLocations.map((value, index) => (
//                 <div key={value.id}>
//                     {/* {console.log(value)}     */}
//                     <AutoCompleteInput 
//                         exercise={value} // Przekaż obiekt lokalizacji (lat, lng, name)
//                         setSelectedExercises={setListOfLocations} // Ustaw nową listę lokalizacji
//                         setItem={(location) => handleChange(location, index)} // Podmień cały obiekt
//                         initialValue={value}  // Przekaż początkową wartość lokalizacji (obiekt z lat, lng, name)
//                         remove={() => remove(value.id)} // Usuń lokalizację z listy
//                         // inne opcje AutoCompleteInput...
//                     />
//                 </div>
//             ))}
//             {/* {listOfLocations.map((value, index) => (
//                 <div>
//                     {index}:{value.name}
//                 </div>    
//             ))} */}
//             <button onClick={handleAddInput}>Add input</button>
//             {sugerowanaTrasa && <div className='item'>{sugerowanaTrasa}</div>}
//             <div>
//             <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={[51.505, -0.09]}>
//                     <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//             </div>
//         </div>
//     )
// }

// export default MainActivity;
import React, { useState, useEffect } from 'react';
import './MainActivity.css';
import AutoCompleteInput from './AutoCompleteInput';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet'; // Importujemy Leaflet do niestandardowej ikony
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png'; // Import domyślnego markera
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'; // Import cienia markera

// Ustawienie ikony markera
const defaultIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41], // Rozmiar markera
    iconAnchor: [12, 41], // Punkt zakotwiczenia, który wskazuje lokalizację
    popupAnchor: [1, -34], // Punkt zakotwiczenia dla popupu
    shadowSize: [41, 41]  // Rozmiar cienia
});

function MainActivity() {
    const [sugerowanaTrasa, setSugerowanaTrasa] = useState([]);
    const [listOfLocations, setListOfLocations] = useState([
        {
            "id": "2024-10-18T16:50:15.910Z",
            "location": "Mosiężna, 53-441 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Mosiężna",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "53-441",
                "suburb": "Gajowice",
                "street": "Mosiężna",
                "lon": 16.9996243,
                "lat": 51.1003307,
                "district": "Gajowice",
                "result_type": "street",
                "formatted": "Mosiężna, 53-441 Wrocław, Poland",
                "address_line1": "Mosiężna",
                "address_line2": "53-441 Wrocław, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3R4X2X+4R",
                "plus_code_short": "4X2X+4R Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.0533433333333333,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "5172c9cc60e7ff30405974a4e9a2d78c4940f00102f9010ad4590100000000c0020492030a4d6f7369c499c5bc6e61"
            }
        },
        {
            "id": "2024-10-18T16:50:23.017Z",
            "location": "Wrocław University of Science and Technology, Zygmunta Janiszewskiego, 50-373 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Wrocław University of Science and Technology",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "50-373",
                "district": "Manhattan",
                "suburb": "Plac Grunwaldzki",
                "street": "Zygmunta Janiszewskiego",
                "lon": 17.06104549756193,
                "lat": 51.1095434,
                "result_type": "amenity",
                "formatted": "Wrocław University of Science and Technology, Zygmunta Janiszewskiego, 50-373 Wrocław, Poland",
                "address_line1": "Wrocław University of Science and Technology",
                "address_line2": "Zygmunta Janiszewskiego, 50-373 Wrocław, Poland",
                "category": "education.university",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V4356+RC",
                "plus_code_short": "4356+RC Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.45255309950086675,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "51b7987fada00f3140590f3fa484058e4940f00102f901deb6864100000000c0020192032d57726f63c582617720556e6976657273697479206f6620536369656e636520616e6420546563686e6f6c6f6779"
            }
        },
        {
            "id": "2024-10-18T16:53:20.623Z",
            "location": "Dworzec Wrocław Nadodrze, plac Stanisława Staszica 50, 50-222 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Dworzec Wrocław Nadodrze",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "50-222",
                "suburb": "Nadodrze",
                "street": "plac Stanisława Staszica",
                "housenumber": "50",
                "lon": 17.032534215396993,
                "lat": 51.125477849999996,
                "district": "Nadodrze",
                "result_type": "amenity",
                "formatted": "Dworzec Wrocław Nadodrze, plac Stanisława Staszica 50, 50-222 Wrocław, Poland",
                "address_line1": "Dworzec Wrocław Nadodrze",
                "address_line2": "plac Stanisława Staszica 50, 50-222 Wrocław, Poland",
                "category": "building.transportation",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V42GM+52",
                "plus_code_short": "42GM+52 Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.27381125651268035,
                    "confidence": 1,
                    "match_type": "full_match"
                },
                "place_id": "5190218f295408314059aa0f7fa80f904940f00102f901337f0c0600000000c0020192031944776f727a65632057726f63c5826177204e61646f64727a65"
            }
        },
        {
            "id": "2024-10-18T16:53:32.315Z",
            "location": "Borek, Wrocław, Lower Silesian Voivodeship, Poland",
            "others": {
                "country": "Poland",
                "city": "Wrocław",
                "state": "Lower Silesian Voivodeship",
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "country_code": "pl",
                "suburb": "Borek",
                "lon": 17.0106071,
                "lat": 51.081853,
                "result_type": "suburb",
                "formatted": "Borek, Wrocław, Lower Silesian Voivodeship, Poland",
                "address_line1": "Borek",
                "address_line2": "Wrocław, Lower Silesian Voivodeship, Poland",
                "category": "populated_place",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V32J6+P6",
                "plus_code_short": "32J6+P6 Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.5358021943488056,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "51fc9a9b25b7023140592d0abb287a8a4940f00101f901476e230000000000c00205"
            }
        },
        {
            "id": "2024-10-19T12:56:22.490Z",
            "location": "Tarnogaj, Wrocław, Lower Silesian Voivodeship, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "suburb": "Tarnogaj",
                "lon": 17.062339,
                "lat": 51.080161,
                "result_type": "suburb",
                "formatted": "Tarnogaj, Wrocław, Lower Silesian Voivodeship, Poland",
                "address_line1": "Tarnogaj",
                "address_line2": "Wrocław, Lower Silesian Voivodeship, Poland",
                "category": "administrative",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V33J6+3W",
                "plus_code_short": "33J6+3W Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.3139400466797944,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "51ee43de72f50f31405913b534b7428a4940f00101f9013ba7230000000000c00205"
            }
        },
        {
            "id": "2024-10-19T12:56:31.701Z",
            "location": "Komisariat Policji Wrocław Ołbin, Ludwika Rydygiera 46-48, 50-249 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Komisariat Policji Wrocław Ołbin",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "50-249",
                "suburb": "Nadodrze",
                "street": "Ludwika Rydygiera",
                "housenumber": "46-48",
                "lon": 17.0321,
                "lat": 51.1209626,
                "district": "Nadodrze",
                "result_type": "amenity",
                "formatted": "Komisariat Policji Wrocław Ołbin, Ludwika Rydygiera 46-48, 50-249 Wrocław, Poland",
                "address_line1": "Komisariat Policji Wrocław Ołbin",
                "address_line2": "Ludwika Rydygiera 46-48, 50-249 Wrocław, Poland",
                "category": "service.police",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V42CJ+9R",
                "plus_code_short": "42CJ+9R Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.00000999999999995449,
                    "confidence": 1,
                    "match_type": "full_match"
                },
                "place_id": "519c33a2b437083140590285d5b37b8f4940f00103f901de6c43b500000000c002019203224b6f6d6973617269617420506f6c69636a692057726f63c5826177204fc58262696e"
            }
        },
        {
            "id": "2024-10-19T12:56:42.519Z",
            "location": "Rynek, 50-102 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Rynek",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "50-102",
                "suburb": "Stare Miasto",
                "quarter": "Four Denominations District",
                "street": "Rynek",
                "lon": 17.0331259,
                "lat": 51.1097028,
                "result_type": "street",
                "formatted": "Rynek, 50-102 Wrocław, Poland",
                "address_line1": "Rynek",
                "address_line2": "50-102 Wrocław, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V425M+V7",
                "plus_code_short": "5M+V7 Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.2733433333333333,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "518c2661f07a08314059cb23c9bd0a8e4940f00102f901bd7fc00e00000000c0020492030552796e656b"
            }
        },
        {
            "id": "2024-10-19T12:56:47.280Z",
            "location": "Wrocław Szczepin, Portowa, 53-657 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Wrocław Szczepin",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "53-657",
                "suburb": "Szczepin",
                "street": "Portowa",
                "lon": 17.0142448,
                "lat": 51.1229254,
                "district": "Szczepin",
                "result_type": "amenity",
                "formatted": "Wrocław Szczepin, Portowa, 53-657 Wrocław, Poland",
                "address_line1": "Wrocław Szczepin",
                "address_line2": "Portowa, 53-657 Wrocław, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V42F7+5M",
                "plus_code_short": "42F7+5M Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.00000999999999995449,
                    "confidence": 1,
                    "match_type": "full_match"
                },
                "place_id": "515823168ca503314059826cfe04bc8f4940f00103f90152e7db2602000000c0020192031157726f63c582617720537a637a6570696e"
            }
        },
        {
            "id": "2024-10-19T12:56:52.325Z",
            "location": "Józefa Chełmońskiego, 51-731 Wrocław, Poland",
            "others": {
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "name": "Józefa Chełmońskiego",
                "country": "Poland",
                "country_code": "pl",
                "state": "Lower Silesian Voivodeship",
                "city": "Wrocław",
                "postcode": "51-731",
                "district": "Biskupin-Sępolno-Dąbie-Bartoszowice",
                "suburb": "Biskupin",
                "street": "Józefa Chełmońskiego",
                "lon": 17.0959362,
                "lat": 51.0993434,
                "result_type": "street",
                "formatted": "Józefa Chełmońskiego, 51-731 Wrocław, Poland",
                "address_line1": "Józefa Chełmońskiego",
                "address_line2": "51-731 Wrocław, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V33XW+P9",
                "plus_code_short": "33XW+P9 Wrocław, Lower Silesian Voivodeship, Poland",
                "rank": {
                    "importance": 0.0533433333333333,
                    "confidence": 0,
                    "match_type": "full_match"
                },
                "place_id": "51a58059468f183140596709d748b78c4940f00102f9015888d30900000000c002049203174ac3b37a65666120436865c5826d6fc584736b6965676f"
            }
        },
        {
            "id": "2024-10-19T12:57:30.247Z",
            "location": "Wrocław Kowale, Wrocław, dolnoslaskie, Poland",
            "others": {
                "country_code": "pl",
                "name": "Wrocław Kowale",
                "country": "Poland",
                "county": "Wrocław",
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "state": "dolnoslaskie",
                "district": "Wrocław",
                "city": "Wrocław",
                "lon": 17.10017,
                "lat": 51.134977,
                "result_type": "suburb",
                "formatted": "Wrocław Kowale, Wrocław, dolnoslaskie, Poland",
                "address_line1": "Wrocław Kowale",
                "address_line2": "Wrocław, dolnoslaskie, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V44M2+X3",
                "plus_code_short": "44M2+X3 Wrocław, Poland",
                "rank": {
                    "confidence": 1,
                    "confidence_city_level": 1,
                    "match_type": "full_match"
                },
                "place_id": "51520ababda419314059295b24ed46914940f00103f90128f4a37201000000c0020592030f57726f63c5826177204b6f77616c65e203236f70656e7374726565746d61703a76656e75653a6e6f64652f36323138333134373932"
            }
        },
        {
            "id": "2024-10-19T12:57:36.231Z",
            "location": "Wrocław Psie Pole, Wrocław, dolnoslaskie, Poland",
            "others": {
                "country_code": "pl",
                "name": "Wrocław Psie Pole",
                "country": "Poland",
                "county": "Wrocław",
                "datasource": {
                    "sourcename": "openstreetmap",
                    "attribution": "© OpenStreetMap contributors",
                    "license": "Open Database License",
                    "url": "https://www.openstreetmap.org/copyright"
                },
                "state": "dolnoslaskie",
                "district": "Wrocław",
                "city": "Wrocław",
                "lon": 17.118545,
                "lat": 51.150452,
                "result_type": "suburb",
                "formatted": "Wrocław Psie Pole, Wrocław, dolnoslaskie, Poland",
                "address_line1": "Wrocław Psie Pole",
                "address_line2": "Wrocław, dolnoslaskie, Poland",
                "timezone": {
                    "name": "Europe/Warsaw",
                    "offset_STD": "+01:00",
                    "offset_STD_seconds": 3600,
                    "offset_DST": "+02:00",
                    "offset_DST_seconds": 7200,
                    "abbreviation_STD": "CET",
                    "abbreviation_DST": "CEST"
                },
                "plus_code": "9F3V5429+5C",
                "plus_code_short": "5429+5C Wrocław, Poland",
                "rank": {
                    "confidence": 0.9,
                    "confidence_city_level": 0.9,
                    "match_type": "full_match"
                },
                "place_id": "51b51a12f7581e31405914cfd90242934940f00103f9011980845300000000c0020592031257726f63c5826177205073696520506f6c65e203236f70656e7374726565746d61703a76656e75653a6e6f64652f31343031313932343733"
            }
        }
    ]);
    const [mapCenter] = useState([51.110307, 17.033225]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [isEditing, setIsEditing] = useState(true);

    const handleChange = (e, index) => {
        const newValues = [...listOfLocations];
        newValues[index] = e.target.value;
        setListOfLocations(newValues);
    };
    const handleAddInput = () => {
        if(listOfLocations.at(-1) === "") return; 
        setListOfLocations([...listOfLocations, {id: new Date()}]);
    };

    const remove = (id) => {
        setListOfLocations((prevListOfLocations) => prevListOfLocations.filter((location) => location.id !== id));
    };

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
        if (Array.isArray(data.sortedLocations)) {
            setSugerowanaTrasa(data.sortedLocations);
            setIsEditing(false);
        } else {
            console.error('sortedLocations is not an array:', data.sortedLocations);
        }
    };

    const FitMapToBounds = ({ locations }) => {
        const map = useMap();

        useEffect(() => {
            if (locations.length > 0) {
                const bounds = locations.map(location => {
                    if (!location.others || !location.others.lat || !location.others.lon) {
                        return null;
                    }
                    return [location.others.lat, location.others.lon];
                });
                if(bounds.includes(null)) return;
                map.fitBounds(bounds);  
            }
        }, [locations, map]);

        return null;
    };

    const fetchRoute = async (firstLocation, secondLocation) => {
        if (listOfLocations.length > 1) {
            const response = await fetch(`http://localhost:5000/route/v1/driving/${firstLocation.lon},${firstLocation.lat};${secondLocation.lon},${secondLocation.lat}?overview=full&geometries=geojson`);
            const data = await response.json();

            if (data.routes.length > 0) {
                const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Zamień kolejność lat/lon na lon/lat
                return coordinates;
            }
        }
    };

    const getRouteCoordinates = async() => {
        if(sugerowanaTrasa.length < 2) return;
        let allRoutes = [];
        for(let i=0; i<sugerowanaTrasa.length; i++){
            if(i+1 === sugerowanaTrasa.length){
                const firstLocation = sugerowanaTrasa[i].others;
                const secondLocation = sugerowanaTrasa[0].others;
                const resp = await fetchRoute(firstLocation, secondLocation);
                allRoutes.push(resp);
            }else{
                const firstLocation = sugerowanaTrasa[i].others;
                const secondLocation = sugerowanaTrasa[i+1].others;
                const resp = await fetchRoute(firstLocation, secondLocation);
                allRoutes.push(resp);
            }
        }
        setRouteCoordinates(allRoutes);
    };

    useEffect(() => {
        getRouteCoordinates();
    }, [sugerowanaTrasa]);
    

    

    return (
        <>
        {/* <h1 style={{display: 'flex', alignItems: 'center', color: 'white'}}>Kocham Amelkę 😊❤️</h1> */}
        <div className='flex-container'>
        <div className={`grid-container ${listOfLocations.length > 8 ? 'two-columns' : 'one-column'}`}>
            {/* <div className='inputs'>  */}
                {listOfLocations.map((value, index) => (
                    <div key={value.id} onChange={()=>setIsEditing(true)}>
                        <AutoCompleteInput 
                            exercise={value} 
                            setSelectedExercises={setListOfLocations} 
                            setItem={(location) => handleChange(location, index)} 
                            initialValue={value} 
                            remove={() => remove(value.id)} 
                        />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <button onClick={handleAddInput}>Add input</button>
                <button onClick={() => makeRequest()}>Run Script</button>
                </div>
            </div>  
            <div style={{ width: '500px', height: '500px' }}>
                <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                   
                    {sugerowanaTrasa && sugerowanaTrasa.length>0 && !isEditing ?  
                    <>
                        {sugerowanaTrasa.map((location, index) => (
                            location?.others?.lat && location?.others?.lon ?
                            <Marker key={index} position={[location?.others?.lat, location?.others?.lon]} icon={defaultIcon}>
                                <Popup>{index+". "+location.location}</Popup>
                            </Marker> : null  )) }
                            <FitMapToBounds locations={sugerowanaTrasa} />
                    </>
                    :
                        <>
                        {console.log(listOfLocations)}
                        {listOfLocations.map((location, index) => (
                            location?.others?.lat && location?.others?.lon ?
                            <Marker key={index} position={[location?.others?.lat, location?.others?.lon]} icon={defaultIcon}>
                                <Popup>{location.location}</Popup>
                            </Marker> : null  ))  }
                            <FitMapToBounds locations={listOfLocations} /> 
                        </>
                    }
                    
                    {routeCoordinates.length > 0 && !isEditing && <Polyline positions={routeCoordinates} color="blue" />}
                </MapContainer>
            </div>
        </div>
        </>
    );
}

export default MainActivity;
