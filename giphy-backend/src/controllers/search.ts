import { Request, Response } from "express";
import { RequestHistory, RequestSearch } from "../interfaces/search";
import * as searchService from "../services/search";
require("dotenv").config();

export async function getSearch(
  req: Request<any, any, any, RequestSearch>,
  res: Response,
) {
  const { username, search, limit, offset } = req.query;

  if (!username || !search) {
    return res.status(400).json({
      error: "[Controller] Missing required parameters (username or search)",
    });
  }

  try {
    const gifs = await searchService.searchGifs(search, limit, offset);

    const foundUser = await searchService.findOrCreateUser(username);

    await searchService.createSearchHistory(search, foundUser.id);

    return res.json(gifs);
  } catch (error) {
    console.error("[Controller] Error fetching search results:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSearchHistory(
  req: Request<any, any, any, RequestHistory>,
  res: Response,
) {
  try {
    const { username } = req.query;

    const foundUser = await searchService.findOrCreateUser(username);

    const searchHistory = await searchService.findSearchHistory(foundUser.id);

    return res.json(searchHistory);
  } catch (error) {
    console.error("[Controller] Error getting search history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function clearSearchHistory(req: Request, res: Response) {
  try {
    const { username } = req.params;
    console.log("username", username);
    const foundUser = await searchService.findUser(username);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("foundUser", foundUser);
    const deleted = await searchService.clearSearchHistory(foundUser.id);

    if (deleted) {
      return res.json({ message: "Search history cleared successfully" });
    }

    return res
      .status(404)
      .json({ error: "Search history could not be cleared" });
  } catch (error) {
    console.error("[Controller] Error clearing search history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
