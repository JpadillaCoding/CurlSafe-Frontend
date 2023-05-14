import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const AnalysisScreen = () => {
  const results = useSelector((state) => state.results.value);

    const DATA = [
        {
            id: '25',
            title:'sulfate'
        },
        {
            id:'26',
            title:'Silicone'
        },
        {
            id:'27',
            title: 'silicones(water-soluble)'
        },
        {
            id:'28',
            title:'short-chain-alcohol'
        },
        {
            id:'29',
            title:'parabens'
        },
        {
            id:'30',
            title:'formaldehyde'
        },
        {
            id:'31',
            title:'soap'
        },
        {
            id:'32',
            title:'wax'
        }
    ]

  return (
    <View>
      <Text>yooo</Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default AnalysisScreen;
