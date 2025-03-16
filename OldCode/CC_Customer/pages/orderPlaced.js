import React from "react";
import { StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import NavBar from "../components/Navbar";
import Confirm from "../assets/check.svg";
import Arrow from "../assets/leftArrow.svg"
import Arrow2 from '../assets/arrow.svg';

const Placed = () => {

    return(
        <View style={styles.mainContainer}>
            <View style={styles.up}>
                    <TouchableOpacity>
                        <Arrow />
                    </TouchableOpacity>
                </View>
                <View style={styles.down}>
                    <Confirm/>
                    <Text style={styles.text}>Order placed!</Text>
                    <Text style={styles.text2}>We will notify you when it's ready</Text>
                    <View style={styles.outer}>
                        <TouchableOpacity style={styles.container}>
                            <View>
                                <Text style={styles.text3}>Proceed</Text>
                            </View>
                            <View>
                                    <Arrow2 />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* <View style={styles.navbar}>
                <NavBar active="Menu"/>
            </View> */}
        </View>
    );
};

export default Placed;

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
    //     marginBottom: 64,
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
    outer: {
        backgroundColor: '#FFFFFF',
        height: 102,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: -160,
      },
      container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#5736B5',
        borderRadius: 16,
        justifyContent: 'space-between',
        height: 62,
        width: '90%',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
      },
      text3: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 500,
      },
    // navbar: {
    //     position:'absolute', 
    //     bottom:0, 
    //     width:'100%', 
    //     height:64,
    // },
});