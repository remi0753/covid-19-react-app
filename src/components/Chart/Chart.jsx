import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import sentences from './Sentences';
import DateSelector from './DateSelector';

const Chart = ({ allData, country, language, lastUpdate }) => {
    const [barDate, setBarDate] = useState('');

    useEffect(() => {
        setBarDate(lastUpdate);
    }, [lastUpdate]);

    if (!allData[0].countries) {
        return 'Loading ...';
    }

    const { 
        confirmed: confirmedLabel, 
        recovered: recoveredLabel, 
        deaths: deathsLabel, 
        active: activeLabel,
        barLabel
    } = sentences[language];

    const settings = {
        confirmed: {
            label: confirmedLabel,
            borderColor: '#3333FF',
            backgroundColor: '',
            barColor: 'rgba(0, 0, 255, 0.5)',
        },
        recovered: {
            label: recoveredLabel,
            borderColor: 'green',
            backgroundColor: '',
            barColor: 'rgba(0, 255, 0, 0.5)',
        },
        deaths: {
            label: deathsLabel,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            barColor: 'rgba(255, 0, 0, 0.5)',
        },
        active: {
            label: activeLabel,
            borderColor: 'yellow',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            barColor: 'rgba(255, 255, 0, 0.5)',
        }
    };

    const lineChartDataSets = Object.keys(settings)
        .map((dataType) => {
            const { label, borderColor, backgroundColor } = settings[dataType];
            return {
                data: allData.map(({ countries }) => countries[country][dataType]),
                label, borderColor, 
                backgroundColor,
                fill: true,
            };
        });

    const lineChart = (
        <Line 
            data={{
                labels: allData.map(({ date }) => date),
                datasets: lineChartDataSets,
            }}
            height={window.innerWidth > 770 ? 150 : 250}
            option={{ maintainAspectRation: false }}
        />
    );

    const displayData = allData
        .find(({ date }) => date === barDate)
        .countries[country];
    const barChartDataSet = Object.keys(displayData)
        .map((dataType) => displayData[dataType]);

    const barChart = (
        <Bar 
            data={{
                labels: window.innerWidth > 770 ? Object.keys(settings).map((dataType) => settings[dataType].label) : ['', '', '', ''],
                datasets: [{
                    label: barLabel,
                    backgroundColor: Object.keys(settings).map((dataType) => settings[dataType].barColor),
                    data: barChartDataSet,
                }],
            }}
            options={{
                maintainAspectRatio: true,
            }}
            height={window.innerWidth > 770 ? 150 : 200}
        />
    );

    return (
        <div className={styles.container}>
            {lineChart}
            <DateSelector handleChangeDate={setBarDate} dates={allData.map(({ date }) => date).reverse()} lastUpdate={lastUpdate}/>
            {barChart}
        </div>
    );
}

export default Chart;