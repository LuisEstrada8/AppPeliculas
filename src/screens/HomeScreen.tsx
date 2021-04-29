import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../Hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import {  ScrollView } from 'react-native';
import { HorizontalSlader } from '../components/HorizontalSlader';
import { GradientBackground } from '../components/GradientBackground';
import ImageColors from "react-native-image-colors"
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

export const HomeScreen = () => {

    //DESESTRUCUTAMOS DIMENSIONS  OBTENEMOS EL WIDTH DE LA PANTALLA Y ESE VALOR LO ESTAMOS RENOMBRANDO A WINDOWwIDTH
  const { width:windowWidth} = Dimensions.get('window')

   const {NowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
   const {top} = useSafeAreaInsets();

   const {setMainColors} = useContext (GradientContext);

   const getPosterColors = async( index:number ) => {

    const movie = NowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    const [primary='gray',middle='black'] = await getImageColors(uri);
    setMainColors({primary,middle});

}

useEffect(() => {
    if (NowPlaying.length > 0 ) {
        getPosterColors(0)
    }  
}, [NowPlaying])



    if (isLoading){
        return (
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator color="blue" size={100}/>
            </View>
        )
    }
    return (
        <GradientBackground>
        <ScrollView>
        <View style={{marginTop: top + 20}} >
            {/*
            Carousel Principal
            */}
            
            <View style={{height:440}}>
            <Carousel
            data={NowPlaying!}
            renderItem={({item}:any)=>  <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
            onSnapToItem={ index => getPosterColors(index)}
            />
            </View>

            {/*
            Peliculas Populares
            */}

            <HorizontalSlader title="Peliculas Populares" movies={popular}/>
            <HorizontalSlader title="Mejor Ranking" movies={topRated}/>
            <HorizontalSlader title="Proximas a salir" movies={upcoming}/>
            
            
        </View>
        </ScrollView>
        </GradientBackground>
    )
}
