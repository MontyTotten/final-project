var React = window.React;
// var React = require('react');
// var ReactDOM = require('react-dom')
// var ReactLeaflet = require('react-leaflet')
// var Leaflet = require('leaflet')

import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class DroneMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 15.47467,
      lon: 45.322755,
      zoom: 13,
    };
  }

  render() {
    var position = [this.state.lat, this.state.lon];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9udHl0b3R0ZW4iLCJhIjoiY2l3M3ZvNTg1MDNtdDJvanZicjhvOGpoeiJ9.kSSJlSMxuMzf-Relwp9dOg'
        />
        <Marker position={position}>
          <Popup>
            <span>Marib Province. <br/> 6 deaths.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

window.ReactDOM.render(<DroneMap />, document.getElementById('container'));