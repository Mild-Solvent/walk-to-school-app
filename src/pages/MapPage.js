import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { commonStyles } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing, animations } from '../styles/theme';
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
  navigateToShop,
  totalPoints 
}) {
  const [noRouteModalVisible, setNoRouteModalVisible] = useState(false);
  const modalScale = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (noRouteModalVisible) {
      Animated.spring(modalScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      modalScale.setValue(0);
    }
  }, [noRouteModalVisible]);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: animations.timing.fast,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: animations.timing.fast,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleGoToSchoolClick = () => {
    animateButton();
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
        navigateToShop={navigateToShop}
      />

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity style={styles.dragonButton} onPress={() => { animateButton(); navigateToYourPet(); }}>
        <Image
          source={require('../../assets/dragon.png')}
          style={styles.dragonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      </Animated.View>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.shopButton} onPress={navigateToShop}>
          <Text style={styles.shopButtonIcon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goToSchoolButton} onPress={handleGoToSchoolClick}>
          <Text style={styles.goToSchoolButtonText}>Go to school</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={noRouteModalVisible}
        onRequestClose={() => setNoRouteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: modalScale }] }]}>
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
          </Animated.View>
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
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
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.lg,
    marginRight: 5,
    ...shadows.small,
  },
  pointsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
  },
  shopButton: {
    backgroundColor: colors.primaryLight,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
  },
  shopButtonIcon: {
    fontSize: 28,
  },
  goToSchoolButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: borderRadius.xl,
    ...shadows.glow,
    minWidth: 150,
  },
  goToSchoolButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    ...shadows.large,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: borderRadius.xl,
    width: '100%',
    marginBottom: 10,
    ...shadows.small,
  },
  modalButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonSecondary: {
    paddingVertical: 12,
  },
  modalButtonSecondaryText: {
    color: colors.textMuted,
    fontSize: 16,
  },
});
