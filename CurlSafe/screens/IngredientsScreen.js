import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from 'axios';

const IngredientsScreen = () => {
    const [databaseIngredients, setDatabaseIngredients] = useState(null);

    useEffect(() => {
      const ingredientDatabase = async () => {
        try {
          const response = await axios.get(
            "https://236d-2601-2c4-4600-c3b0-c91e-638c-49d-edce.ngrok-free.app/ingredients"
          );
          setDatabaseIngredients(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      ingredientDatabase();
    }, []);
    console.log(databaseIngredients)
    return (
    )
}
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#fbd029",
    }
})

export default IngredientsScreen