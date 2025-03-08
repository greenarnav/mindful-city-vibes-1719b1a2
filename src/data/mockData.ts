
import { CityMood, MoodType } from "@/types/mood";
import { addDays, format, subDays } from "date-fns";

// Helper functions to generate mock data
const getRandomMood = (): MoodType => {
  const moods: MoodType[] = ['happy', 'energetic', 'calm', 'melancholy', 'stressed', 'inspired'];
  return moods[Math.floor(Math.random() * moods.length)];
};

const getRandomValue = (min = 30, max = 100): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generatePastMoods = (days: number, baseMood?: MoodType) => {
  const pastMoods = [];
  const today = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = subDays(today, i);
    const mood = baseMood || getRandomMood();
    pastMoods.push({
      mood,
      value: getRandomValue(),
      timestamp: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
    });
  }
  
  return pastMoods;
};

// Mock city data
export const mockCityData: CityMood = {
  overall: {
    mood: 'happy',
    value: 78,
    timestamp: new Date().toISOString(),
  },
  pastFiveDays: [
    {
      mood: 'happy',
      value: 75,
      timestamp: format(subDays(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      mood: 'energetic',
      value: 82,
      timestamp: format(subDays(new Date(), 4), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      mood: 'energetic',
      value: 85,
      timestamp: format(subDays(new Date(), 3), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      mood: 'calm',
      value: 68,
      timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      mood: 'happy',
      value: 72,
      timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"),
    },
  ],
  neighborhoods: [
    {
      id: "1",
      name: "Downtown",
      currentMood: {
        mood: 'energetic',
        value: 88,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'energetic'),
    },
    {
      id: "2",
      name: "Riverside",
      currentMood: {
        mood: 'calm',
        value: 72,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'calm'),
    },
    {
      id: "3",
      name: "Arts District",
      currentMood: {
        mood: 'inspired',
        value: 82,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'inspired'),
    },
    {
      id: "4",
      name: "University Area",
      currentMood: {
        mood: 'stressed',
        value: 65,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'stressed'),
    },
    {
      id: "5",
      name: "Ocean View",
      currentMood: {
        mood: 'happy',
        value: 91,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'happy'),
    },
  ],
  friends: [
    {
      id: "1",
      name: "Alex",
      avatar: "https://i.pravatar.cc/150?img=1",
      currentMood: {
        mood: 'happy',
        value: 85,
        timestamp: new Date().toISOString(),
      },
    },
    {
      id: "2",
      name: "Jordan",
      avatar: "https://i.pravatar.cc/150?img=2",
      currentMood: {
        mood: 'energetic',
        value: 92,
        timestamp: new Date().toISOString(),
      },
    },
    {
      id: "3",
      name: "Taylor",
      avatar: "https://i.pravatar.cc/150?img=3",
      currentMood: {
        mood: 'calm',
        value: 78,
        timestamp: new Date().toISOString(),
      },
    },
    {
      id: "4",
      name: "Morgan",
      avatar: "https://i.pravatar.cc/150?img=4",
      currentMood: {
        mood: 'stressed',
        value: 62,
        timestamp: new Date().toISOString(),
      },
    },
    {
      id: "5",
      name: "Casey",
      avatar: "https://i.pravatar.cc/150?img=5",
      currentMood: {
        mood: 'inspired',
        value: 88,
        timestamp: new Date().toISOString(),
      },
    },
  ],
};

// Service to get data
export const getCityMoodData = (): CityMood => {
  return mockCityData;
};

export const submitUserMood = (mood: MoodType, value: number) => {
  console.log(`Mood submitted: ${mood} with value: ${value}`);
  // In a real app, this would send data to an API
  return true;
};
