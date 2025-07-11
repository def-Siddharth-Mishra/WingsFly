import React from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { DateSelectorProps, DateItem } from '../types';
import { generateDateData } from '../data/mockData';

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateSelect,
  dates = generateDateData(),
}) => {
  const { theme } = useTheme();

  return (
    <FlatList
      data={dates}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.date.toString()}
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.surface }]}
      renderItem={({ item }) => {
        const isSelected = item.date === selectedDate;
        const isToday = item.isToday;

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onDateSelect(item.date)}
            style={[
              styles.dateButton,
              isSelected 
                ? { backgroundColor: theme.colors.primary }
                : { backgroundColor: theme.colors.border },
              isToday && !isSelected && { borderWidth: 2, borderColor: theme.colors.primary },
            ]}
          >
            <Text
              style={[
                styles.dayText, 
                { color: isSelected ? '#FFFFFF' : theme.colors.textMuted },
                isToday && !isSelected && { color: theme.colors.primary, fontWeight: '600' },
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
                  { color: isSelected ? '#FFFFFF' : theme.colors.text },
                  isToday && !isSelected && { color: theme.colors.primary, fontWeight: '700' },
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
