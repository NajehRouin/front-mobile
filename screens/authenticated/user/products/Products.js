import { StyleSheet, Text, View } from 'react-native'
import React ,{ useState } from 'react'
import BackNavigateButton from '../../../../components/backNavigateButton/BackNavigateButton'
import { useEffect } from 'react'
import axios from 'axios'
import MenuItem from '../../../../components/MenuItem'
import { REACT_APP_BASE_URL} from "../../../../constant"
const Products = ({navigation, route}) => {


  const [productList, setProductList]=useState([])
  useEffect(_=>{
      (async ()=>{
        try{
          const menuListRequest=await axios.post(REACT_APP_BASE_URL+"/menu/get")
          if(menuListRequest.data.status){
            setProductList(menuListRequest.data.menuList.filter(ele=>ele.categorie.toLowerCase().trim()===route.params))
          }
        }catch(err){
          console.log(err)
        }
      })()
    },[])

  return (
    <View style={{flex:1,paddingTop:"40%"}}>
            <BackNavigateButton />
            <View style={{marginBottom:50}}>
                <Text style={{textAlign:"center",letterSpacing:2,fontFamily:"ConcertOne-Regular",fontSize:30}}>{route.params} List</Text>
            </View>
            {productList.map((ele,index)=><MenuItem key={index} title={ele.title} price={ele.price} photo={ele.photo}/>)}

    </View>
  )
}

export default Products

const styles = StyleSheet.create({})