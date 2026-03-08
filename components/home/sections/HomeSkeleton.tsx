import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const HomeSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, [opacity]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: theme.background }}
      style={{ flex: 1 }}
      bounces={false}
    >
      {/* Categories Section Skeleton */}
      <View style={{ paddingTop: 26 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 12 }}>
          <Animated.View style={{ height: 24, width: 150, backgroundColor: theme.cardBorder, borderRadius: 6, opacity }} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 8, paddingVertical: 6 }}>
          {[1, 2, 3].map(i => (
            <Animated.View key={i} style={{
              width: 220,
              height: 180,
              borderRadius: 16,
              marginRight: 16,
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              opacity
            }} />
          ))}
        </ScrollView>
      </View>

      {/* Matches / Services Section Skeleton (Larger Cards) */}
      <View style={{ paddingTop: 26 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 12 }}>
          <Animated.View style={{ height: 24, width: 180, backgroundColor: theme.cardBorder, borderRadius: 6, opacity }} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 8, paddingVertical: 6 }}>
          {[1, 2].map(i => (
            <Animated.View key={i} style={{
              width: 260,
              height: 280,
              borderRadius: 16,
              marginRight: 16,
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              opacity
            }} />
          ))}
        </ScrollView>
      </View>

      {/* Creators Section Skeleton (Square Cards) */}
      <View style={{ paddingTop: 26 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 12 }}>
          <Animated.View style={{ height: 24, width: 120, backgroundColor: theme.cardBorder, borderRadius: 6, opacity }} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 8, paddingVertical: 6 }}>
          {[1, 2, 3, 4].map(i => (
            <Animated.View key={i} style={{
              width: 180,
              height: 170,
              borderRadius: 16,
              marginRight: 16,
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              opacity
            }} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};
