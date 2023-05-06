import {Dimensions, StyleSheet, TouchableOpacity, Image, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Block, Text, Badge, Card, Progress } from '../components';
import { mocks, theme, mapStyles } from '../constants';
import { CircularProgress } from 'react-native-circular-progress';
import { FlatList } from 'react-native';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles as blockStyles } from '../components/Block';

const { width } = Dimensions.get('window');


export default class Trip extends Component {

    static navigationOptions = ({navigation}) => {

        const showMap = navigation.getParam('map');

        return {
            headerTitle: <Text style={theme.fonts.header}>Current Trip</Text>,
            headerLeft: null,
            headerRight: (
                <TouchableOpacity onPress={()=> navigation.navigate('Trip', { map: !showMap })}>
                   <Text medium primary={showMap} accent={!showMap} transform="uppercase">{showMap ? 'show map' : 'hide map'}</Text>
                </TouchableOpacity>
            )
        }
    };

    renderChart() {
        return(
            <Card shadow style={{paddingVertical: theme.sizes.base * 2}}>
                <Block center>
                    <CircularProgress 
                    size={214}
                    fill={85}
                    lineCap="round"
                    rotation={220}
                    arcSweepAngle={280}
                    width={theme.sizes.base}
                    tintColor={theme.colors.primary}
                    backgroundColor={theme.colors.gray3}
                    backgroundWidth={theme.sizes.base / 2}>
                        {() => (<Block center middle>
                            <Text h1 medium>7.2</Text>
                            <Text h3 transform="uppercase">Fair</Text>
                        </Block>)}
                    </CircularProgress>
                </Block>

                <Block center>
                    <Text title spacing={1} style={{marginVertical: 8}}>Current Score</Text>
                    <Text>
                        <Text primary>+$2 </Text>
                        <Text gray transform="uppercase">Challenge Bonus</Text>
                    </Text>
                </Block>
            </Card>
        )
    }

    renderDriveStatus = item => {
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <Card shadow style={styles.drivingStatus}>
                    <Image source={item.icon} style={styles.drivingIcon} resizeMode="contain"/>
                    <Text title transform='capitalize' accent={item.status === 'bad'} tertiary={item.status === 'fair'} primary={item.status === 'good'} height={22}>{item.status}</Text>
                    <Text body transform='capitalize'>{item.action}</Text>
                </Card>
            </TouchableOpacity>
        );
    }

    renderDriving() {
        return(
            <Block>
                
                <Block style={{paddingTop: theme.sizes.base, paddingBottom: theme.sizes.base}}>
                    <Text spacing={0.4} transform="uppercase" style={{marginLeft: 5}}>Driving Data</Text>
                </Block>

                <FlatList 
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    deceleartionRate={0}
                    scrollEventThrottle={16}
                    data={mocks.drivingData}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({item}) => this.renderDriveStatus(item)}
                />

                <Block row space="between" style={{paddingVertical: theme.sizes.base * 2}}>
                    <Block center>
                        <Text h3 gray medium>55</Text>
                        <Text h3 gray medium>mph</Text>
                    </Block>

                    <Block />


                    <Block center>
                        <Text h3 gray medium>978.7</Text>
                        <Text h3 gray medium>mi</Text>
                    </Block>
                </Block>
            </Block>
        );
    }

    renderTripButton() {

        const { navigation } = this.props;

        return(
            <Block center middle style={styles.endTrip}>
                <Badge color={rgba(theme.colors.accent, '0.1')} size={144}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Welcome')}>
                        <Badge color={theme.colors.accent} size={62}>
                            <Icon name="square" size={62/2.5} color='white' />
                        </Badge>
                    </TouchableOpacity>
                </Badge>
            </Block>
        );
    }

    renderMap() {
        return(
            <Card style={{ padding: 0, overflow: 'hidden'}}>
                <MapView 
                region={mocks.location}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyles}
                style={styles.map}>
                    <Marker coordinate={{latitude: 40.728399, longitude: -73.883771}} anchor={{x: 0.5, y: 0.5}} rotation={-15}>
                        <Badge color={rgba(theme.colors.primary, '0.2')} size={77}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Badge color={rgba(theme.colors.primary, '0.2')} size={57}>
                                <Icon2 name="car-sports" size={62/2.5} color='black' />
                            </Badge>
                        </TouchableOpacity>
                        </Badge>
                    </Marker>
                </MapView>

                <TouchableOpacity 
                activeOpacity={0.2} 
                style={[styles.mapMyLocation, blockStyles.shadow]}
                onPress={()=>alert("Location Refreshed")}
                >
                    <Block center middle shadow>
                        <Icon name="location-arrow" size={16} color={theme.colors.primary} />
                    </Block>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        const { navigation } = this.props;
        const showMap = navigation.getParam('map');

        return (
        <React.Fragment>
            <ScrollView contentContainerStyle={styles.trip} showsVerticalScrollIndicator={false}>
            {showMap ? this.renderChart() : this.renderMap()}
            {this.renderDriving()}
            </ScrollView>
            {this.renderTripButton()}
        </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({

    trip: {
        padding: theme.sizes.padding,
        backgroundColor: theme.colors.gray4,
    },

    endTrip: {
        position: 'absolute',
        bottom: 0,
        left: (width -144) / 2
    },

    drivingStatus: {
        marginRight: theme.sizes.base,
        width: width / 2.568,
    },

    drivingIcon: {
        height: 56,
        marginBottom: theme.sizes.base *2,
    },

    map: {
        height: 352,
    },

    mapMyLocation: {
        position: 'absolute',
        borderRadius: 4,
        bottom: theme.sizes.base,
        left: theme.sizes.base*0.5,
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        backgroundColor: 'white',
    }
})