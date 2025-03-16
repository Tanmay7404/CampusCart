import React from "react";
import { StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import NavBar from "../components/Navbar";
import ComingSoon from "../assets/comingSoon.png";
import Arrow from "../assets/leftArrow.svg"

const Coming = () => {

    return(
        <View style={styles.mainContainer}>
            <View style={styles.up}>
                    <TouchableOpacity>
                        <Arrow />
                    </TouchableOpacity>
                </View>
                <View style={styles.down}>
                        <Image source={ComingSoon}/>
                    <Text style={styles.text}>Coming soon</Text>
                    <Text style={styles.text2}>Our team is working on it</Text>
                </View>
            {/* <View style={styles.navbar}>
                <NavBar active="Menu"/>
            </View> */}
        </View>
    );
};

export default Coming;

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
        marginTop: 33,
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
        top: "25%",
        alignItems: "center",
     },
    text2:{
        fontSize: 14,
        fontWeight: 400,
        color: "#6F6F6F",
    },
    text:{
        fontSize: 18,
        fontWeight: 500,
        color: "#6F6F6F",
        marginTop: 14.5,
        marginBottom: 4,
    },
    logo:{
        backgroundColor: "#5736B5",
        
    },
    // navbar: {
    //     position:'absolute', 
    //     bottom:0, 
    //     width:'100%', 
    //     height:64,
    // },
});