import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Movie, MovieFull } from '../interfaces/movieInterface';
import { RootStackParams, Navigation } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMovieDetails } from '../Hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { useNavigation } from '@react-navigation/core';


const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{}

export const DetailScreen = ({route, navigation}: Props) => {

    
    const movie = route.params as Movie;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    

   const {isLoading, cast, movieFull} = useMovieDetails(movie.id);

    return (
      
        <ScrollView>
        <View style={styles.contenedorImage}>
        <Image source={{uri}} style={styles.image}/>
        </View>
        
        <View style={styles.marginContainer}>
        <Text style={styles.subititle} >{movie.original_title}</Text>
        <Text style={styles.title }>{movie.title}</Text>
        </View>
      
            { isLoading
             ? <ActivityIndicator color="blue" size={30} style={{marginTop:20}}/> 
             : <MovieDetails movieFull={ movieFull! } cast={cast}/>
            }
        <View style={styles.backbottom}>
        <TouchableOpacity
        style={{height:50, width:50, borderRadius:100,  justifyContent:'center', alignItems:'center'}}
        onPress={()=> navigation.pop()}>
        <Icon name="arrow-left" size={30} color='#fff'/>
        </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    contenedorImage:{
        width:"100%",
        height: screenHeight * 0.7,
        borderBottomEndRadius:25,
        borderBottomStartRadius:25,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        
        elevation: 9,
    },
    image:{
    flex:1,
    },
    marginContainer:{
        marginHorizontal:20,
        marginTop:20,
    },
    subititle:{
        fontSize: 18,
        opacity: 0.8,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    backbottom:{
        position: 'absolute',
        zIndex: 999,
        elevation:9,
        top:30,
        left:20,
    }
    
    
    });
