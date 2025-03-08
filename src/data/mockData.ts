
import { CityMood, MoodType, CitiesData } from "@/types/mood";
import { addDays, format, subDays } from "date-fns";

// Helper functions to generate mock data
const getRandomMood = (): MoodType => {
  const moods: MoodType[] = ['happy', 'energetic', 'calm', 'melancholy', 'stressed', 'inspired'];
  return moods[Math.floor(Math.random() * moods.length)];
};

const getRandomValue = (min = 30, max = 100): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomSentiment = (): 'positive' | 'negative' | 'neutral' | 'mixed' => {
  const sentiments = ['positive', 'negative', 'neutral', 'mixed'];
  return sentiments[Math.floor(Math.random() * sentiments.length)] as any;
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
  city: "San Francisco",
  state: "CA",
  overall: {
    sentiment: 'mixed',
    mood: 'happy',
    value: 78
  },
  pastFiveDays: [
    {
      day: "Thursday",
      shortDay: "THU",
      sentiment: 'positive',
    },
    {
      day: "Friday",
      shortDay: "FRI",
      sentiment: 'mixed',
    },
    {
      day: "Saturday",
      shortDay: "SAT",
      sentiment: 'neutral',
    },
    {
      day: "Sunday",
      shortDay: "SUN",
      sentiment: 'negative',
    },
    {
      day: "Monday",
      shortDay: "TODAY",
      sentiment: 'mixed',
    }
  ],
  topics: {
    thinking: [
      { id: "1", text: "Public transportation issues", popularity: 85 },
      { id: "2", text: "Rising housing costs", popularity: 92 },
      { id: "3", text: "New tech company layoffs", popularity: 78 }
    ],
    caring: [
      { id: "1", text: "Homelessness crisis", popularity: 95 },
      { id: "2", text: "Climate change impact", popularity: 88 },
      { id: "3", text: "Local small business support", popularity: 82 }
    ],
    burning: [
      { id: "1", text: "City council election", popularity: 90 },
      { id: "2", text: "New downtown development project", popularity: 85 },
      { id: "3", text: "Water conservation measures", popularity: 75 }
    ]
  },
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
      name: "Mission District",
      currentMood: {
        mood: 'inspired',
        value: 82,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'inspired'),
    },
    {
      id: "3",
      name: "Marina",
      currentMood: {
        mood: 'happy',
        value: 91,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'happy'),
    },
    {
      id: "4",
      name: "SoMa",
      currentMood: {
        mood: 'stressed',
        value: 65,
        timestamp: new Date().toISOString(),
      },
      pastMoods: generatePastMoods(5, 'stressed'),
    },
  ],
};

// Mock friends data based on locations
export const mockFriendsData = [
  {
    id: "1",
    name: "Adam Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "Jersey",
    currentMood: {
      mood: 'calm',
      value: 78,
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "2",
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/150?img=2",
    location: "Boston",
    currentMood: {
      mood: 'happy',
      value: 92,
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "3",
    name: "Kyra Langland",
    avatar: "https://i.pravatar.cc/150?img=3",
    location: "Phoenix",
    currentMood: {
      mood: 'energetic',
      value: 85,
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "4",
    name: "Seinna Santer",
    avatar: "https://i.pravatar.cc/150?img=4",
    location: "San Francisco",
    currentMood: {
      mood: 'inspired',
      value: 88,
      timestamp: new Date().toISOString(),
    },
  },
];

// Mock cities data
export const mockCitiesData: CitiesData = {
  cities: [
    { city: "San Francisco", state: "CA" },
    { city: "New York", state: "NY" },
    { city: "Los Angeles", state: "CA" },
    { city: "Chicago", state: "IL" },
    { city: "Boston", state: "MA" },
    { city: "Seattle", state: "WA" },
    { city: "Austin", state: "TX" },
    { city: "Miami", state: "FL" },
    { city: "Denver", state: "CO" },
    { city: "Portland", state: "OR" }
  ],
  currentCity: "San Francisco, CA"
};

// Service to get data
export const getCityMoodData = (): CityMood => {
  return mockCityData;
};

export const getAllCities = (): CitiesData => {
  return mockCitiesData;
};

export const submitUserMood = (mood: MoodType, value: number) => {
  console.log(`Mood submitted: ${mood} with value: ${value}`);
  // In a real app, this would send data to an API
  return true;
};
