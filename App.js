import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image, Animated, Dimensions, ScrollView, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('map'); // 'map' or 'yourpet'
  const [achievementsModalVisible, setAchievementsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;

useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToYourPet = () => {
    setCurrentPage('yourpet');
    setMenuOpen(false);
  };

  const navigateToMap = () => {
    setCurrentPage('map');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

if (currentPage === 'yourpet') {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToMap} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.appTitle}>Your Pet</Text>
          <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.petPageContent}>
          {/* Dragon Image */}
          <View style={styles.dragonContainer}>
            <Image
              source={require('./assets/dragon.png')}
              style={styles.largeDragonImage}
              resizeMode="contain"
            />
          </View>

          {/* Achievements Button */}
          <TouchableOpacity 
            style={styles.achievementsButton}
            onPress={() => setAchievementsModalVisible(true)}
          >
            <Text style={styles.achievementsButtonText}>Achievements</Text>
          </TouchableOpacity>

          {/* Routes List */}
          <View style={styles.routesContainer}>
            <Text style={styles.routesTitle}>Recent Routes</Text>
            <View style={styles.routeItem}>
              <Text style={styles.routeDate}>Oct 21, 2025</Text>
              <Text style={styles.routePoints}>+5pts</Text>
            </View>
            <View style={styles.routeItem}>
              <Text style={styles.routeDate}>Oct 20, 2025</Text>
              <Text style={styles.routePoints}>+5pts</Text>
            </View>
            <View style={styles.routeItem}>
              <Text style={styles.routeDate}>Oct 19, 2025</Text>
              <Text style={styles.routePoints}>+5pts</Text>
            </View>
            <View style={styles.routeItem}>
              <Text style={styles.routeDate}>Oct 18, 2025</Text>
              <Text style={styles.routePoints}>+5pts</Text>
            </View>
          </View>
        </ScrollView>

        {/* Achievements Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={achievementsModalVisible}
          onRequestClose={() => setAchievementsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Achievements</Text>
                <TouchableOpacity onPress={() => setAchievementsModalVisible(false)}>
                  <Text style={styles.modalCloseButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.achievementsList}>
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>🏆</Text>
                  <Text style={styles.achievementText}>First Steps - Complete your first route</Text>
                </View>
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>⭐</Text>
                  <Text style={styles.achievementText}>Week Warrior - Walk 5 days in a row</Text>
                </View>
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>🎖️</Text>
                  <Text style={styles.achievementText}>Distance Master - Walk 10km total</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Side Menu Panel */}
        <Animated.View
          style={[
            styles.sideMenu,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuItem}>Profile</Text>
            <TouchableOpacity onPress={navigateToYourPet}>
              <Text style={styles.menuItem}>Your pet</Text>
            </TouchableOpacity>
            <Text style={styles.menuItem}>My routes</Text>
            <Text style={styles.menuItem}>Settings</Text>
            <Text style={styles.menuItem}>About</Text>
            <Text style={styles.menuItem}>Privacy Policy</Text>
            <Text style={styles.menuItem}>Terms & Conditions</Text>
          </View>
        </Animated.View>

        {/* Overlay */}
        {menuOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleMenu}
          />
        )}

        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Walk to school</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
        </TouchableOpacity>
      </View>

      {/* Side Menu Panel */}
      <Animated.View
        style={[
          styles.sideMenu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuItem}>Profile</Text>
          <TouchableOpacity onPress={navigateToYourPet}>
            <Text style={styles.menuItem}>Your pet</Text>
          </TouchableOpacity>
          <Text style={styles.menuItem}>My routes</Text>
          <Text style={styles.menuItem}>Settings</Text>
          <Text style={styles.menuItem}>About</Text>
          <Text style={styles.menuItem}>Privacy Policy</Text>
          <Text style={styles.menuItem}>Terms & Conditions</Text>
        </View>
      </Animated.View>

      {/* Overlay */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}

      <TouchableOpacity style={styles.dragonButton} onPress={navigateToYourPet}>
        <Image
          source={require('./assets/dragon.png')}
          style={styles.dragonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  burgerButton: {
    padding: 5,
  },
  burgerLine: {
    width: 25,
    height: 3,
    backgroundColor: '#333',
    marginVertical: 2,
    borderRadius: 2,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    zIndex: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 40,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#333',
  },
  menuContent: {
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 15,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  petPageContent: {
    flex: 1,
    marginTop: 60,
  },
  dragonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f9f9f9',
    marginTop: 20,
  },
  largeDragonImage: {
    width: 200,
    height: 200,
  },
  achievementsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  achievementsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routesContainer: {
    padding: 20,
  },
  routesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routeDate: {
    fontSize: 16,
    color: '#333',
  },
  routePoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
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
    padding: 20,
    width: width * 0.85,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#333',
  },
  achievementsList: {
    paddingVertical: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  achievementText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});
