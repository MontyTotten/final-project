var React = require('react');

var DroneMap = require('./DroneMap.jsx')
var Overlay = require('./Overlay.jsx')
var droneStore = require('../stores/droneStore.js')


var Link = require('react-router').Link;
// var Stats = require('./Stats.jsx');
// var DroneList = require('./DroneList.jsx')
// var DroneDetails = require('./DroneDetails.jsx')

// var MapView = require('./MapView.jsx');
var Details = require('./Details.jsx');
var Casualties = require('./Casualties.jsx');
var MapFilter = require('./MapFilter.jsx');



function getActiveClass (path) {
    var current = window.location.hash.slice(1);
    return current === path ? 'active' : '';
}

var Map = React.createClass({
    getInitialState : function () {
      return {
        data: droneStore.getDroneStrikes(),
        currentStrike: null,
        filterCountry: 'all',
        filterYear: 'all'
      };
    },

    componentDidMount : function () {
      var _this = this;

      // console.log( "mounting" );
      var response = droneStore.fetchDroneStrikes();

      response.done( function( msg ){

        console.log( "msg: ", msg );

        _this.setState({
          data: msg.strike
        });
      } );

      response.fail( function( msg ){

        console.log( "shit broke" );
      } );

      // console.log( "strikes", strikes );
    },
    // handleYearChange : function (e) {
    //   // console.log('you changed: ' + e.target.value);
    //   this.setState({filterYear: e.target.value});
    //   console.log(e.target.value);
    // },

    // handleCountryChange : function (e) {
    //   // console.log('you changed: ' + e.target.value);
    //   this.setState({filterCountry: e.target.value});
    //   console.log(e.target.value);
    // },

    clearMap : function () {
      console.log( "test" );
      this.refs.mapref.clearMap();
    },

    render: function () {
       var data = this.state.data
        return (
            <div>
               <header>
                    <div className="logo-container">
                        <img className="logo" src="assets/images/whitelogo.png"/>
                    </div>
                    <nav>
                        <Link to="stats" className={getActiveClass('stats')}>STATS</Link>
                    </nav>
                </header>

                <main className="cf">
                <section className="map">
                      <DroneMap data={data} onMarkerClick={this.setDetails} ref="mapref"/>
                  </section>
                  {/*<MapFilter />*/}
                  <MapFilter />
                  <button onClick={this.clearMap}>Clear Map</button>
                  <Casualties strike={this.state.strike} />
                  
                </main>
                <footer>

                  <small>&copy; 2016 Sortie All Rights Reserved</small>
                </footer> 
                  
                { 
                
              }

            </div>
        );
    },
    setDetails: function (strike) {
      this.setState({
        strike: strike
      });
    }
}) 

module.exports = Map;
