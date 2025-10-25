import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing } from '../styles/theme';
import SideMenu from '../components/SideMenu';

export default function ShopPage({
  navigateToMap,
  toggleMenu,
  menuOpen,
  slideAnim,
  navigateToYourPet,
  navigateToMyRoutes,
  navigateToLearning,
  navigateToShop,
  totalPoints,
  purchasedItems,
  onPurchase,
}) {
  const [selectedTab, setSelectedTab] = useState('pets');

  const shopItems = {
    pets: [
      { id: 'pet1', name: '🐱 Cat', price: 25, emoji: '🐱' },
      { id: 'pet2', name: '🐶 Dog', price: 25, emoji: '🐶' },
      { id: 'pet3', name: '🐰 Rabbit', price: 20, emoji: '🐰' },
      { id: 'pet4', name: '🦊 Fox', price: 30, emoji: '🦊' },
      { id: 'pet5', name: '🐼 Panda', price: 30, emoji: '🐼' },
      { id: 'pet6', name: '🦁 Lion', price: 30, emoji: '🦁' },
      { id: 'pet7', name: '🐯 Tiger', price: 30, emoji: '🐯' },
      { id: 'pet8', name: '🐸 Frog', price: 15, emoji: '🐸' },
    ],
    accessories: [
      { id: 'acc1', name: '👑 Crown', price: 20, emoji: '👑' },
      { id: 'acc2', name: '🎩 Top Hat', price: 15, emoji: '🎩' },
      { id: 'acc3', name: '🎀 Bow', price: 10, emoji: '🎀' },
      { id: 'acc4', name: '👓 Glasses', price: 12, emoji: '👓' },
      { id: 'acc5', name: '🎭 Mask', price: 18, emoji: '🎭' },
      { id: 'acc6', name: '🧣 Scarf', price: 15, emoji: '🧣' },
      { id: 'acc7', name: '⭐ Star Badge', price: 8, emoji: '⭐' },
      { id: 'acc8', name: '🌸 Flower', price: 10, emoji: '🌸' },
      { id: 'acc9', name: '🎒 Backpack', price: 20, emoji: '🎒' },
      { id: 'acc10', name: '🦴 Bone', price: 5, emoji: '🦴' },
    ],
  };

  const handlePurchase = (item) => {
    if (purchasedItems.includes(item.id)) {
      Alert.alert('Already Owned', 'You already own this item!');
      return;
    }

    if (totalPoints < item.price) {
      Alert.alert('Not Enough Points', `You need ${item.price - totalPoints} more points to purchase this item.`);
      return;
    }

    Alert.alert(
      'Confirm Purchase',
      `Purchase ${item.name} for ${item.price} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy',
          onPress: () => onPurchase(item),
        },
      ]
    );
  };

  const renderShopItem = (item) => {
    const isPurchased = purchasedItems.includes(item.id);

    return (
      <View key={item.id} style={styles.shopItem}>
        <Text style={styles.itemEmoji}>{item.emoji}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} pts</Text>
        </View>
        <TouchableOpacity
          style={[styles.buyButton, isPurchased && styles.buyButtonDisabled]}
          onPress={() => handlePurchase(item)}
          disabled={isPurchased}
        >
          <Text style={styles.buyButtonText}>
            {isPurchased ? 'Owned' : 'Buy'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={navigateToMap} style={commonStyles.backButton}>
            <Text style={commonStyles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={commonStyles.appTitle}>Shop</Text>
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

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'pets' && styles.tabActive]}
            onPress={() => setSelectedTab('pets')}
          >
            <Text style={[styles.tabText, selectedTab === 'pets' && styles.tabTextActive]}>
              Pets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'accessories' && styles.tabActive]}
            onPress={() => setSelectedTab('accessories')}
          >
            <Text style={[styles.tabText, selectedTab === 'accessories' && styles.tabTextActive]}>
              Accessories
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.shopContent}>
          {shopItems[selectedTab].map(renderShopItem)}
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
  shopContent: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
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
  tabContainer: {
    flexDirection: 'row',
    marginTop: 70,
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 4,
    ...shadows.small,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  tabActive: {
    backgroundColor: colors.primaryLight,
    ...shadows.small,
  },
  tabText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.text,
    fontWeight: 'bold',
  },
  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginVertical: 8,
    ...shadows.medium,
  },
  itemEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: borderRadius.lg,
    ...shadows.small,
  },
  buyButtonDisabled: {
    backgroundColor: colors.surface,
    opacity: 0.6,
  },
  buyButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
