import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  totalPoints,
  navigateToCreateRoute,
  savedRoutes,
  viewRoute,
  schoolRouteId,
  setSchoolRoute,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={navigateToMap} style={commonStyles.backButton}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.appTitle}>My Routes</Text>
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
              <View key={route.id} style={styles.routeItemContainer}>
                <TouchableOpacity
                  style={[
                    styles.routeItem,
                    schoolRouteId === route.id && styles.routeItemSchool,
                  ]}
                  onPress={() => viewRoute(route.id)}
                >
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    <Text style={styles.routeDate}>{route.date}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.setSchoolButton,
                    schoolRouteId === route.id && styles.setSchoolButtonActive,
                  ]}
                  onPress={() => setSchoolRoute(route.id)}
                >
                  <Text style={[
                    styles.setSchoolButtonText,
                    schoolRouteId === route.id && styles.setSchoolButtonTextActive,
                  ]}>
                    {schoolRouteId === route.id ? '✓ School Route' : 'Set as School Route'}
                  </Text>
                </TouchableOpacity>
              </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  routeItemContainer: {
    marginBottom: 15,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routeItemSchool: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  routeInfo: {
    flex: 1,
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
  setSchoolButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderTopWidth: 0,
  },
  setSchoolButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  setSchoolButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  setSchoolButtonTextActive: {
    color: '#fff',
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
});
