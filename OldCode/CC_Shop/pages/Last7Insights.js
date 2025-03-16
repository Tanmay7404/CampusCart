import React,{useState} from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import InsightsCard from "../components/InsightsCard";
import NavBar from '../components/NavBar';
import Header from "../components/header";
import ReviewCard from "../components/ReviewCard";
import Image from '../assets/shopImage.png';
import SellingItemCard from "../components/SellingItemCard";
import { useNavigation } from "@react-navigation/native";
import DummyOrder from "../dummyOrder";
import ShopDetails from "../dummyShop";

const Last7Insights=()=>{
    const navigation = useNavigation();
    const [open, setOpen] = useState(true);
    const [label, setLabel] = useState("Open");

    var sum = 0,ord_recv=0,ord_acc=0,ord_can=0,ord_comp=0;
    DummyOrder.forEach(function(order){
        order.status == 'completed' && (sum += order.bill);
        ord_recv += 1;
        ord_acc += 1;
        order.status == 'completed' && (ord_comp += 1);
    });
    ord_can = ord_recv - ord_acc;

    return (
        <View style={styles.mainContainer}>
            <ScrollView  style={styles.main}>

                <View style={styles.up}>
                    <Header text="Latest insights"/>
                </View>

                <View style={styles.down}>
                    
                    <View style={styles.tabs}>
                        
                            <TouchableOpacity style={styles.tab1} onPress={()=>{navigation.navigate("Insights")}}>
                                <Text style={styles.tabtext2}>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab2} onPress={()=>{navigation.navigate("Insights7")}}>
                                <Text style={styles.tabtext1}>Last 7 days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab3} onPress={()=>{navigation.navigate("Insights30")}}>
                                <Text style={styles.tabtext2}>Last 30 days</Text>
                            </TouchableOpacity>
                        
                    </View>

                    <InsightsCard date={new Date().toLocaleString()} totalAmount={sum} received={ord_recv} accepted={ord_acc} cancelled={ord_can} completed={ord_comp}/>
                   
                    <View style={styles.subHead}>
                        <Text style={styles.subHeadTex} >Reviews</Text>
                        <Text style={styles.LinkText}>See all</Text>
                    </View>

                    <View style={styles.reviews}>
                        <ScrollView horizontal={true}>
                            {ShopDetails[0].reviews.map((rev,index) => (
                                <ReviewCard key={rev.reviewId} image={Image} name={rev.reviewerName} review={rev.comment} rating={rev.reviewRating}/>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.subHead}>
                        <Text style={styles.subHeadTex} >What's selling</Text>
                    </View>

                    <View style={styles.selling}>
                        {ShopDetails[0].menu.map((item) => (
                            <SellingItemCard key={item.itemId} veg={item.isVeg} bestSeller={item.isBestSeller} itemName={item.itemName} rating={item.itemRating} image={Image}/>    
                        ))}
                    </View>
                    
                </View>    

            </ScrollView>   

            <View style={styles.navbar}>
                <NavBar active="Insights"/>
            </View>

        </View>
    );
}

export default Last7Insights

const styles = StyleSheet.create({
    main:{
        height:"100%",
        width:"100%",
    },
    mainContainer:{
        backgroundColor:'#5736B5',
        width:"100%",
        height:"100%"
    },
    up:{
        height:108,
        width:"100%",
        flexDirection:"column",
        alignItems:"center"
    },
    down:{
        height:"100%",
        width:"100%",
        borderRadius:24,
        backgroundColor:'#EFEEFA',
        flexDirection:'column',
    },
    tabs:{
        marginTop: 32,
        width: "90%",
        alignSelf: 'center',
        flexDirection:'row',
        marginLeft: "4%",
        marginRight: "4%",
        justifyContent:'space-between',
    },
    tab2:{
        height: 32,
        width: 104,
        backgroundColor: "#5736B5",
        borderRadius: 16,
        marginLeft: 4,
        marginRight: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    tabtext1: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: 500,
    },
    tab1:{
        height: 32,
        width: 71,
        backgroundColor: "#EEEDFA",
        borderRadius: 16,
        borderColor: "#D7D2E9",
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    tab3:{
        height: 32,
        width: 113,
        backgroundColor: "#EEEDFA",
        borderRadius: 16,
        borderColor: "#D7D2E9",
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    tabtext2: {
        color: "#6F6F6F",
        fontSize: 14,
        fontWeight: 500,
    },
    subHead:{
        height:19,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 24,
        marginLeft:"6.66%",
        marginRight:"6.66%",
    },
    subHeadTex:{
        color:'#6F6F6F',
        fontSize:14,
        fontWeight:500,
    },
    LinkText:{
        color:'#5736B5',
        fontSize:14,
        fontWeight:500,
    },
    reviews:{
        marginTop: 16,
        marginLeft: "4%",
        paddingRight: "4%",
    },
    selling:{
        height: "100%",
        width: "100%",
        marginTop: 16,
        marginBottom: 60,
        flexDirection:'column',
        alignItems: "center",
    },
    navbar: {
        position:'absolute', 
        bottom:0, 
        width:'100%', 
        height:64,
    },
})