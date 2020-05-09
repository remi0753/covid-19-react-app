import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker, Header } from './components';
import styles from './App.module.css';
import { fetchData, fetchAllData } from './api';
import CountryData from './components/Data/CountryData';

const App = () => {
    const [data, setData] = useState({});
    const [country, setCountry] = useState({ country: '', draw: '', iso3: '' });
    const [language, setLanguage] = useState('eng');
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchData();
            const fetchedAllData = await fetchAllData();
  
            setData(fetchedData);
            setAllData(fetchedAllData);
        };

        fetchAPI();
    }, []);

    const handleChangeCountry = async ({ country, draw, iso3 }) => {
        const fetchedData = await fetchData(country);

        setCountry({ country, draw, iso3 });
        setData(fetchedData);
    };

    const handleChangeLanguage = (lang) => {
        const searchIso3 = country.iso3;
        const foundCountry = searchIso3 ? CountryData.find(({ iso3 }) => iso3 === searchIso3) : null;
        setCountry({...country, draw: foundCountry ? foundCountry.name[lang] : country.country });
        setLanguage(lang);
    }

    return (
        <div>
            <Header language={language} handleChangeLanguage={handleChangeLanguage}/>
            <div className={styles.container}>
                <Cards data={data} data1={allData.length ? allData[allData.length - 1] : null} language={language}/>
                <CountryPicker handleChangeCountry={handleChangeCountry} language={language}/>
                <Chart data={data} country={country} language={language}/>
            </div>            
        </div>
    );
}

export default App;