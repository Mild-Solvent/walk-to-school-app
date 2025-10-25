import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { commonStyles } from '../styles/commonStyles';
import SideMenu from '../components/SideMenu';

export default function MapPage({ 
  location, 
  savedRoutes, 
  selectedRouteId,
  schoolRouteId,
  showSchoolRoute,
  handleGoToSchool, 
  toggleMenu, 
  menuOpen, 
  slideAnim, 
  navigateToYourPet, 
  navigateToMyRoutes,
  navigateToLearning,
  totalPoints 
}) {
  return (
    <View style={commonStyles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="Your current location"
          />
        )}
        {selectedRouteId && savedRoutes.find(r => r.id === selectedRouteId) && (
          <Polyline
            coordinates={savedRoutes.find(r => r.id === selectedRouteId).waypoints}
            strokeColor="#4CAF50"
            strokeWidth={4}
          />
        )}
        {showSchoolRoute && schoolRouteId && savedRoutes.find(r => r.id === schoolRouteId) && (
          <Polyline
            coordinates={savedRoutes.find(r => r.id === schoolRouteId).waypoints}
            strokeColor="#2196F3"
            strokeWidth={5}
          />
        )}
      </MapView>

      <View style={commonStyles.header}>
        <Text style={commonStyles.appTitle}>Walk to school</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{totalPoints} pts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={commonStyles.burgerButton}>
            <View style={commonStyles.burgerLine} />
            <View style={commonStyles.burgerLine} />
            <View style={commonStyles.burgerLine} />
          </TouchableOpacity>
        </View>
      </View>

      <SideMenu
        slideAnim={slideAnim}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
      />

      <TouchableOpacity style={styles.dragonButton} onPress={navigateToYourPet}>
        <Image
          source={require('../../assets/dragon.png')}
          style={styles.dragonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {schoolRouteId && (
        <TouchableOpacity style={styles.goToSchoolButton} onPress={handleGoToSchool}>
          <Text style={styles.goToSchoolButtonText}>Go to school</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  dragonButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dragonImage: {
    width: 40,
    height: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pointsBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 5,
  },
  pointsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goToSchoolButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 150,
  },
  goToSchoolButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
