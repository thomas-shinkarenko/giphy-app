import axios from "axios";
import prisma from "../prisma";

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search";

interface GiphyResponse {
  data: any[];
}

export async function searchGifs(
  search: string,
  limit: number = 10,
  offset: number = 0,
): Promise<any[]> {
  try {
    const response = await axios.get<GiphyResponse>(GIPHY_BASE_URL, {
      params: {
        api_key: GIPHY_API_KEY,
        q: search,
        limit: limit,
        offset: offset,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("[Service] Error fetching search results:", error);
    throw error;
  }
}

export async function findUser(username: string): Promise<any> {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.error("[Service] Error finding user:", error);
    throw error;
  }
}

export async function createUser(username: string): Promise<any> {
  try {
    let user = await findUser(username);

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: username,
          createdAt: new Date(),
        },
      });
    }

    return user;
  } catch (error) {
    console.error("[Service] Error creating user:", error);
    throw error;
  }
}

export async function findOrCreateUser(username: string): Promise<any> {
  try {
    let user = await findUser(username);

    if (!user) {
      user = await createUser(username);
    }

    return user;
  } catch (error) {
    console.error("[Service] Error finding or creating user:", error);
    throw error;
  }
}

export async function createSearchHistory(
  search: string,
  userId: string,
): Promise<any> {
  try {
    await prisma.searchHistory.create({
      data: {
        search: search,
        createdAt: new Date(),
        userId: userId,
      },
    });
  } catch (error) {
    console.error("[Service] Error creating search history entry:", error);
    throw error;
  }
}

export async function findSearchHistory(userId: string): Promise<any[]> {
  try {
    return await prisma.searchHistory.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error("[Service] Error finding search history:", error);
    throw error;
  }
}

export async function clearSearchHistory(userId: string): Promise<Boolean> {
  try {
    const deleted = await prisma.searchHistory.deleteMany({
      where: {
        userId: userId,
      },
    });
    return deleted.count > 0;
  } catch (error) {
    console.error("[Service] Error clearing search history:", error);
    throw error;
  }
}
