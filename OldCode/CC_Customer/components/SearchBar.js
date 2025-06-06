// import React from 'react';
import Search_icon1 from '../assets/Search_icon1.svg';
import Search_icon2 from '../assets/Search_icon2.svg';
import Search_icon3 from '../assets/Search_icon3.svg';
import Search_icon3_copy from '../assets/Search_icon3_copy.svg';
import Close from '../assets/close.svg';
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import FilterCard from './FilterCard';
import {useNavigation} from '@react-navigation/native';
const SearchBar = props => {
  const navigation = useNavigation();
  const [vis, setVis] = useState(false);
  const [text, setText] = useState('');

  return (
    <View
      style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 16,
            height: 52,
            paddingLeft: 20,
            zIndex: 1,
            borderColor: vis ? '#D7D2E9' : 'none',
            borderWidth: vis ? 1 : 0,
            justifyContent: 'space-between',
          },
        ]}>
        <View>
          <View style={{width: '75%'}}>
            <TextInput
              style={[styles.text, {width: '75%'}]}
              placeholder={props.textInput}
              placeholderTextColor="#A9A9A9"
              defaultValue={props.defText ? defText : text}
              onChangeText={text => {
                props.onhandleSearch(text);
              }}
              value={props.searchQuery}
            />
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <View style={[styles.iconContainer, {flexDirection: 'row'}]}>
          <TouchableOpacity style={{marginLeft: 4, marginRight: 4}}>
            <Search_icon1 />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 4, marginRight: 4}}>
            <Search_icon2 />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 4, marginRight: 4}}>
            {vis == true ? (
              <Search_icon3_copy
                onPress={() => {
                  setVis(!vis);
                }}
              />
            ) : (
              <Search_icon3
                onPress={() => {
                  setVis(!vis);
                }}
              />
            )}
          </TouchableOpacity>

          {/* <Image source={Search_icon1} alt="" className="card-img" style={styles.icon3}  /> */}
        </View>
      </View>
      <Modal transparent={true} visible={vis}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#000000aa',
            top: 145,
            borderRadius: 16,
          }}>
          <View
            style={{display: vis ? 'flex' : 'none', width: '90%', margin: -16}}>
            <FilterCard />
          </View>
          <View style={{margin: 28, display: vis ? 'flex' : 'none'}}>
            <Close
              onPress={() => {
                setVis(!vis);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    container: {
      // margin:"auto",
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      // alignItems: 'center',
      borderRadius: 16,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginLeft: 16,
      marginTop: 12,
      height: 100,
      width: '80%',
      backgroundColor: 'white',
      borderWidth: 1,
    },
    text: {
      color: '#6F6F6F',
      // paddingLeft:20,
      // paddingTop:"4%"
      fontSize: 14,
      backgroundColor: 'white',
      width: '80%',
    },
    iconContainer: {
      width: 1,
      alignItems: 'right',
      alignSelf: 'right',
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 0.5,
      backgroundColor: 'white',
    },
    icon: {},
  });

export default SearchBar;
