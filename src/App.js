import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Title from "./components/Title";
import Coindata from "./components/Coindata";
import Footer from "./components/Footer";

const GLOBAL_COIN_API = 'https://api.coinmarketcap.com/v2/global/';
const COIN_API = 'https://api.coinmarketcap.com/v2/ticker/?limit=10';
const SINGLE_COIN_API = 'https://api.coinmarketcap.com/v2/ticker/';

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
          coins: [],
          modal: false,
          coin_data: {
            name: undefined,
            market_cap: undefined,
            price: undefined,
            volume_24h: undefined,
            circulating_supply: undefined,
            percent_change_24h: undefined
          }
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    single_coin_data(coin_id) {
        fetch(SINGLE_COIN_API + coin_id + '/')
          .then(response => response.json())
          .then(json => {
            this.setState({
                coin_data: {
                    name: json.data.name,
                    market_cap: json.data.quotes.USD.market_cap,
                    price: json.data.quotes.USD.price,
                    volume_24h: json.data.quotes.USD.volume_24h,
                    circulating_supply: json.data.circulating_supply,
                    percent_change_24h: json.data.quotes.USD.percent_change_24h
                }
            });
        });
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
        console.log(this.state.coin_data)
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Market Cap</th>
                      <th>Price</th>
                      <th>Volume(24h)</th>
                      <th>Ciculating Supply</th>
                      <th>Change(24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map(item => (
                        <tr key={item.id} onClick={(event) => { this.toggle(); this.single_coin_data(item.id);}}>
                            <td>{item.name}</td>
                            <td>{item.quotes.USD.market_cap}</td>
                            <td>${item.quotes.USD.price}</td>
                            <td>{item.quotes.USD.volume_24h}</td>
                            <td>{item.circulating_supply}</td>
                            <td>{item.quotes.USD.percent_change_24h}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{ this.state.coin_data.name }</ModalHeader>
              <ModalBody>
                <b>{this.state.coin_data.name}</b> <br/>
                <b>Market Cap:</b>{this.state.coin_data.market_cap} <br/>
                <b>Price:</b> {this.state.coin_data.price} <br/>
                <b>Volume:</b> {this.state.coin_data.volume_24h} <br/>
                <b>Circulating Supply:</b> {this.state.coin_data.circulating_supply} <br/>
                <b>Percent Change 24h:</b> {this.state.coin_data.percent_change_24h}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>OK</Button>
              </ModalFooter>
            </Modal>
            <Footer/>
          </div>
        );
    }
}

export default App;
