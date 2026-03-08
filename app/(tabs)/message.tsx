import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function MessageScreen() {
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>{t('messagesTitle')}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Placeholder page
        </Text>
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${theme.tint}18` }]}>
            <Ionicons name="chatbubble-ellipses-outline" size={36} color={theme.tint} />
          </View>

          <Text style={[styles.cardTitle, { color: theme.text }]}>{t('noMessages')}</Text>
          <Text style={[styles.cardBody, { color: theme.textSecondary }]}>
            Messaging is temporarily disabled on this screen. This placeholder keeps the tab stable while the message feature is being fixed.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardBody: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
