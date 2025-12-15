import { User, Award, Calendar } from 'lucide-react';

export const PRESET_FIELDS = [
  { 
    id: 'recipient-name', 
    label: 'Recipient Name', 
    icon: User, 
    defaultText: 'John Doe',
    fontSize: 48,
    fontFamily: 'Georgia',
    top: 400,
    color: '#1F2937'
  },
  { 
    id: 'course-name', 
    label: 'Course/Event', 
    icon: Award, 
    defaultText: 'Advanced Web Development',
    fontSize: 28,
    fontFamily: 'Georgia',
    top: 550,
    color: '#4F46E5'
  },
  { 
    id: 'date', 
    label: 'Date', 
    icon: Calendar, 
    defaultText: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    fontSize: 18,
    fontFamily: 'Arial',
    top: 650,
    color: '#6B7280'
  },
];
