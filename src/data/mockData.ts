import { Task, Quote, DateItem } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Schedule a meeting with Harshit Sir',
    time: '09:00 AM',
    timeColor: '#1E8EF7',
    tags: ['Habit', 'Must'],
    status: 'done',
    image: require('../assets/icon1.png'),
    priority: 'high',
    description: 'Important meeting to discuss project progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: '2.5 Hours Simran and Meditation',
    time: '09:00 AM',
    timeColor: '#DE3B8B',
    tags: ['Habit', 'Must'],
    status: 'pending',
    image: require('../assets/icon2.png'),
    priority: 'high',
    description: 'Daily spiritual practice for mental clarity',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    title: 'Save 200 Rupees Daily',
    time: '12:00 PM',
    timeColor: '#F5B50E',
    tags: ['Habit', 'Must'],
    status: 'pending',
    image: require('../assets/icon3.png'),
    priority: 'medium',
    description: 'Financial discipline for future goals',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    title: 'Walk 10k Step Daily',
    time: '07:00 AM',
    timeColor: '#00C853',
    tags: ['Habit', 'Important'],
    status: 'pending',
    image: require('../assets/icon4.png'),
    priority: 'medium',
    description: 'Daily exercise for physical health',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '5',
    title: 'Buy Sunflower for Mumma',
    time: '11:00 AM',
    timeColor: '#FFA000',
    tags: ['Task', 'Important'],
    status: 'upcoming',
    image: require('../assets/icon5.png'),
    priority: 'low',
    description: 'Special gift to show appreciation',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '6',
    title: 'Make Mandala and Colour Daily',
    time: '07:30 PM',
    timeColor: '#00C853',
    tags: ['Task', 'Important'],
    status: 'pending',
    image: require('../assets/icon6.png'),
    priority: 'low',
    description: 'Creative activity for relaxation',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const mockQuote: Quote = {
  id: '1',
  text: 'You must do the things, you think you cannot do.',
  author: 'Eleanor Roosevelt',
  progress: 0.65,
};

export const generateDateData = (): DateItem[] => {
  const today = new Date();
  const dates: DateItem[] = [];
  
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    dates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: i === 0,
    });
  }
  
  return dates;
};