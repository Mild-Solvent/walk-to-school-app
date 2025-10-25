import { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { commonStyles } from './src/styles/commonStyles';
import { colors } from './src/styles/theme';
import MapPage from './src/pages/MapPage';
import YourPetPage from './src/pages/YourPetPage';
import MyRoutesPage from './src/pages/MyRoutesPage';
import CreateRoutePage from './src/pages/CreateRoutePage';
import LearningPage from './src/pages/LearningPage';
import ShopPage from './src/pages/ShopPage';

const { width } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('map');
  const [achievementsModalVisible, setAchievementsModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [schoolRouteId, setSchoolRouteId] = useState(null);
  const [showSchoolRoute, setShowSchoolRoute] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [recentRoutes, setRecentRoutes] = useState([]);
  const [arrivalCount, setArrivalCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
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

  const navigateToMyRoutes = () => {
    setCurrentPage('myroutes');
    setMenuOpen(false);
  };

  const navigateToCreateRoute = () => {
    setWaypoints([]);
    setCurrentPage('createroute');
  };

  const navigateToLearning = () => {
    setCurrentPage('learning');
    setMenuOpen(false);
  };

  const navigateToShop = () => {
    setCurrentPage('shop');
    setMenuOpen(false);
  };

  const addPoints = (points) => {
    setTotalPoints(totalPoints + points);
  };

  const addRecentRoute = () => {
    const newRoute = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      points: 5,
    };
    setRecentRoutes([newRoute, ...recentRoutes]);
  };

  const handleMapLongPress = (e) => {
    const coordinate = e.nativeEvent.coordinate;
    setWaypoints([...waypoints, coordinate]);
  };

  const saveRoute = () => {
    if (waypoints.length < 2) {
      alert('Please add at least 2 waypoints');
      return;
    }
    const newRoute = {
      id: Date.now().toString(),
      name: `Route ${savedRoutes.length + 1}`,
      date: new Date().toLocaleDateString(),
      waypoints: waypoints,
    };
    setSavedRoutes([...savedRoutes, newRoute]);
    setWaypoints([]);
    setCurrentPage('myroutes');
  };

  const viewRoute = (routeId) => {
    setSelectedRouteId(routeId);
    setShowSchoolRoute(false);
    setCurrentPage('map');
  };

  const setSchoolRoute = (routeId) => {
    setSchoolRouteId(routeId);
  };

  const handleGoToSchool = () => {
    if (schoolRouteId) {
      setSelectedRouteId(null);
      setShowSchoolRoute(true);
    } else {
      alert('Please set a route to school first from My Routes page');
    }
  };

  const handleSimulateArrival = async () => {
    setIsAnimating(true);
    addPoints(5);
    addRecentRoute();
    
    const newCount = arrivalCount + 1;
    setArrivalCount(newCount);
    
    // Unlock achievement for first 3 arrivals
    if (newCount <= 3 && !unlockedAchievements.includes(newCount - 1)) {
      setUnlockedAchievements([...unlockedAchievements, newCount - 1]);
    }
    
    // Video will auto-stop after playing once
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // Adjust based on video length
  };

  const handlePurchase = (item) => {
    setTotalPoints(totalPoints - item.price);
    setPurchasedItems([...purchasedItems, item.id]);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={commonStyles.container}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Getting your location...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={commonStyles.container}>
          <Text style={commonStyles.errorText}>{errorMsg}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Route to appropriate page
  if (currentPage === 'shop') {
    return (
      <ShopPage
        navigateToMap={navigateToMap}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        slideAnim={slideAnim}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
        navigateToShop={navigateToShop}
        totalPoints={totalPoints}
        purchasedItems={purchasedItems}
        onPurchase={handlePurchase}
      />
    );
  }

  if (currentPage === 'learning') {
    return (
      <LearningPage
        navigateToMap={navigateToMap}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        slideAnim={slideAnim}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
        navigateToShop={navigateToShop}
        totalPoints={totalPoints}
        addPoints={addPoints}
      />
    );
  }

  if (currentPage === 'myroutes') {
    return (
      <MyRoutesPage
        navigateToMap={navigateToMap}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        slideAnim={slideAnim}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
        navigateToShop={navigateToShop}
        totalPoints={totalPoints}
        navigateToCreateRoute={navigateToCreateRoute}
        savedRoutes={savedRoutes}
        viewRoute={viewRoute}
        schoolRouteId={schoolRouteId}
        setSchoolRoute={setSchoolRoute}
      />
    );
  }

  if (currentPage === 'createroute') {
    return (
      <CreateRoutePage
        location={location}
        waypoints={waypoints}
        handleMapLongPress={handleMapLongPress}
        setCurrentPage={setCurrentPage}
        saveRoute={saveRoute}
      />
    );
  }

  if (currentPage === 'yourpet') {
    return (
      <YourPetPage
        navigateToMap={navigateToMap}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        slideAnim={slideAnim}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
        navigateToShop={navigateToShop}
        totalPoints={totalPoints}
        recentRoutes={recentRoutes}
        isAnimating={isAnimating}
        handleSimulateArrival={handleSimulateArrival}
        achievementsModalVisible={achievementsModalVisible}
        setAchievementsModalVisible={setAchievementsModalVisible}
        unlockedAchievements={unlockedAchievements}
        arrivalCount={arrivalCount}
      />
    );
  }

  return (
    <MapPage
      location={location}
      savedRoutes={savedRoutes}
      selectedRouteId={selectedRouteId}
      schoolRouteId={schoolRouteId}
      showSchoolRoute={showSchoolRoute}
      handleGoToSchool={handleGoToSchool}
      toggleMenu={toggleMenu}
      menuOpen={menuOpen}
      slideAnim={slideAnim}
      navigateToYourPet={navigateToYourPet}
      navigateToMyRoutes={navigateToMyRoutes}
      navigateToLearning={navigateToLearning}
      navigateToShop={navigateToShop}
      totalPoints={totalPoints}
    />
  );
}
