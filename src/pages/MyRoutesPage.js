import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import SideMenu from '../components/SideMenu';

export default function MyRoutesPage({
  navigateToMap,
  toggleMenu,
  menuOpen,
  slideAnim,
  navigateToYourPet,
  navigateToMyRoutes,
  navigateToLearning,
  navigateToCreateRoute,
  savedRoutes,
  viewRoute,
}) {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={navigateToMap} style={commonStyles.backButton}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.appTitle}>My Routes</Text>
        <TouchableOpacity onPress={toggleMenu} style={commonStyles.burgerButton}>
          <View style={commonStyles.burgerLine} />
          <View style={commonStyles.burgerLine} />
          <View style={commonStyles.burgerLine} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.petPageContent}>
        <TouchableOpacity
          style={styles.createRouteButton}
          onPress={navigateToCreateRoute}
        >
          <Text style={styles.createRouteButtonText}>Create Route</Text>
        </TouchableOpacity>

        <View style={styles.routesContainer}>
          <Text style={styles.routesTitle}>Saved Routes</Text>
          {savedRoutes.length === 0 ? (
            <Text style={styles.noRoutesText}>No routes yet. Create your first route!</Text>
          ) : (
            savedRoutes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeItem}
                onPress={() => viewRoute(route.id)}
              >
                <View>
                  <Text style={styles.routeName}>{route.name}</Text>
                  <Text style={styles.routeDate}>{route.date}</Text>
                </View>
                <Text style={styles.waypointCount}>{route.waypoints.length} points</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <SideMenu
        slideAnim={slideAnim}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  petPageContent: {
    flex: 1,
    marginTop: 60,
  },
  createRouteButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
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
  createRouteButtonText: {
    color: '#fff',
    fontSize: 18,
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
  noRoutesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
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
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  routeDate: {
    fontSize: 16,
    color: '#333',
  },
  waypointCount: {
    fontSize: 14,
    color: '#666',
  },
});
