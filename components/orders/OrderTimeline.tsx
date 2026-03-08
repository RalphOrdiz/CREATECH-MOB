/**
 * Order Timeline Component
 * Display chronological event history and audit trail
 */

import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/frontend/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

interface TimelineEvent {
  id: string;
  order_id: string;
  event_type: string;
  actor_id: string;
  message: string;
  metadata?: Record<string, any>;
  created_at: string;
}

interface OrderTimelineProps {
  orderId: string;
  compact?: boolean;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ orderId, compact = false }) => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchTimeline = async () => {
    try {
      const { data, error } = await supabase
        .from('order_timeline')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string): keyof typeof Ionicons.glyphMap => {
    switch (eventType) {
      case 'created':
        return 'add-circle';
      case 'accepted':
        return 'checkmark-circle';
      case 'payment_made':
        return 'cash';
      case 'work_started':
        return 'hammer';
      case 'preview_uploaded':
        return 'image';
      case 'delivered':
        return 'cube';
      case 'deadline_warning':
        return 'warning';
      case 'deadline_passed':
        return 'alert-circle';
      case 'extension_requested':
        return 'time';
      case 'extension_approved':
        return 'checkmark-done';
      case 'extension_rejected':
        return 'close-circle';
      case 'refund_requested':
        return 'arrow-undo';
      case 'refund_approved':
        return 'cash-outline';
      case 'completed':
        return 'trophy';
      case 'cancelled':
        return 'ban';
      default:
        return 'ellipse';
    }
  };

  const getEventColor = (eventType: string): string => {
    switch (eventType) {
      case 'created':
      case 'accepted':
      case 'work_started':
      case 'extension_approved':
      case 'completed':
        return '#10B981';
      case 'payment_made':
      case 'delivered':
      case 'preview_uploaded':
        return '#3B82F6';
      case 'deadline_warning':
      case 'extension_requested':
        return '#F59E0B';
      case 'deadline_passed':
      case 'extension_rejected':
      case 'refund_requested':
      case 'cancelled':
        return '#EF4444';
      case 'refund_approved':
        return '#8B5CF6';
      default:
        return theme.textSecondary;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <ActivityIndicator size="small" color={theme.tint} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading timeline...</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Ionicons name="time-outline" size={24} color={theme.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No events yet</Text>
      </View>
    );
  }

  const displayEvents = compact ? events.slice(0, 5) : events;

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={18} color={theme.text} />
        <Text style={[styles.headerText, { color: theme.text }]}>Order Timeline</Text>
      </View>

      <ScrollView style={styles.timeline} showsVerticalScrollIndicator={false}>
        {displayEvents.map((event, index) => {
          const isLast = index === displayEvents.length - 1;
          const eventColor = getEventColor(event.event_type);
          const eventIcon = getEventIcon(event.event_type);

          return (
            <View key={event.id} style={styles.eventRow}>
              <View style={styles.iconColumn}>
                <View style={[styles.iconCircle, { backgroundColor: eventColor + '20' }]}>
                  <Ionicons name={eventIcon} size={16} color={eventColor} />
                </View>
                {!isLast && <View style={[styles.connector, { backgroundColor: theme.cardBorder }]} />}
              </View>

              <View style={[styles.eventContent, !isLast && styles.eventContentWithMargin]}>
                <Text style={[styles.eventMessage, { color: theme.text }]}>{event.message}</Text>
                <Text style={[styles.eventTime, { color: theme.textSecondary }]}>
                  {formatTimestamp(event.created_at)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {compact && events.length > 5 && (
        <Text style={[styles.moreText, { color: theme.textSecondary }]}>+{events.length - 5} more events</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeline: {
    maxHeight: 300,
  },
  eventRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconColumn: {
    alignItems: 'center',
    width: 24,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  eventContent: {
    flex: 1,
    paddingBottom: 4,
  },
  eventContentWithMargin: {
    marginBottom: 12,
  },
  eventMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 11,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
  },
  moreText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default OrderTimeline;

