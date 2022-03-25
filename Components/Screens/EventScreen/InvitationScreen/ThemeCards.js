import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import ThemeCard from './ThemeCard'


export default function ThemeCards({ background, backgroundImages,setTrigger,trigger }) {
    const { colors } = useTheme();
    
    const themes1 = [{
        key: 'flowers',
        background: null,
        primary: '#FF5487',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'whitewood',
        background: null,
        primary: '#6495ed',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'blackMarble',
        background: null,
        primary: '#FF1493',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'brickWall',
        background: null,
        primary: '#c71585',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'marble',
        background: null,
        primary: '#488FB1',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'black',
        background: null,
        primary: '#D4AF37',
        secondary: '#111111',
        size: 'contain'
    }
    ]
    
    const themes2 = [{
        key: 'hearts',
        background: null,
        primary: '#B22222',
        secondary: '#111111',
        size: 'contain'
    },
     {
        key: 'cloud',
        background: null,
        primary: '#00008B',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'greyMarble',
        background: null,
        primary: '#D4AF37',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'goldHearts',
        background: null,
        primary: '#FFCE45',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'stars',
        background: null,
        primary: '#ffa500',
        secondary: '#111111',
        size: 'contain'
    }, 
    
    ]
    
    
    const themes3 = [{
        key: 'goldFlowers',
        background: null,
        primary: '#66023c',
        secondary: '#111111',
        size: 'contain'
    },
     {
        key: 'whiteGold',
        background: null,
        primary: '#FFFEA9',
        secondary: '#111111',
        size: 'contain'
    },
     {
        key: 'pinkMarble',
        background: null,
        primary: '#c0c0c0',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'gold',
        background: null,
        primary: '#30D5C8',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'greenFlowers',
        background: null,
        primary: '#ffa500',
        secondary: '#111111',
        size: 'contain'
    }
    
    ]
    
    const themes4 = [{
        key: 'wood',
        background: null,
        primary: '#006400',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'goldPinkMarble',
        background: null,
        primary: '#76b6c4',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'pink',
        background: null,
        primary: '#FFD700',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'torquise',
        background: null,
        primary: '#d4af37',
        secondary: '#111111',
        size: 'contain'
    }, {
        key: 'cream',
        background: null,
        primary: '#fc6c85',
        secondary: '#111111',
        size: 'contain'
    },
    ]
    
    const themes5 = [{
        key: 'color-space',
        background: null,
        primary: '#DD4A48',
        secondary: '#111111',
        size: '100% 100%'
    }, {
        key: 'grey-wall',
        background: null,
        primary: '#ff0000',
        secondary: '#111111',
        size: '100% 100%'
    }, {
        key: 'grey-yellow-green',
        background: null,
        primary: '#C0D8C0',
        secondary: '#111111',
        size: '100% 100%'
    }, {
        key: 'painting-bg',
        background: null,
        primary: '#E900FF',
        secondary: '#111111',
        size: '100% 100%'
    },  
    {
        key: 'red-splash',
        background: null,
        primary: '#33FaFF',
        secondary: '#111111',
        size: '100% 100%'
    },
    {
        key: 'colored-ilusion',
        background: null,
        primary: '#FF0075',
        secondary: '#111111',
        size: '100% 100%'
    },
   
    
    ];

    const themes6 = [
        {
            key: 'blue-splashed',
            background: null,
            primary: '#FF0000',
            secondary: '#111111',
            size: '100% 100%'
        },
        {
            key: 'merable-red',
            background: null,
            primary: '#FFa500',
            secondary: '#111111',
            size: '100% 100%'
        },
        {
            key: 'white-grey',
            background:null,
            primary: '#C0C0C0',
            secondary: '#111111',
            size: '100% 100%'
        },
        {
            key: 'white-purple',
            background: null,
            primary: '#a9aaFF',
            secondary: '#111111',
            size: '100% 100%'
        },
        {
            key: 'white-blue',
            background: null,
            primary: '#0000FF',
            secondary: '#111111',
            size: '100% 100%'
        },
        ];
    
    return (
        <View>
            <ScrollView horizontal={true}>
                {themes1.map((item, index) =>{ 
                    console.log("item picked :",item)
                    console.log("item picked :",background)
               return  <ThemeCard key={index} settings={item} picked={background === item.key} />})} 
            </ScrollView>
            <ScrollView horizontal={true}>
                {themes2.map((item, index) => <ThemeCard key={index} settings={item} picked={background === item.key} setTrigger={setTrigger} trigger={trigger}   />)} 
            </ScrollView>
            <ScrollView horizontal={true}>
                {themes3.map((item, index) => <ThemeCard key={index} settings={item} picked={background === item.key} setTrigger={setTrigger} trigger={trigger} />)} 
            </ScrollView>
            <ScrollView horizontal={true}>
                {themes4.map((item, index) => <ThemeCard key={index} settings={item} picked={background === item.key} setTrigger={setTrigger} trigger={trigger} />)} 
            </ScrollView>
            <ScrollView horizontal={true}>
                {themes5.map((item, index) => <ThemeCard key={index} settings={item} picked={background === item.key} setTrigger={setTrigger} trigger={trigger} />)} 
            </ScrollView>
            <ScrollView horizontal={true}>
                {themes6.map((item, index) => <ThemeCard key={index} settings={item} picked={background === item.key} setTrigger={setTrigger} trigger={trigger} />)} 
            </ScrollView>
        </View>

    )
}
