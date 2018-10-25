import React from "react";


const Coindata = props => (
	<div>
		<ul className="nav navbar-nav d-inline-flex mr-auto">
          <li className="nav-item">
            <ul className="list-inline-mb-0">
              <li className="list-inline-item"> <b> Cryptocurrencies:</b> {props.active_cryptocurrencies}</li>
              <li className="list-inline-item"> <b> Markets:</b> {props.active_markets}</li>
              <li className="list-inline-item"> <b> Markets Cap:</b> {props.total_market_cap}</li>
              <li className="list-inline-item"> <b> 24h Vol:</b> {props.total_volume_24h}</li>
              <li className="list-inline-item"> <b> BTC Dominance:</b> {props.bitcoin_percentage_of_market_cap}</li>
            </ul>
          </li>
        </ul>
	</div>

);

export default Coindata;