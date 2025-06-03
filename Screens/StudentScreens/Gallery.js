import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Header from '../../Components/Home/Header';
const IMAGES = [
  {id: '1', uri: 'https://picsum.photos/id/237/200/300'},
  {id: '2', uri: 'https://picsum.photos/id/238/200/300'},
  {id: '3', uri: 'https://picsum.photos/id/239/200/300'},
  {id: '4', uri: 'https://picsum.photos/id/240/200/300'},
  {id: '5', uri: 'https://picsum.photos/id/241/200/300'},
  {id: '6', uri: 'https://picsum.photos/id/242/200/300'},
  {id: '7', uri: 'https://picsum.photos/id/243/200/300'},
  {id: '8', uri: 'https://picsum.photos/id/244/200/300'},
  {id: '9', uri: 'https://picsum.photos/id/255/200/300'},
  {id: '10', uri: 'https://picsum.photos/id/256/200/300'},
  {id: '11', uri: 'https://picsum.photos/id/247/200/300'},
  {id: '12', uri: 'https://picsum.photos/id/248/200/300'},
  {id: '13', uri: 'https://picsum.photos/id/249/200/300'},
  {id: '14', uri: 'https://picsum.photos/id/250/200/300'},
  {id: '15', uri: 'https://picsum.photos/id/251/200/300'},
  {id: '16', uri: 'https://picsum.photos/id/252/200/300'},
  {id: '17', uri: 'https://picsum.photos/id/253/200/300'},
  {id: '18', uri: 'https://picsum.photos/id/254/200/300'},
  {id: '19', uri: 'https://picsum.photos/id/255/200/300'},
  {id: '20', uri: 'https://picsum.photos/id/256/200/300'},
];

const numColumns = 3;
const imageSize = Dimensions.get('window').width / numColumns - 16;

export default function Gallery() {
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.uri}} style={styles.image} />
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>School Gallery</Text>
        <FlatList
          data={IMAGES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.gallery}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
    color: '#333',
  },
  gallery: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    margin: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: imageSize,
    height: imageSize,
    resizeMode: 'cover',
  },
});
