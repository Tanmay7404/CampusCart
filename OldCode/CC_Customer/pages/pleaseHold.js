import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import NavBar from "../components/Navbar";
import Arrow from "../assets/leftArrow.svg";

const Hold = () => {

    return(
        <View style={styles.mainContainer}>
                <View style={styles.up}>
                    <TouchableOpacity>
                        <Arrow />
                    </TouchableOpacity>
                </View>
                <View style={styles.down}>
                    {/* <CountdownCircleTimer
                        isPlaying
                        duration={10}
                    >
                        {({ remainingTime, animatedColor }) => <Text style={{color: "#5736B5", fontSize: 36, fontWeight: 500}}>{remainingTime}</Text>} 
                    </CountdownCircleTimer> */}
                    <Text style={styles.text}>Please hold</Text>
                    <Text style={styles.text2}>Waiting for the shop to confirm your order</Text>
                </View>
            {/* <View style={styles.navbar}>
                <NavBar active="Menu"/>
            </View> */}
        </View>
    );
};

export default Hold;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#EFEEFA',
        width:"100%",
        height:"100%",
    },
    // main:{
    //     height:"100%",
    //     width:"100%",
    //     marginTop: 33,
    //     // marginBottom: 64,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    up:{
        marginTop: 27,
        height:76,
        width:"100%",
        paddingLeft: 33,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection:'row',
        alignItems:'center',
    },
    down:{
        width:"100%",
        height:"100%",
        // justifyContent: "center",
        top: "20%",
        alignItems: "center",
     },
    text2:{
        fontSize: 14,
        fontWeight: 400,
        color: "#6F6F6F",
        textAlign: "center",
        width: "40%",
    },
    text:{
        fontSize: 18,
        fontWeight: 500,
        color: "#6F6F6F",
        marginTop: 14.5,
        marginBottom: 4,
    },
    // navbar: {
    //     position:'absolute', 
    //     bottom:0, 
    //     width:'100%', 
    //     height:64,
    // },
});