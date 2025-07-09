import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const dateData = [
  { day: 'Sun', date: 15 },
  { day: 'Mon', date: 16 },
  { day: 'Tue', date: 17 },
  { day: 'Wed', date: 18 },
  { day: 'Thu', date: 19 },
  { day: 'Fri', date: 20 },
  { day: 'Sat', date: 21 },
];

const DateSelector = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(18);

  return (
    <FlatList
      data={dateData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.date.toString()}
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.surface }]}
      renderItem={({ item }) => {
        const isSelected = item.date === selectedDate;

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedDate(item.date)}
            style={[
              styles.dateButton,
              isSelected 
                ? { backgroundColor: theme.colors.primary }
                : { backgroundColor: theme.colors.border },
            ]}
          >
            <Text
              style={[
                styles.dayText, 
                { color: isSelected ? '#FFFFFF' : theme.colors.textMuted }
              ]}
            >
              {item.day}
            </Text>

            <View
              style={[
                styles.dateCircle,
                {
                  backgroundColor: isSelected 
                    ? theme.colors.primaryDark 
                    : theme.colors.progressTrack
                }
              ]}
            >
              <Text
                style={[
                  styles.dateText, 
                  { color: isSelected ? '#FFFFFF' : theme.colors.text }
                ]}
              >
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  dateButton: {
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: 60,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dayText: {
    fontSize: 12,
    marginBottom: 4,
  },
  dateCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 4,
    width: 57,
    height: 35,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DateSelector;
