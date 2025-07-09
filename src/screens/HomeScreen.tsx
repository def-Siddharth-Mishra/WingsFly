import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import QuoteSection from '../components/QuoteSection';
import TaskItem from '../components/TaskItem';
import FloatingActionButton from '../components/FloatingActionButton';
import BottomDrawer from '../components/BottomDrawer';

const HomeScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateSelectorContainer}>
          <DateSelector />
        </View>
        <QuoteSection />

        <TaskItem
          image={require('../assets/icon1.png')}
          title="Schedule a meeting with Harshit Sir"
          time="09:00 AM"
          timeColor="#1E8EF7"
          tags={['Habit', 'Must']}
          status="done"
        />

        <TaskItem
          image={require('../assets/icon2.png')}
          title="2.5 Hours Simran and Meditation"
          time="09:00 AM"
          timeColor="#DE3B8B"
          tags={['Habit', 'Must']}
          status="pending"
        />

        <TaskItem
          image={require('../assets/icon3.png')}
          title="Save 200 Rupees Daily"
          time="12:00 PM"
          timeColor="#F5B50E"
          tags={['Habit', 'Must']}
          status="pending"
        />

        <TaskItem
          image={require('../assets/icon4.png')}
          title="Walk 10k Step Daily"
          time="07:00 AM"
          timeColor="#00C853"
       
          tags={['Habit', 'Important']}
          status="pending"
        />

        <TaskItem
          image={require('../assets/icon5.png')}
          title="Buy Sunflower for Mumma"
          time="11:00 AM"
          timeColor="#FFA000"
     
          tags={['Task', 'Important']}
          status="upcoming"
        />

        <TaskItem
          image={require('../assets/icon6.png')}
          title="Make Mandala and Colour Daily"
          time="07:30 PM"
          timeColor="#00C853"
       
          tags={['Task', 'Important']}
          status="pending"
        />
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
    padding:0
  },
});

export default HomeScreen;
