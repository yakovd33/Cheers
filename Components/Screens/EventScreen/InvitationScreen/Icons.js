import React, { useContext } from 'react'
import { View, Image, useWindowDimensions, Pressable, ScrollView, FlatList } from 'react-native'
import rings1 from '../../../../images/Icons/rings1.png'
import rings2 from '../../../../images/Icons/rings2.png'
import rings3 from '../../../../images/Icons/rings3.png'
import princeCrown from '../../../../images/Icons/princeCrown.png'
import princessCrown from '../../../../images/Icons/princessCrown.png'
import pigeons from '../../../../images/Icons/pigeons.png'
import starOfDavid from '../../../../images/Icons/starOfDavid.png'
import star from '../../../../images/Icons/star.png'
import no from '../../../../images/Icons/no.png'
import diamdem from '../../../../images/Icons/diadem.png'
import dimondRing from '../../../../images/Icons/diamond-ring.png'
import couple from '../../../../images/Icons/wedding-couple.png'
import cheers from '../../../../images/Icons/cheers.png'
import loveBirds from '../../../../images/Icons/love-birds.png'
import sDiamond from '../../../../images/Icons/sdiamond-ring.png'
import wine from '../../../../images/Icons/wine-glasses.png'


import FirebaseUtil from '../../../../utils/FirebaseUtils'
import { IdContext } from '../../../../utils/IdContext'

export default function Icons({ picked }) {
    const width = useWindowDimensions().width
    const { id } = useContext(IdContext)
    const icons = [{
        key: 'rings1',
        pic: rings1,
        width: 100
    }, {
        key: 'rings3',
        pic: rings3,
        width: 220
    }, {
        key: 'rings2',
        pic: rings2,
        width: 165
    }, {
        key: 'pigeons',
        pic: pigeons,
        width: 140
    }, {
        key: 'princeCrown',
        pic: princeCrown,
        width: 180
    }, {
        key: 'starOfDavid',
        pic: starOfDavid,
        width: 90
    }, {
        key: 'princessCrown',
        pic: princessCrown,
        width: 180
    }, {
        key: 'star',
        pic: star,
        width: 102
    },
    {
        key: 'no',
        pic: no,
        width: 100
    },
    {
        key: 'diadem',
        pic: diamdem,
        width: 100
    },
    {
        key: 'diamondRing',
        pic: dimondRing,
        width: 100
    },
    {
        key: 'weddingCouple',
        pic: couple,
        width: 100
    },
    {
        key: 'cheers',
        pic: cheers,
        width: 100
    },
    {
        key: 'sdiamondRing',
        pic: sDiamond,
        width: 100
    },
    {
        key: 'loveBirds',
        pic: loveBirds,
        width: 100
    },
    {
        key: 'wineGlasses',
        pic: wine,
        width: 100
    },
    ]
    const handleClick = (icon) => {
        FirebaseUtil.UpdateInvitation(id, { icon: icon })
    }

    return (
        <ScrollView
        horizontal={true}
        >
            <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                key={'_'}
                numColumns={Math.ceil(icons.length / 4)}
                data={icons}
                renderItem={({ item }) => {
                    console.log(item);
                    return (
                        <Pressable
                            onPress={() => handleClick(item.key)}
                            style={picked === item.key && { borderWidth: 2, borderColor: 'black' }}
                            key={item.key}
                        >
                            <Image style={{ justifyContent: 'center', height: 100, width: item.width, margin: 15 }} source={item.pic}></Image>
                        </Pressable>
                    )
                }}
            ></FlatList>
        </ScrollView>
        // <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        //     {icons.map(icon =>    
        //         <Pressable 
        //             onPress={() => handleClick(icon.key)} 
        //             style={picked === icon.key && {borderWidth: 2, borderColor: 'black'}}
        //             key={icon.key}
        //         >
        //             <Image style={{justifyContent: 'center', height: 100, width: icon.width, margin: 10}} source={icon.pic}></Image>
        //         </Pressable>

        //     )}
        // </View>
    )
}
