/*
*
*This screen will show a Map and the near crimes.
*
*
*/

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';


class MapScreen extends Component {

   //variables needed to start the map, these will be modified
    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09

        },
        mapLoaded:false,
        markerRegion: {
            longitude: -122,
            latitude: 37
        }
    }


    //Remove the header from navigationOptions
    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }

    }



    componentWillMount() {
        //I check if it is an emulator, if not I check the location given by the device
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }


    _getLocationAsync = async () => {
        //First I need to check the permissions
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        //I get the device location and set the region to state
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            markerRegion:{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }

        });
        //I use this variable to know how much time the ActivityIndicator has to be in screen
        this.setState({mapLoaded:true});
    };

    render(){
        //I use this variable to know how much time the ActivityIndicator has to be in screen
        if(!this.state.mapLoaded){
            return(
                <View style={{flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            <View style={{flex:1}}>
                <MapView
                    region={ this.state.region  }
                    style={{flex:1}}
                >
                </MapView>
            </View>
        );
    }
}

export default MapScreen;