import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing } from '../styles/theme';
import SideMenu from '../components/SideMenu';

export default function MyRoutesPage({
  navigateToMap,
  toggleMenu,
  menuOpen,
  slideAnim,
  navigateToYourPet,
  navigateToMyRoutes,
  navigateToLearning,
  navigateToShop,
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
        navigateToShop={navigateToShop}
      />

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
  petPageContent: {
    flex: 1,
    marginTop: 60,
    width: '100%',
  },
  createRouteButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: borderRadius.xl,
    alignSelf: 'center',
    marginVertical: 20,
    ...shadows.glow,
  },
  createRouteButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  routesContainer: {
    padding: 20,
    width: '100%',
  },
  routesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text,
  },
  noRoutesText: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
  routeItemContainer: {
    marginBottom: 15,
    width: '100%',
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...shadows.small,
  },
  routeItemSchool: {
    borderColor: colors.accent,
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  routeDate: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  waypointCount: {
    fontSize: 14,
    color: colors.textMuted,
  },
  setSchoolButton: {
    backgroundColor: colors.surfaceLight,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderTopWidth: 0,
  },
  setSchoolButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    ...shadows.small,
  },
  setSchoolButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  setSchoolButtonTextActive: {
    color: colors.text,
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
});
