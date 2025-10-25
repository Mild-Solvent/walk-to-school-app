import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoView, useVideoPlayer } from 'expo-video';
import { commonStyles } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing } from '../styles/theme';
import SideMenu from '../components/SideMenu';
import ConfettiCannon from 'react-native-confetti-cannon';
import Toast from 'react-native-toast-message';

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
  achievementsModalVisible,
  setAchievementsModalVisible,
  unlockedAchievements = [],
  arrivalCount = 0,
}) {
  const videoSource = require('../../assets/animated-dragon.mp4');
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
  });

  const modalSlide = useRef(new Animated.Value(500)).current;
  const [fireConfettiKey, setFireConfettiKey] = useState(0);

  const achievementDefinitions = [
    { icon: '🏆', title: 'First Steps', subtitle: 'Completed your first route!' },
    { icon: '⭐', title: 'Getting the Hang of It', subtitle: 'Two routes down!' },
    { icon: '🎖️', title: 'On a Roll', subtitle: 'Three routes complete!' },
  ];

  useEffect(() => {
    if (isAnimating) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [isAnimating]);

  useEffect(() => {
    if (achievementsModalVisible) {
      Animated.spring(modalSlide, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      modalSlide.setValue(500);
    }
  }, [achievementsModalVisible]);

  // Fire confetti and toast when a new achievement is unlocked (first 3 arrivals)
  useEffect(() => {
    if (arrivalCount > 0 && arrivalCount <= 3) {
      // Only show when just unlocked
      if (unlockedAchievements.includes(arrivalCount - 1)) {
        setFireConfettiKey(prev => prev + 1);
        Toast.show({
          type: 'success',
          text1: achievementDefinitions[arrivalCount - 1].title,
          text2: achievementDefinitions[arrivalCount - 1].subtitle,
          position: 'bottom',
        });
      }
    }
  }, [arrivalCount, unlockedAchievements]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
              <VideoView
                player={player}
                style={styles.largeDragonImage}
                contentFit="contain"
                nativeControls={false}
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

      {/* Confetti cannon - key changes to re-fire */}
      {fireConfettiKey > 0 && (
        <ConfettiCannon
          key={`confetti-${fireConfettiKey}`}
          count={120}
          origin={{ x: 200, y: 0 }}
          fadeOut={true}
          fallSpeed={2500}
          explosionSpeed={450}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={achievementsModalVisible}
        onRequestClose={() => setAchievementsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalSlide }] }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Achievements</Text>
              <TouchableOpacity onPress={() => setAchievementsModalVisible(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.achievementsList}>
              {achievementDefinitions.map((a, idx) => {
                const unlocked = unlockedAchievements.includes(idx);
                return (
                  <View key={idx} style={[styles.achievementItem, unlocked ? {} : { opacity: 0.45 }] }>
                    <Text style={styles.achievementIcon}>{a.icon}</Text>
                    <Text style={styles.achievementText}>
                      {a.title} {unlocked ? '— Unlocked!' : '— Locked'}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>
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

      <Toast />

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
  },
  dragonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: colors.surfaceLight,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  largeDragonImage: {
    width: 200,
    height: 200,
  },
  simulateButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: borderRadius.lg,
    marginTop: 15,
    ...shadows.small,
  },
  simulateButtonDisabled: {
    backgroundColor: colors.surface,
    elevation: 0,
  },
  simulateButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  achievementsButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: borderRadius.xl,
    alignSelf: 'center',
    marginVertical: 20,
    ...shadows.glow,
  },
  achievementsButtonText: {
    color: colors.text,
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
    color: colors.text,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginBottom: 10,
    ...shadows.small,
  },
  routeDate: {
    fontSize: 16,
    color: colors.text,
  },
  routePoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  noRoutesText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
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
    padding: 20,
    width: '85%',
    maxHeight: '70%',
    ...shadows.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalCloseButton: {
    fontSize: 24,
    color: colors.text,
  },
  achievementsList: {
    paddingVertical: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    marginBottom: 10,
    ...shadows.small,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  achievementText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
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
