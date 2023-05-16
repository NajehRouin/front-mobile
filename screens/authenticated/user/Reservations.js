import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

import colors from '../../../colors/colors'


import { cartActions } from '../../../store/cartSlice'
import { REACT_APP_BASE_URL } from "../../../constant"
const Reservations = ({ navigation }) => {
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [quantite, Setquantite] = useState(1);
  const store = useSelector(state => state.cart)
  let matricule = localStorage.getItem('matricule');
  const [total, SetTolat] = useState(0);
  const dispatch = useDispatch()


  useEffect(() => {
    if (store.cartItems.length != 0) {
      console.log("itemmmm", store.cartItems)
      let somme = 0
      for (let i = 0; i < store.cartItems.length; i++) {
        //SetTolat(...total, total + store.cartItems[i].price)
        somme = somme + store.cartItems[i].price
        SetTolat(somme)
      }


    }
    else {
      SetTolat(total)
    }
  }, [])


  const reserverplat = async () => {





    const ObjectReservation = store.cartItems.map(el => {
      el.quantiter = 1
      el.matriculeUser = matricule
      return el
    });

    const reservationStatus = await axios.post(REACT_APP_BASE_URL + "/reservation/make",
      { reservationList: ObjectReservation, userId: matricule })
    console.log(reservationStatus.data)
    if (reservationStatus.data.status) {
      setSuccess('votre reservation a été effuctuer avec success')
      dispatch(cartActions.removeAll())
      console.log('dddd')
    } else {
      setErr({ status: true, msg: "reservation non disponible" })
    }

  }

  const addqte = (i) => {




    store.cartItems.map((elem, index) => {
      if (i.itemId === elem.itemId) {
        console.log("elem", elem)
        const qte = quantite + store.cartItems[index].quantite
        Setquantite(qte)
        console.log("qte", qte)


      }
    })

    // const prix=idex.prix;
    // console.log("PRIX",prix)
    // const tt=prix*qte;

    // SetTolat(tt)
    // console.log("qte",qte)
    // console.log("Total",tt)

  }

  const changeQuantitier = (el, quantiter) => {
    dispatch(cartActions.updatequantiter({ el, quantiter: quantiter + (quantiter + 1) }))

    console.log(el, quantiter + 1)


  }

  return (
    <View style={{ paddingTop: 20 }}>
      <View style={{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: 'center',
      }}>
        <AntDesign name='arrowleft' size={26} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
        {/* <Icon
                        name="arrow-left"
                        type="material-community"
                        size={26}
                        onPress={()=>navigation.goBack()}
                       
                    
                    /> */}
        <Text style={{ fontSize: 20, color: colors.blue, shadowColor: 10, textAlign: "center", marginEnd: "40%" }}>Cart list</Text>
      </View>


      {store.cartItems.length > 0 ?
        store.cartItems.map((ele, index) => {
          return <View style={{ paddingTop: 20 }} key={index}>
            <View style={{ width: "90%", borderRadius: 15, padding: 15, backgroundColor: 'white', flexDirection: "row", alignItems: "center", marginLeft: 20, justifyContent: "space-between" }}>
              <Image source={{ uri: ele.photo }} style={{ width: 80, height: 80 }} />

              <Text >{ele.title}</Text>


              <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                {/* <Icon
                  name="add-circle"
                  type="material-icons"
                  size={24}
                //onPress={()=>addqte()}


                /> */}

                <AntDesign name='plus' onPress={() => addqte(ele)} />
                <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10, fontWeight: "bold", color: colors.blue, }}>{quantite} </Text>


                <AntDesign name='minus' />
                {/* <Icon
                  name="remove-circle"
                  type="material-icons"
                  size={24}
                // onPress={()=>removeqte()}


                /> */}
              </View>



              <Pressable style={{ marginRight: 10 }} onPress={_ => {
                dispatch(cartActions.remove({ itemId: ele.itemId }))
                SetTolat(total - ele.price)
              }}>
                {/* <TextInput
              placeholder="1"
              keyboardType='numeric'
              defaultValue='1'

              style={{
              ...styles.inputContainer,
              ...styles.input
              }}
              secureTextEntry={false}
              onChangeText={(value) => changeQuantitier(ele , value)}
            /> */}
                <AntDesign name="delete" size={30} color={colors.blue} />
              </Pressable>
            </View>


          </View>
        })

        :
        <Text>Empty ..</Text>
      }
      {store.cartItems.length > 0 ?

        <View style={{ width: "90%", padding: 10, flexDirection: "row", alignItems: "center", margin: 40 }}>
          <Pressable >

          </Pressable>
        </View> : ""}

      {err && (
        <Text
          style={{
            color: colors.red,
            marginVertical: 10,
            textTransform: "uppercase",
          }}
        >
          {err}
        </Text>)
      }

      {success && (
        <Text
          style={{
            color: colors.green,
            marginVertical: 10,
            textTransform: "uppercase",

          }}
        >
          {success}
        </Text>)
      }
      {store.cartItems.length > 0 &&
        <View style={{ backgroundColor: 'white', height: 60, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10, borderRadius: 10, marginTop: 25 }}>
          <Text style={{ fontSize: 18, marginLeft: -110, fontWeight: "bold", color: colors.blue, }}>Total: {total} dt</Text>
          <TouchableOpacity style={{
            height: 50, width: 120, alignContent: 'center',
            alignContent: 'center', alignItems: 'center',
            justifyContent: 'center', backgroundColor: colors.blue,
            borderRadius: 90, marginEnd: -130
          }} onPress={_ => reserverplat()} >
            <Text style={{ fontSize: 15, fontWeight: '700', color: 'white' }}>confirmer </Text>

          </TouchableOpacity>
        </View>
      }


    </View>
  )
}

export default Reservations

const styles = StyleSheet.create({


  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    height: 70
  },
  input: {
    height: 70,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15
  }
})