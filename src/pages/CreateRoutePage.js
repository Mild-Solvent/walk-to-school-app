import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { commonStyles, width } from '../styles/commonStyles';

export default function CreateRoutePage({
  location,
  waypoints,
  handleMapLongPress,
  setCurrentPage,
  saveRoute,
}) {
  return (
    <View style={commonStyles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        onLongPress={handleMapLongPress}
      >
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            coordinate={waypoint}
            title={index === 0 ? 'Start' : `Waypoint ${index}`}
            pinColor={index === 0 ? 'green' : 'red'}
          />
        ))}
        {waypoints.length > 1 && (
          <Polyline
            coordinates={waypoints}
            strokeColor="#2196F3"
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => setCurrentPage('myroutes')} style={commonStyles.backButton}>
          <Text style={commonStyles.backButtonText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={commonStyles.appTitle}>Create Route</Text>
        <View style={commonStyles.burgerButton} />
      </View>

      <View style={styles.createRouteInfo}>
        <Text style={styles.createRouteInfoText}>
          Long press on map to add waypoints ({waypoints.length} added)
        </Text>
      </View>

      <TouchableOpacity
        style={styles.saveRouteButton}
        onPress={saveRoute}
      >
        <Text style={styles.saveRouteButtonText}>Save</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  createRouteInfo: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createRouteInfoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  saveRouteButton: {
    position: 'absolute',
    bottom: 30,
    left: width / 2 - 60,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveRouteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
