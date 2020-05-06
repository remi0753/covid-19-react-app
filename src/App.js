import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker, Header } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

const App = () => {
    const [data, setData] = useState({});
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('eng');

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchData();

            setData(fetchedData);
        };

        fetchAPI();
    }, []);

    const handleChangeCountry = async (country) => {
        const fetchedData = await fetchData(country);

        setCountry(country);
        setData(fetchedData);
    };

    return (
        <div>
            <Header language={language} handleChangeLanguage={setLanguage}/>
            <div className={styles.container}>
                <Cards data={data}/>
                <CountryPicker handleChangeCountry={handleChangeCountry}/>
                <Chart data={data} country={country}/>
            </div>            
        </div>
    );
}

export default App;