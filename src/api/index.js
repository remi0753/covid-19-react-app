import axios from 'axios';

const URL = 'https://covid19.mathdro.id/api';
const confirmedCsvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const recoveredCsvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsCsvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
const isoTableUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv';

export const fetchData = async (country) => {
    const changeableURL = country ? `${URL}/countries/${country}` : URL;
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(changeableURL);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`);

        //console.log(data);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            recovered: dailyData.recovered.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${URL}/countries`);

        return countries.map((country) => ({ name: country.name, iso3: country.iso3 }));
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllData = async () => {
    const generateData = async (url) => {
        return (await axios.get(url))
            //改行区切りのデータに
            .data.split('\n')
            //それぞれをカンマで区切る
            .map((row) => row.split(','))
            //緯度経度と地方情報を省く
            .map((row) => row.filter((_, index) => index === 1 || index > 3))
            //数字をNumber型に変換
            .map((row, rowIndex) => row.map((data, dataIndex) => (rowIndex !== 0 && dataIndex !== 0) ? Number.parseInt(data) : data))
            //重複国データをまとめる
            .reduce((accum, row) => {
                if (accum.find((accumRow) => accumRow[0] === row[0])) {
                    const value = accum.map((accumRow) => 
                        accumRow[0] === row[0] ? 
                        accumRow.map((rowData, i) => i === 0 ? rowData : rowData + row[i]) :
                        accumRow
                    );
                    return value;
                } else {
                    return [...accum, row];
                }
            }, []);
    };
    
    const generateGlobalData = (table, date) => {
        return table
            .filter((_, i) => i !== 0 || i === table.length - 1)
            .reduce((accum, row) => {
                if (row.length !== 0) {
                    const r = row.filter((_, i) => i !== 0)[date] + accum;
                    return r;
                } else {
                    return accum; 
                }
            }, 0);
    };

    //csv to obj
    const confirmedTable = await generateData(confirmedCsvUrl);      
    const recoveredTable = await generateData(recoveredCsvUrl); 
    const deathsTable = await generateData(deathsCsvUrl);

    const countries = confirmedTable[0]
        .filter((_, i) => i !== 0)
        .map((date, index) => {
            const dateData = date.split('/');
            const fixedDate = '2020-' + ('0' + dateData[0]).slice(-2) + '-' + ('0' + dateData[1]).slice(-2);
            const confirmed = generateGlobalData(confirmedTable, index);
            const recovered = generateGlobalData(recoveredTable, index);
            const deaths = generateGlobalData(deathsTable, index);
            const countries = confirmedTable
                .filter((_, i) => i !== 0)
                .reduce((accum, country) => {
                    const searchedRecovered = recoveredTable.find((row) => row[0] === country[0]);
                    const searchedDeaths = deathsTable.find((row) => row[0] === country[0]);
                    const recoveredValue = searchedRecovered ? searchedRecovered[index] : 0;
                    const deathsValue = searchedDeaths ? searchedDeaths[index] : 0;
                    const confirmedValue = country[index];
                    return country[0] ? {
                        ...accum, 
                            [country[0]]: {
                            confirmed: confirmedValue,
                            recovered: recoveredValue,
                            deaths: deathsValue,
                            active: confirmedValue - recoveredValue - deathsValue,
                        }
                    } : accum;
                }, {});
            return {
                date: fixedDate,
                countries: {
                    ...countries,
                    Global: {
                        confirmed,
                        recovered,
                        deaths,
                        active: confirmed - recovered - deaths,
                    },
                },
            };
        });

    return countries;
};

export const fetchIsoTable = async () => {       
    const isoDataTable = (await axios.get(isoTableUrl))
        .data.split('\n')
        .map((row) => row.split(','))
        .filter((row) => row[6] === '')
        .map((row) => row.filter((_, i) => i === 2 || i === 7));

    return [
        ...isoDataTable,
        ["GLB", "Global"],
    ];
}