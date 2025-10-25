import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { commonStyles, width } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing } from '../styles/theme';

export default function CreateRoutePage({
  location,
  waypoints,
  handleMapLongPress,
  setCurrentPage,
  saveRoute,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
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
  createRouteInfo: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: colors.overlayLight,
    padding: 12,
    borderRadius: borderRadius.md,
    ...shadows.medium,
  },
  createRouteInfoText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  saveRouteButton: {
    position: 'absolute',
    bottom: 30,
    left: width / 2 - 60,
    backgroundColor: colors.primaryLight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: borderRadius.xl,
    ...shadows.glow,
  },
  saveRouteButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
