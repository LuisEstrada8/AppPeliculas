import React from 'react'
import { View, Text } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import { styles } from '../screens/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props{
    movieFull:MovieFull,
    cast: Cast[],
}

export const MovieDetails = ({movieFull, cast}:Props) => {
    return (
        <>
        <View style={{marginHorizontal:20, marginVertical:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>   
            <Icon name="star" size={20} color="#E4CC37" />
            <Text style={{marginLeft:12, fontWeight:'bold', fontSize:16}}>{movieFull.vote_average}</Text>
            <Text style={{marginLeft:12}} >-{movieFull.genres.map(resp=>resp.name).join(', ')}</Text>
        </View>
        
        <View style={{marginVertical:10}}>
        <Text style={{fontWeight:'bold', textAlign:'justify', fontSize:20}}>Historia</Text>
        <Text style={{fontWeight:'300', textAlign:'justify', fontSize:16}}>{movieFull.overview ? movieFull.overview : "No hay descripcion" }</Text>     
        </View>

        <View style={{marginVertical:10}}>
        <Text style={{fontWeight:'bold', textAlign:'justify', fontSize:20}}>Presupuesto</Text>
        { movieFull.budget == 0
        ? <Text style={{fontWeight:'300', textAlign:'justify', fontSize:16}}>No se dio a conocer el presupuesto</Text>    
      
        : <Text style={{fontWeight:'300', textAlign:'justify', fontSize:16}}>{currencyFormatter.format(movieFull.budget, {code:'USD'})}</Text> 
        }
             
        </View>

    <View style={{marginVertical:10}}>
    <Text style={{fontWeight:'bold', textAlign:'justify', fontSize:20}}>Actores</Text>
    
    <FlatList
    data={cast}
    keyExtractor={(item)=> item.id.toString()}
    renderItem={({item}) =>  <CastItem actor={item}/>}
    horizontal={true}
    
    />

    
    </View>

        </View>
        </>
    )
}


