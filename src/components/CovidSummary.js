import React from 'react';
import NumberFormat from 'react-number-format';

// Import Components
import Header from './Header';
import Cards from './Cards';
import './styles/Cards.css';

function CovidSummary(props) {

    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        country,
    } = props;

    return (
        <>
            <div>
                <div>
                    <Header />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Cards>
                            <span>Total Confirmed</span> <br />
                            <span>
                                {<NumberFormat
                                    value={totalConfirmed}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />}
                            </span>
                        </Cards>
                        <Cards>
                            <span>Total Recovered</span> <br />
                            <span>{<NumberFormat
                                value={totalRecovered}
                                displayType={'text'}
                                thousandSeparator={true}
                            />}</span>
                        </Cards>
                        <Cards>
                            <span>Total Deaths</span> <br />
                            <span>{<NumberFormat
                                value={totalDeaths}
                                displayType={'text'}
                                thousandSeparator={true}
                            />}</span>
                        </Cards>
                    </div>
                    <center>
                        <h1 style={{ textTransform: 'capitalize' }}>{country === '' ? 'World Wide Covid Report' : country}</h1>
                    </center>
                </div>
            </div>
        </>
    )
}

export default CovidSummary
