import React, { useEffect, useState } from 'react';
import './style.css';
import axios from './axios';

// Import Components
import LineGraph from './components/LineGraph';
import CovidSummary from './components/CovidSummary';
import Footer from './components/Footer';

function App() {

    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const [totalRecovered, setTotalRecovered] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [iscovidSummary, setCovidSummary] = useState({});
    const [country, setCountry] = useState('');
    const [covidCountArr, setCovidCountArr] = useState([]);
    const [label, setLabel] = useState([]);

    //componentDidMount
    useEffect(() => {

        setLoading(true);
        axios.get(`/summary`)
            .then(res => {
                setLoading(false);
                if (res.status === 200) {
                    setTotalConfirmed(res.data.Global.TotalConfirmed);
                    setTotalRecovered(res.data.Global.NewRecovered);
                    setTotalDeaths(res.data.Global.TotalDeaths);
                    setCovidSummary(res.data);
                }
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2);
        const _date = d.getDate();
        return `${year}-${month}-${_date}`
    }


    const countryHandler = (e) => {
        setCountry(e.target.value);
        const d = new Date();
        const to = formatDate(d);
        const from = formatDate(d.setDate(d.getDate() - 7));

        // console.log(from, to);

        getCovidReportByDateRange(e.target.value, from, to);
    }



    const getCovidReportByDateRange = (countrySlug, from, to) => {
        axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
            .then(res => {
                console.log(res);

                const yAxisCovidCount = res.data.map(d => d.Cases);
                const xAxisLabel = res.data.map(d => d.Date);
                const covidDetails = iscovidSummary.Countries.find(country => country.Slug === countrySlug);

                setCovidCountArr(yAxisCovidCount);
                setTotalConfirmed(covidDetails.TotalConfirmed);
                setTotalRecovered(covidDetails.TotalRecovered);
                setTotalDeaths(covidDetails.TotalDeaths);
                setLabel(xAxisLabel);
            })
            .catch(error => {
                console.log(error);
            })
    }


    if (isLoading) {
        return <p>Loading....</p>
    }

    return (
        <>
            <CovidSummary
                totalConfirmed={totalConfirmed}
                totalRecovered={totalRecovered}
                totalDeaths={totalDeaths}
                country={country}
            />

            <div>
                <center>
                    <select
                        value={country}
                        className="select_country"
                        onChange={countryHandler}
                    >
                        <option value="">Select Country</option>

                        {
                            iscovidSummary.Countries && iscovidSummary.Countries.map(country =>
                                <option key={country.Slug} value={country.Slug}>{country.Country}</option>
                            )
                        }
                    </select>
                </center>

            </div>

            <LineGraph
                yAxis={covidCountArr}
                label={label}
            />

            <Footer />
        </>
    )
}

export default App;
