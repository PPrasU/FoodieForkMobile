import React from 'react';
import { View, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreens, KeranjangScreens, PromoScreens, MenuPaketDetail, Search, Form } from '../screens/index';
import { Home2, TicketDiscount, ShoppingCart,} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          borderTopColor: '#b8b8b8',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && <View style={styles.line} />}
              <Home2
                color="#000"
                variant={focused ? 'Bold' : 'Linear'}
                size={24}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PromoScreens"
        component={PromoScreens}
        options={{
          tabBarLabel: 'Promo',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && <View style={styles.line} />}
              <TicketDiscount
                color="#000"
                variant={focused ? 'Bold' : 'Linear'}
                size={24}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Keranjang"
        component={KeranjangScreens}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && <View style={styles.line} />}
              <ShoppingCart
                color="#000"
                variant={focused ? 'Bold' : 'Linear'}
                size={24}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  line: {
    borderTopColor: '#12b800',
    borderTopWidth: 2,
    width: 40,
  },
});

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MenuPaketDetail"
        component={MenuPaketDetail}
        options={{
          headerShown: false, 
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection : 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
