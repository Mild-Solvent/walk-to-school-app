import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { width } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing } from '../styles/theme';

export default function SideMenu({ 
  slideAnim, 
  menuOpen, 
  toggleMenu, 
  navigateToYourPet, 
  navigateToMyRoutes,
  navigateToLearning,
  navigateToShop 
}) {
  return (
    <>
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
          <TouchableOpacity onPress={navigateToMyRoutes}>
            <Text style={styles.menuItem}>My routes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLearning}>
            <Text style={styles.menuItem}>Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToShop}>
            <Text style={styles.menuItem}>Shop</Text>
          </TouchableOpacity>
          <Text style={styles.menuItem}>Settings</Text>
          <Text style={styles.menuItem}>About</Text>
          <Text style={styles.menuItem}>Privacy Policy</Text>
          <Text style={styles.menuItem}>Terms & Conditions</Text>
        </View>
      </Animated.View>

      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sideMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: colors.surface,
    ...shadows.large,
    zIndex: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
    marginTop: 40,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: colors.text,
  },
  menuContent: {
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    color: colors.text,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    zIndex: 15,
  },
});
