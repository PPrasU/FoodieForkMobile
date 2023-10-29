import React from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImagesComponent = ({images}) => {
  return (
    <FlatList
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={( item) => item.toString()}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image
            source={item}
            style={styles.image}
          />
        </View>
      )}
      pagingEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  image: {
    marginLeft: 5,
    marginRight: 15,
    width: windowWidth - 30,
    height: windowHeight / 4.2,
    borderRadius: 30,
  },
});

export default ImagesComponent;
