import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
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
      { id: 'crocodile', name: 'Crocodile', price: 30, image: require('../../assets/shop/pets/crocodile.png') },
      { id: 'fox', name: 'Fox', price: 30, image: require('../../assets/shop/pets/fox.png') },
      { id: 'frog', name: 'Frog', price: 15, image: require('../../assets/shop/pets/frog.png') },
      { id: 'lion', name: 'Lion', price: 30, image: require('../../assets/shop/pets/lion.png') },
      { id: 'robot', name: 'Robot', price: 25, image: require('../../assets/shop/pets/robot.png') },
      { id: 'sheep', name: 'Sheep', price: 20, image: require('../../assets/shop/pets/sheep.png') },
    ],
    accessories: [
      { id: 'cowboy_hat', name: 'Cowboy Hat', price: 15, image: require('../../assets/shop/accesories/cowboy_hat.png') },
      { id: 'crown', name: 'Crown', price: 20, image: require('../../assets/shop/accesories/crown.png') },
      { id: 'glasses', name: 'Glasses', price: 12, image: require('../../assets/shop/accesories/glasses.png') },
      { id: 'part_hat', name: 'Party Hat', price: 10, image: require('../../assets/shop/accesories/part hat.png') },
      { id: 'staff', name: 'Staff', price: 18, image: require('../../assets/shop/accesories/staff.png') },
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
      <TouchableOpacity
        key={item.id}
        style={styles.shopItem}
        onPress={() => handlePurchase(item)}
        disabled={isPurchased}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} pts</Text>
        <View style={[styles.buyButton, isPurchased && styles.buyButtonDisabled]}>
          <Text style={styles.buyButtonText}>
            {isPurchased ? 'Owned' : 'Buy'}
          </Text>
        </View>
      </TouchableOpacity>
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
          <View style={styles.gridContainer}>
            {shopItems[selectedTab].map(renderShopItem)}
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
  shopContent: {
    flex: 1,
    marginTop: 60,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    ...shadows.medium,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(199, 125, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(199, 125, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 65,
    height: 65,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: borderRadius.lg,
    width: '100%',
    alignItems: 'center',
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
