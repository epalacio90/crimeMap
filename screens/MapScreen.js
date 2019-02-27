import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';


class MapScreen extends Component {

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

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();


        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
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
        this.setState({mapLoaded:true});
    };

    render(){
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