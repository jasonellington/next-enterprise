import { faker } from '@faker-js/faker';

export const ROW_HEADER_WIDTH = 200;

export interface Column {
  title: string;
  id: string;
  width : number;
}

export interface Row {
  id: string;
  title: string;
  height: number;
}

// Generates columns as before
export const getColumns = (): Column[] => {
  return Array.from({ length: 200 }, (_, index) => ({
    title: `Column ${index + 1}`,
    id: `column${index + 1}`,
    width: 400,
  }));
};

// Updated getRows to generate an id and a title for each row
export const getRows = (): Row[] => {
  return Array.from({ length: 200 }, (_, index) => ({
     title: `Row ${index + 1}`,
    id: `row${index + 1}`,
    height: 200,
  }));
};

let apiCallCounter = 0;
// Initialize a cache object
const apiCallCache: Record<string, string | number> = {};

export const mockApiCall = (rowId: string, columnId: string): Promise<string | number> => {
  const cacheKey = `${rowId}-${columnId}`;

  // Check if the result is in cache
  if (apiCallCache[cacheKey]) {
    console.log(`Cache hit for ${cacheKey}.`);
    return Promise.resolve(apiCallCache[cacheKey]);
  } else {
     console.log(`Fetching data for ${cacheKey}.`);
  }

  return new Promise((resolve) => {
    apiCallCounter++; // Increment the counter each time the function is called

    const delay = Math.random() * 5000; // Delay by up to 5 seconds
    setTimeout(() => {
      // Randomly decide the type of content based on a dice roll
      const diceRoll = faker.number.int({ min: 1, max: 3 });
      let content: string | number;
      switch (diceRoll) {
        case 1:
          content = faker.commerce.productName(); // String content
          break;
        case 2:
          content = faker.commerce.productDescription(); // String content
          break;
        case 3:
          content = faker.number.int(); // Number content
          break;
        default:
          content = ""; // Fallback empty string
      }

      // Store the result in cache before resolving
      apiCallCache[cacheKey] = content;
      resolve(content);
    }, delay);
  });
};