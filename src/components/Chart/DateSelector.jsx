import React, { useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './Chart.module.css';

const DateSelector = ({ handleChangeDate, dates, lastUpdate }) => {
    const [selectedDate, setSelectedDate] = useState('');
    useEffect(() => {
        setSelectedDate(lastUpdate);
    }, [lastUpdate]);

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        handleChangeDate(date);
    };

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect value={selectedDate} onChange={(event) => handleSelectDate(event.target.value)}>
                {dates.map((date, i) => (<option key={i} value={date}>{date}</option>))}
            </NativeSelect>
        </FormControl>
    );
}

export default DateSelector;