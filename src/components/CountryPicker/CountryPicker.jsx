import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import CountryData from '../Data/CountryData';

import { fetchIsoTable } from '../../api';

const CountryPicker = ({ handleChangeCountry, language, countries }) => {
    const [isoTable, setIsoTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('Global');

    useEffect(() => {
        const fetchAPI = async () => {
            setIsoTable(await fetchIsoTable());
        };

        fetchAPI();
    }, []);

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        handleChangeCountry(country);
    };

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect value={selectedCountry} onChange={(event) => handleSelectCountry(event.target.value)}>
                {countries.map((country, i) => {
                    const searchedDataFromTable = isoTable.find((data) => data[1] === country);
                    const iso3 = searchedDataFromTable ? searchedDataFromTable[0] : '';
                    let displayName = country;

                    if (iso3) {
                        const searchedDataFromCountry = CountryData.find((c) => (c.iso3 === iso3));
                        displayName = searchedDataFromCountry ? searchedDataFromCountry.name[language] : country;
                    }

                    return (<option key={i} value={country}>{displayName}</option>);
                })}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;