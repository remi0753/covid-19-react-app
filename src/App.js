import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker, Header, Footer } from './components';
import styles from './App.module.css';
import { fetchAllData } from './api';

const App = () => {
    const [country, setCountry] = useState('Global');
    const [language, setLanguage] = useState('eng');
    const [allData, setAllData] = useState([{ countries: null, date: '' }]);
    const [lastUpdate, setLastUpdate] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedAllData = await fetchAllData();

            setLastUpdate(fetchedAllData[fetchedAllData.length - 1].date);
            setAllData(fetchedAllData);
        };

        fetchAPI();
    }, []);

    const displayCardData = allData.length ? allData[allData.length - 1] : allData[0];
    const allCountries = allData[0].countries ? Object.keys(allData[allData.length - 1].countries) : [];

    return (
        <div>
            <Header language={language} handleChangeLanguage={setLanguage}/>
            <div className={styles.container}>
                <CountryPicker handleChangeCountry={setCountry} countries={allCountries} language={language}/>
                <Cards data={displayCardData} language={language} country={country}/>
                <Chart allData={allData} country={country} language={language} lastUpdate={lastUpdate}/>
            </div>
            <Footer language={language}/>
        </div>
    );
}

export default App;