import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../colors/colors'

// cart actions
import { cartActions } from '../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const MenuItem = ({ title, photo, price, _id, categorie, quantite }) => {

  const store = useSelector(store => store.auth.userInfo)
  const dispatch = useDispatch()

  return (
    <View style={{ width: "40%", padding: 10, borderRadius: 10, backgroundColor: colors.blue, margin: 10, flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingHorizontal: 10 }}>
      <Image source={{ uri: photo.length > 0 ? photo : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" }} style={styles.image} />
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10, textAlign: "center", textTransform: "uppercase", fontFamily: "ConcertOne-Regular" }}>{title}</Text>
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>{price} DT</Text>
      <TouchableOpacity onPress={_ => dispatch(cartActions.add({ userId: store._id, title, price, photo, itemId: _id, categorie: categorie, quantite: 1 }))} style={{ backgroundColor: "white", borderRadius: 10, padding: 10 }}>
        <Text style={{ color: colors.blue, fontWeight: "bold" }}>AJOUTER</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MenuItem

const styles = StyleSheet.create({
  image: {
    width: 150, height: 150, marginBottom: 30
  }
})