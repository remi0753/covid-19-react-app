import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

const App = () => {
    const [data, setData] = useState({});
    const [country, setCountry] = useState('');

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
        <div className={styles.container}>
            <div>
                <h1>COVID-19</h1>
            </div>
            <Cards data={data}/>
            <CountryPicker handleChangeCountry={handleChangeCountry}/>
            <Chart data={data} country={country}/>
        </div>
    );
}

export default App;