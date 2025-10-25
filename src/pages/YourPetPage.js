import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { commonStyles } from '../styles/commonStyles';
import SideMenu from '../components/SideMenu';

export default function YourPetPage({
  navigateToMap,
  toggleMenu,
  menuOpen,
  slideAnim,
  navigateToYourPet,
  navigateToMyRoutes,
  navigateToLearning,
  totalPoints,
  recentRoutes,
  isAnimating,
  handleSimulateArrival,
  videoRef,
  handleVideoPlaybackStatusUpdate,
  achievementsModalVisible,
  setAchievementsModalVisible,
}) {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={navigateToMap} style={commonStyles.backButton}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.appTitle}>Your Pet</Text>
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
        <View style={styles.dragonContainer}>
          {!isAnimating ? (
            <Image
              source={require('../../assets/dragon.png')}
              style={styles.largeDragonImage}
              resizeMode="contain"
            />
          ) : (
            <Video
              ref={videoRef}
              source={require('../../assets/animated-dragon.mp4')}
              style={styles.largeDragonImage}
              resizeMode="contain"
              shouldPlay
              isLooping={false}
              onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
            />
          )}
          <TouchableOpacity
            style={[styles.simulateButton, isAnimating && styles.simulateButtonDisabled]}
            onPress={handleSimulateArrival}
            disabled={isAnimating}
          >
            <Text style={styles.simulateButtonText}>
              {isAnimating ? 'Animating...' : 'Simulate Arrival'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.achievementsButton}
          onPress={() => setAchievementsModalVisible(true)}
        >
          <Text style={styles.achievementsButtonText}>Achievements</Text>
        </TouchableOpacity>

        <View style={styles.routesContainer}>
          <Text style={styles.routesTitle}>Recent Routes</Text>
          {recentRoutes.length === 0 ? (
            <Text style={styles.noRoutesText}>No recent routes yet. Click "Simulate Arrival" to add one!</Text>
          ) : (
            recentRoutes.slice(0, 4).map((route, index) => (
              <View key={index} style={styles.routeItem}>
                <Text style={styles.routeDate}>{route.date}</Text>
                <Text style={styles.routePoints}>+{route.points}pts</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

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
  simulateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  simulateButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  simulateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  noRoutesText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
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
    width: '85%',
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
