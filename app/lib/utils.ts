import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};

export function parseMarkdownToJson(markdownText: string): unknown | null {
  // First try to find JSON block
  const jsonRegex = /```json\n([\s\S]+?)\n```/;
  const jsonMatch = markdownText.match(jsonRegex);

  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error("Error parsing JSON block:", error);
    }
  }

  // If no JSON block found, try to parse markdown directly
  try {
    // Parse markdown into JSON format
    const lines = markdownText.split('\n');
    const trip: any = {};
    let currentDay = null;
    let currentDayLocation = '';
    let currentActivities = [];

    for (const line of lines) {
      // Match day headers
      const dayMatch = line.match(/^Day (\d+): (.+)$/);
      if (dayMatch) {
        if (currentDay !== null) {
          trip.itinerary.push({
            day: currentDay,
            location: currentDayLocation,
            activities: currentActivities
          });
        }
        currentDay = parseInt(dayMatch[1]);
        currentDayLocation = dayMatch[2];
        currentActivities = [];
        continue;
      }

      // Match activities
      const activityMatch = line.match(/^•\s*(.+)$/);
      if (activityMatch && currentDay !== null) {
        currentActivities.push({
          time: '', // Time not provided in markdown
          description: activityMatch[1].trim()
        });
        continue;
      }
    }

    // Add last day if exists
    if (currentDay !== null) {
      trip.itinerary.push({
        day: currentDay,
        location: currentDayLocation,
        activities: currentActivities
      });
    }

    // Add other trip details
    trip.name = lines.find(line => line.startsWith('Name:'))?.split(': ')[1] || '';
    trip.description = lines.find(line => line.startsWith('Description:'))?.split(': ')[1] || '';
    trip.estimatedPrice = lines.find(line => line.startsWith('Price:'))?.split(': ')[1] || '';
    trip.duration = parseInt(lines.find(line => line.startsWith('Duration:'))?.split(': ')[1] || '0');
    trip.budget = lines.find(line => line.startsWith('Budget:'))?.split(': ')[1] || '';
    trip.travelStyle = lines.find(line => line.startsWith('Style:'))?.split(': ')[1] || '';
    trip.country = lines.find(line => line.startsWith('Country:'))?.split(': ')[1] || '';
    trip.interests = lines.find(line => line.startsWith('Interests:'))?.split(': ')[1] || '';
    trip.groupType = lines.find(line => line.startsWith('Group:'))?.split(': ')[1] || '';

    return trip;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return null;
  }
}

export function parseTripData(jsonString: string): Trip | null {
  try {
    const data: Trip = JSON.parse(jsonString);

    return data;
  } catch (error) {
    console.error("Failed to parse trip data:", error);
    return null;
  }
}

export function getFirstWord(input: any): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim().split(/\s+/)[0] || '';
}

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

export const formatKey = (key: keyof TripFormData) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
