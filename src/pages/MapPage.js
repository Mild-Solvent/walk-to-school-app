import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [noRouteModalVisible, setNoRouteModalVisible] = useState(false);

  const handleGoToSchoolClick = () => {
    if (schoolRouteId) {
      handleGoToSchool();
    } else {
      setNoRouteModalVisible(true);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
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

      <TouchableOpacity style={styles.goToSchoolButton} onPress={handleGoToSchoolClick}>
        <Text style={styles.goToSchoolButtonText}>Go to school</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={noRouteModalVisible}
        onRequestClose={() => setNoRouteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>No Route Set</Text>
            <Text style={styles.modalMessage}>Please select or create a route</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setNoRouteModalVisible(false);
                navigateToMyRoutes();
              }}
            >
              <Text style={styles.modalButtonText}>Go to My Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonSecondary}
              onPress={() => setNoRouteModalVisible(false)}
            >
              <Text style={styles.modalButtonSecondaryText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonSecondary: {
    paddingVertical: 12,
  },
  modalButtonSecondaryText: {
    color: '#666',
    fontSize: 16,
  },
});
