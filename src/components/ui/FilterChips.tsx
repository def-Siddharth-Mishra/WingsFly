import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TaskStatus } from '../../types';

interface FilterChipsProps {
  selectedFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  taskCounts?: {
    all: number;
    done: number;
    pending: number;
    upcoming: number;
  };
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedFilter,
  onFilterChange,
  taskCounts,
}) => {
  const { theme } = useTheme();

  const filters = [
    { key: 'all' as const, label: 'All', count: taskCounts?.all },
    { key: 'pending' as const, label: 'Pending', count: taskCounts?.pending },
    { key: 'done' as const, label: 'Done', count: taskCounts?.done },
    { key: 'upcoming' as const, label: 'Upcoming', count: taskCounts?.upcoming },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.key;
        
        return (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected 
                  ? theme.colors.primary 
                  : theme.colors.surface,
                borderColor: isSelected 
                  ? theme.colors.primary 
                  : theme.colors.border,
              },
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected 
                    ? '#FFFFFF' 
                    : theme.colors.text,
                },
              ]}
            >
              {filter.label}
            </Text>
            {filter.count !== undefined && (
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isSelected 
                      ? 'rgba(255,255,255,0.3)' 
                      : theme.colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    {
                      color: isSelected 
                        ? '#FFFFFF' 
                        : '#FFFFFF',
                    },
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FilterChips;