import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native/types";

const Ingredient = () => {
    const results = useSelector((state) => state.results.value);

    const DATA = [
        {
            id: '25',
            title:'sulfate',
            description: "insert text here1"
        },
        {
            id:'26',
            title:'Silicone',
            description: "insert text here2"
        },
        {
            id:'27',
            title: 'silicones(water-soluble)',
            description: "insert text here3"
        },
        {
            id:'28',
            title:'short-chain-alcohol',
            description: "insert text here4"
        },
        {
            id:'29',
            title:'parabens',
            description: "insert text here5"
        },
        {
            id:'30',
            title:'formaldehyde',
            description: "insert text here6"
        },
        {
            id:'31',
            title:'soap',
            description: "insert text here7"
        },
        {
            id:'32',
            title:'wax',
            description: "insert text here8"
        }
    ]

    const ingredientDatabase = async () => {
        await axios.get("https://curl-safe.herokuapp.com/ingredients")
        .then((res) => {
            console.log(res)
        })
    }
    ingredientDatabase()
    return(
        <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
            <View>
                <Text>

                </Text>
            </View>
        }}
        >
        </FlatList>
    )
}
const styles = StyleSheet.create({
    
})

export default Ingredient
