import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import QuoteSection from '../components/QuoteSection';
import TaskItem from '../components/TaskItem';
import FloatingActionButton from '../components/FloatingActionButton';
import BottomDrawer from '../components/BottomDrawer';
import FilterChips from '../components/ui/FilterChips';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { mockQuote, generateDateData } from '../data/mockData';
import { TaskStatus } from '../types';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { tasks, toggleTaskComplete } = useTask();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedFilter, setSelectedFilter] = useState<TaskStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(task => task.status === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [tasks, selectedFilter, searchQuery]);

  // Calculate task counts for filter chips
  const taskCounts = useMemo(() => ({
    all: tasks.length,
    done: tasks.filter(task => task.status === 'done').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    upcoming: tasks.filter(task => task.status === 'upcoming').length,
  }), [tasks]);

  const handleTaskPress = (task: any) => {
    console.log('Task pressed:', task.title);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateSelectorContainer}>
          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            dates={generateDateData()}
          />
        </View>
        
        <QuoteSection quote={mockQuote} />

        <FilterChips
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          taskCounts={taskCounts}
        />

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskComplete}
              onPress={handleTaskPress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
              {searchQuery ? 'No tasks found matching your search' : 'No tasks found'}
            </Text>
          </View>
        )}
      </ScrollView>

      <FloatingActionButton onPress={() => setDrawerVisible(true)} />
      <BottomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateSelectorContainer: {
    padding: 0,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
