import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MoviePoster } from './MoviePoster';


export interface Props {
    title: string,
    movies: Movie[]
}

export const HorizontalSlader = ({title, movies}:Props) => {
    return (
        <View style={{
            height:(title) ? 260 : 220
            }}>
        
        { 
           title && <Text style={{fontSize:20, fontWeight:'bold', marginBottom:4, marginHorizontal:'3%'}} >{title}</Text>
        }

        <FlatList
            data={movies}
            renderItem={({item}:any)=>  (
            <MoviePoster movie={item} width={140} height={200} />
            ) }
            //El key extractor sirve solo para IOS o en caso de que no funcione el slide en android
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    </View>
    )
}
