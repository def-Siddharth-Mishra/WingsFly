// Core data types
export interface Task {
  id: string;
  title: string;
  time: string;
  timeColor: string;
  tags: string[];
  status: TaskStatus;
  image: any; // For require() images
  priority?: TaskPriority;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'done' | 'pending' | 'upcoming';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface DateItem {
  day: string;
  date: number;
  isToday?: boolean;
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
  progress: number;
}

// Component Props Types
export interface TaskItemProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  onPress?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export interface DateSelectorProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
  dates?: DateItem[];
}

export interface QuoteSectionProps {
  quote: Quote;
}

export interface HeaderProps {
  onSearchPress?: () => void;
  onCalendarPress?: () => void;
  onHelpPress?: () => void;
}

export interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  size?: number;
}

export interface BottomDrawerProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect?: (option: DrawerOption) => void;
}

export interface DrawerOption {
  id: string;
  icon: string;
  label: string;
  description: string;
  action: () => void;
}

// Context Types
export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  searchTasks: (query: string) => Task[];
}

// Filter and Search Types
export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchState {
  query: string;
  isActive: boolean;
  results: Task[];
}