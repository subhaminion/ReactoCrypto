import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'reactstrap';

import Title from "./components/Title";
import Coindata from "./components/Coindata";

const API = 'https://api.coinmarketcap.com/v2/global/';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
          value: {
            active_cryptocurrencies: undefined,
            active_markets: undefined,
            bitcoin_percentage_of_market_cap: undefined,
            total_market_cap: undefined,
            total_volume_24h: undefined
          }
        }
    }

    componentDidMount() {
        fetch(API)
          .then(response => response.json())
          .then(json => {
            this.setState({
                value: {
                    active_cryptocurrencies: json.data.active_cryptocurrencies,
                    active_markets: json.data.active_markets,
                    bitcoin_percentage_of_market_cap: json.data.bitcoin_percentage_of_market_cap,
                    total_market_cap: json.data.quotes.USD.total_market_cap,
                    total_volume_24h: json.data.quotes.USD.total_volume_24h
                }
            });
          });
    }


    render() {
        console.log(this.state)
        return (
          <div>
            <nav className="navbar navbar-fixed-top bg-light">
              <div className="row">
                <Title />
              </div>
              <div>
                <Coindata
                    active_cryptocurrencies= {this.state.value.active_cryptocurrencies}
                    active_markets= {this.state.value.active_markets}
                    bitcoin_percentage_of_market_cap= {this.state.value.bitcoin_percentage_of_market_cap}
                    total_market_cap= {this.state.value.total_market_cap}
                    total_volume_24h= {this.state.value.total_volume_24h}
                />
              </div>
            </nav>
          </div>
        );
    }
}

export default App;
