import React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../Hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import {  ScrollView } from 'react-native';
import { HorizontalSlader } from '../components/HorizontalSlader';

export const HomeScreen = () => {

    //DESESTRUCUTAMOS DIMENSIONS  OBTENEMOS EL WIDTH DE LA PANTALLA Y ESE VALOR LO ESTAMOS RENOMBRANDO A WINDOWwIDTH
  const { width:windowWidth} = Dimensions.get('window')

   const {NowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
   const {top} = useSafeAreaInsets();

    if (isLoading){
        return (
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator color="blue" size={100}/>
            </View>
        )
    }

    return (
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
    )
}
