import { Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react';
import { S3 } from 'aws-sdk';
import axios from 'axios';
import { Block, Text, Badge, Card } from '../components';
import { mocks, theme } from '../constants';
import { styles as blockStyles } from '../components/Block';
import { styles as cardStyles } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default class Welcome extends Component {

    state = {
        files: [], // Add this state
    };

    s3 = new S3({
        accessKeyId: 'hidden',
        secretAccessKey: 'hidden',
        region: 'us-east-2'
      });

    generateRandomTrips(files) {
    const trips = [];
    
    for (let i = 0; i < files.length; i++) {
        const trip = {
        id: i + 1,
        date: new Date().toDateString(),
        score: (Math.random() * (10 - 5) + 5).toFixed(1)        ,
        distance: `${Math.floor(Math.random() * 100)} km`,
        from: files[i].Key,
        to: files[i].Key,
        };
        trips.push(trip);
    }
    
    return trips;
    }
      

    // Add this function
    listObjects = async () => {
        params = {
            Bucket: 'stratas-dashcam-bucket'
        };

        try {
            const result =  await this.s3.listObjectsV2(params).promise();
            console.log('S3 objects:', result);
            this.setState({ 
              files: result.Contents,
              trips: this.generateRandomTrips(result.Contents),
            });
          } catch (error) {
            console.error('Error fetching objects from S3 bucket:', error);
          }
    };

    componentDidMount() {
        this.listObjects(); // Call listObjects function
      }
  
    static navigationOptions = {
        headerTitle: <Text style={theme.fonts.header}>Stratas</Text>,
        headerRight: (
            <TouchableOpacity>
                <Block flex={false} middle center>
                    <Image 
                    resizeMode='contain'
                    source={require('../assets/images/Icon/Menu.png')} 
                    style={{ width: 24, height: 24 }}/>
                <Badge 
                size={13}
                color={theme.colors.accent}
                style={{ position: 'absolute', top: -4, right: -4}} />
                </Block>
            </TouchableOpacity>
        )
    };
  
    renderMonthly() {

        const { navigation } = this.props;

        return(
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Rewards')}
            >
                <Card shadow style={{paddingVertical: theme.sizes.padding}}>
                    <Image 
                    resizeMode='contain'
                    source={require('../assets/images/Icon/More.png')}
                    style={styles.moreIcon}/>
                <Block>
                        <Block center>
                            <Text h1 primary spacing={1.7}>$13.78</Text>
                            <Text spacing={0.7}>Total Monthly Rewards</Text>
                        </Block>

                        <Block color={theme.colors.gray3} style={styles.hline} />

                        <Block row>
                            <Block center>
                                <Text size={20} spacing={0.6} primary>8.1</Text>
                                <Text body spacing={0.7}>Driving</Text>
                                <Text body spacing={0.7}>Score</Text>
                            </Block>

                            <Block flex={false} color={theme.colors.gray3} style={styles.vline} />

                            <Block center>
                                <Text size={20} spacing={0.6} primary>103</Text>
                                <Text body spacing={0.7}>Total</Text>
                                <Text body spacing={0.7}>Hours</Text>
                            </Block>
                        </Block>
                </Block>
                </Card>
            </TouchableOpacity>
        )
    }

    renderAwards() {
        return (
            <LinearGradient 
            colors={["#1D3354", theme.colors.accent]}
            end={{x:1, y:0}}
            style={[blockStyles.row, cardStyles.card, styles.awards]}>
                <Block middle flex={0.4}>
                    <Badge color={rgba(theme.colors.white, '0.2')} size={74}>
                        <Badge color={rgba(theme.colors.white, '0.2')} size={52}>
                            <Icon name='trophy' color="white" size={theme.sizes.h2}/>
                        </Badge>
                    </Badge>
                </Block>
                <Block style={{paddingVertical: theme.sizes.padding}}>
                    <Text medium white size={theme.sizes.base} spacing={0.4}>Woohoo!</Text>
                    <Text medium white size={theme.sizes.base}  spacing={0.4}>Completed 100 Hours</Text>
                </Block>
            </LinearGradient>
        )
    }

    renderTrip = trip => {
        return (
            <Card shadow key={`trip-${trip.id}`}>
                <Block row space="between" style={{marginBottom: theme.sizes.base}}>
                    <Text spacing={0.5} caption color="gray3">{trip.date}</Text>
                    <Text spacing={0.5} caption medium primary>{trip.score}</Text>
                    <Text spacing={0.5} caption>{trip.distance}</Text>
                </Block>

                <Block row center>
                    <Badge size={14} color={rgba(theme.colors.accent, '0.2')} style={{marginRight: 8}}>
                        <Badge color={theme.colors.accent}  size={8}/>
                    </Badge>
                    <Text spacing={0.5} color="gray"> {trip.from}</Text>
                </Block>

                <Block row center style={{paddingVertical: 4}}>
                    <Badge color="gray2" size={4} style={{marginLeft: 4.5}}/>
                </Block>

                <Block row center>
                    <Badge size={14} color={rgba(theme.colors.primary, '0.2')} style={{marginRight: 8}}>
                        <Badge color={theme.colors.primary}  size={8}/>
                    </Badge>
                    <Text spacing={0.5} color="gray"> {trip.to}</Text>
                </Block>
            </Card>
        );
    }

    renderTrips() {
        const { trips } = this.state;
        if (!trips) {
            return null;
        }
    
        return (
            <React.Fragment>
                <Block style={{marginBottom: theme.sizes.base}}>
                    <Text spacing={0.4} transform="uppercase">
                        Recent Trips
                    </Text>
                </Block>
                {trips.reverse().map(trip => this.renderTrip(trip))}
            </React.Fragment>
        )
    }

    renderTripButton() {

        const { navigation } = this.props;

        return(
            <Block center middle style={styles.startTrip}>
                <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
                    <TouchableOpacity activeOpacity={0.8} 
                    onPress={async () => {
                        try {
                          navigation.navigate('Trip');
                          const raspberryPiIpAddress = '192.168.1.100'; // Replace with your Raspberry Pi's IP address
                          const response = await axios.post(`http://${raspberryPiIpAddress}:5000/run-script`);
                          console.log(response.data);
                        } catch (error) {
                          console.error('Error executing script:', error);
                        }
                      }}
                    
                    >
                        <Badge color={theme.colors.primary} size={62}>
                            <Icon name="automobile" size={62/2.5} color='white' />
                        </Badge>
                    </TouchableOpacity>
                </Badge>
            </Block>
        );
    }

    render() {
    return (
        <React.Fragment>
            <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
                {this.renderMonthly()}
                {this.renderAwards()}
                {this.renderTrips()}
            </ScrollView>
            {this.renderTripButton()}
        </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
    welcome: {
        paddingVertical: theme.sizes.padding * 1.25,
        paddingHorizontal: theme.sizes.padding * 2.25,
        backgroundColor: theme.colors.gray4,
    },

    hline: {
        marginHorizontal: theme.sizes.base * 2,
        marginVertical: theme.sizes.base * 2,
        height: 1,
    },

    vline: {
        marginVertical: theme.sizes.base / 2,
        width: 1,
    },

    moreIcon : {
        height: 17,
        width: 16,
        position: 'absolute',
        right: theme.sizes.base,
        top: theme.sizes.base,
    },

    awards: {
        padding: theme.sizes.base,
        marginBottom: theme.sizes.padding,
    },

    startTrip: {
        position: 'absolute',
        bottom: 0,
        left: (width -144) / 2
    }
})