import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackNavigateButton from '../backNavigateButton/BackNavigateButton'
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps'

const MapModal = ({showMap, onClose, userPosition}) => {
  return (
    <Modal visible={showMap}>
    <BackNavigateButton onPress={onClose.bind(null, false)}/>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={userPosition}
        mapType="standard"
      >
        <Circle
          center={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
          }}
          radius={250}
          fillColor={"rgba(255, 0, 0, 0.2)"}
          strokeColor="red"
        />
      </MapView>
    </Modal>
  )
}

export default MapModal

const styles = StyleSheet.create({})