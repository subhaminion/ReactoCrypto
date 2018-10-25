import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'reactstrap';

import Title from "./components/Title";
import Coindata from "./components/Coindata";

const GLOBAL_COIN_API = 'https://api.coinmarketcap.com/v2/global/';
const COIN_API = 'https://api.coinmarketcap.com/v2/ticker/?limit=10';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
          g_coin_val: {
            active_cryptocurrencies: undefined,
            active_markets: undefined,
            bitcoin_percentage_of_market_cap: undefined,
            total_market_cap: undefined,
            total_volume_24h: undefined
          },
          coins: []
        }
    }

    componentDidMount() {
        fetch(GLOBAL_COIN_API)
          .then(response => response.json())
          .then(json => {
            this.setState({
                g_coin_val: {
                    active_cryptocurrencies: json.data.active_cryptocurrencies,
                    active_markets: json.data.active_markets,
                    bitcoin_percentage_of_market_cap: json.data.bitcoin_percentage_of_market_cap,
                    total_market_cap: json.data.quotes.USD.total_market_cap,
                    total_volume_24h: json.data.quotes.USD.total_volume_24h
                }
            });
        });

        fetch(COIN_API)
          .then(response => response.json())
          .then(json => {
            this.setState({
                coins: json.data
            });
        });

    }


    render() {
        console.log(this.state.coins)
        var arr = [];
        for (var key in this.state.coins) {
          arr.push(this.state.coins[key]);
        }
        return (
          <div>
            <nav className="navbar navbar-fixed-top bg-light">
              <div className="row">
                <Title />
              </div>
              <div>
                <Coindata
                    active_cryptocurrencies= {this.state.g_coin_val.active_cryptocurrencies}
                    active_markets= {this.state.g_coin_val.active_markets}
                    bitcoin_percentage_of_market_cap= {this.state.g_coin_val.bitcoin_percentage_of_market_cap}
                    total_market_cap= {this.state.g_coin_val.total_market_cap}
                    total_volume_24h= {this.state.g_coin_val.total_volume_24h}
                />
              </div>
            </nav>
            <div>
                {arr.map(item => (
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                ))}
            </div>
          </div>
        );
    }
}

export default App;
