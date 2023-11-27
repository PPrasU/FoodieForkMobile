import {StyleSheet, View, TextInput, Animated, TouchableOpacity,} from "react-native";
  import React, { useRef, useEffect } from "react";
  import { SearchNormal1, ArrowLeft, AddCircle } from "iconsax-react-native";
  import { useNavigation } from "@react-navigation/native";
  
  const SearchContainer = ({ cari, setCari, onSearchIconClick }) => {
    const navigation = useNavigation();
    const animation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }, []);
    return (
      <Animated.View
        style={[
          styles.container,{
            gap: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 15],
            }),
          },
        ]}
      >
        <Animated.View        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#8a8a8a" variant="Linear" size={24}/>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.bar}>
          <TextInput
            style={styles.textinput}
            placeholder="Cari ..."
            placeholderTextColor="#8a8a8a"
            value={cari}
            onChangeText={setCari}
            borderWidth={0}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoFocus={true}
          />
          {cari && (
            <TouchableOpacity onPress={() => setCari("")}>
              <AddCircle
                size={18}
                color="#000"
                variant="Linear"
                style={{ transform: [{ rotate: "45deg" }]}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.search}>
          <TouchableOpacity onPress={onSearchIconClick}>
            <SearchNormal1
              size={18}
              color={cari ? "#000" : "#8a8a8a"}
              variant="Linear"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
    );
  };
  
  export default SearchContainer;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    bar: {
      flexDirection: "row",
      padding: 10,
      gap: 10,
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 20,
      flex: 1,
      borderWidth: 1,
      borderColor: "#000"
    },
    textinput: {
      fontSize: 14,
      color: "#000",
      lineHeight: 18,
      padding: 0,
      flex: 1,
    },
    search:{
      borderRadius: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: "#000"
    },
  });