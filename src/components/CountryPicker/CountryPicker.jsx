import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import CountryData from '../Data/CountryData';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleChangeCountry, language }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        };

        fetchAPI();
    }, [setFetchedCountries]);

    const handleSelectCountry = (value) => {
        const data = value.split('/');
        handleChangeCountry({ country: data[0], draw: data[1], iso3: data[2] });
    };

    const global = language === 'eng' ? 'Global' : '全世界';

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handleSelectCountry(event.target.value)}>
                <option value={'/' + global + '/'}>{global}</option>
                {fetchedCountries.map(({ name, iso3 }, i) => {
                    let drawName = name;
                    let value;

                    if (iso3) {
                        const country = CountryData.find((c) => (c.iso3 === iso3));
                        drawName = country ? country.name[language] : name;
                        value = country ? (name + '/' + drawName + '/' + iso3) : (name + '/' + name + '/' + iso3);
                    } else {
                        value = name + '/' + name + '/';
                    }

                    return (<option key={i} value={value}>{drawName}</option>);
                })}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;