import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'

import { Block, Text, Badge, Card, Progress } from '../components';
import { mocks, theme } from '../constants';
import { styles as blockStyles } from '../components/Block';
import { styles as cardStyles } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from 'react-native-circular-progress';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Rewards extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={theme.fonts.header}>Your Rewards</Text>,
            headerLeft: (
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image 
                    resizeMode='contain'
                    source={require('../assets/images/Icon/Back.png')} 
                    style={{ width: 20, height: 24, marginRight: theme.sizes.base*2.5, marginLeft: theme.sizes.base*1.25 }}/>
                </TouchableOpacity>
            )
        }
    };

    renderMonthly() {
        return(
            <Card shadow style={{paddingVertical: theme.sizes.padding}}>
            <Block>
                    <Block center>
                        <Text h1 primary spacing={1.7}>$13.78</Text>
                        <Text spacing={0.7}>Total Monthly Rewards</Text>
                    </Block>

                    <Block color={theme.colors.gray3} style={styles.hline} />

                    <Block row>
                        <Block center>
                            <Text size={20} spacing={0.6} primary>$5</Text>
                            <Text body spacing={0.7}>Challenge</Text>
                            <Text body spacing={0.7}>Credits</Text>
                        </Block>

                        <Block flex={false} color={theme.colors.gray3} style={styles.vline} />

                        <Block center>
                            <Text size={20} spacing={0.6} primary>$8.78</Text>
                            <Text body spacing={0.7}>Driving</Text>
                            <Text body spacing={0.7}>Data</Text>
                        </Block>
                    </Block>
            </Block>
            </Card>
        )
    }

    renderRewards() {
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
                            <Text h1 medium>8.1</Text>
                            <Text h3 transform="uppercase">Good</Text>
                        </Block>)}
                    </CircularProgress>
                </Block>

                <Block center>
                    <Text title spacing={1} style={{marginVertical: 8}}>Data Score</Text>
                    <Text>
                        <Text primary>37 </Text>
                        <Text gray transform="uppercase"> Level</Text>
                    </Text>
                </Block>

                <Block color={theme.colors.gray3} style={styles.hline} />

                <Block row space="between">
                    <Block center>
                        <Text size={20} spacing={1} primary>79</Text>
                        <Text body spacing={0.7}>Trips</Text>
                    </Block>

                    <Block center>
                        <Text size={20} spacing={1} primary>123</Text>
                        <Text body spacing={0.7}>Hours</Text>
                    </Block>

                    <Block center>
                        <Text size={20} spacing={1} primary>2,786</Text>
                        <Text body spacing={0.7}>Miles</Text>
                    </Block>
                </Block>

                <Block color={theme.colors.gray3} style={styles.hline} />

                <Block>
                    <Block style={{marginBottom: theme.sizes.base}}>
                        <Block row space="between">
                            <Text body spacing={0.4}>Uniqueness</Text>
                            <Text caption spacing={0.8}>8.1</Text>
                        </Block>
                        <Progress value={0.81}/>
                    </Block>

                    <Block style={{marginBottom: theme.sizes.base}}>
                        <Block row space="between">
                            <Text body spacing={0.4}>Resolution Quality</Text>
                            <Text caption spacing={0.8}>9.8</Text>
                        </Block>
                        <Progress value={0.98}/>
                    </Block>

                    <Block style={{marginBottom: theme.sizes.base}}>
                        <Block row space="between">
                            <Text body spacing={0.4}>Location Data</Text>
                            <Text caption spacing={0.8}>7.4</Text>
                        </Block>
                        <Progress value={0.74} endColor='#D37694'/>
                    </Block> 
                </Block>

                <Block color={theme.colors.gray3} style={styles.hline} />

                <Block row center space="between">
                    <Text>Data Reward</Text>
                    <Text size={20} spacing={1} primary>$8.78</Text>
                </Block>
            </Card>
        )
    }

    renderChallenges() {
        return(
                <Block>
                    <Block style={{paddingTop: theme.sizes.base, paddingBottom: theme.sizes.base}}>
                        <Text spacing={0.4} transform="uppercase" style={{marginLeft: 5}}>Challenges Taken</Text>
                    </Block>

                    <Card shadow row color={theme.colors.accent}>
                        <Block middle flex={0.4}>
                            <Badge color={rgba(theme.colors.secondary, '0.8')} size={74}>
                                <Badge color={rgba(theme.colors.white, '0.2')} size={52}>
                                    <Icon name='check' color="white" size={theme.sizes.h2}/>
                                </Badge>
                            </Badge>
                        </Block>
                        <Block style={{paddingVertical: theme.sizes.padding}}>
                            <Text medium white size={theme.sizes.base} spacing={0.4}>Complete</Text>
                            <Text medium white size={theme.sizes.base}  spacing={0.4}>100 miles - $5</Text>
                        </Block>
                    </Card>

                </Block>
        );
    }


    render() {
        return (
        <ScrollView contentContainerStyle={styles.rewards} showsVerticalScrollIndicator={false}>
            {this.renderMonthly()}
            {this.renderRewards()}
            {this.renderChallenges()}
        </ScrollView>
        )
    }
    }

const styles = StyleSheet.create({

    rewards: {
        padding: theme.sizes.padding * 1.25,
        paddingHorizontal: theme.sizes.padding * 2.25,
        paddingVertical: theme.sizes.padding * 2,
        backgroundColor: theme.colors.gray4,
    },

    hline: {
        marginVertical: theme.sizes.base * 1.75,
        height: 1,
    },

    vline: {
        marginVertical: theme.sizes.base / 2,
        width: 1,
    },

})