"use server";

import supabase from "./supabse";
import slugify from "slugify";
import { FormStateType } from "./types";
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

export async function getShortUrl(slug: string) {
  try {
    const { data, error } = await supabase
      .from("shortUrl")
      .select("*")
      .eq("slug", slug);

    if (error) throw new Error();
    return { data, error };
  } catch (error) {
    throw new Error("ShortenedURL could not found.");
  }
}

export async function shortenUrl(initialState: FormStateType, form: FormData) {
  const longUrl = form.get("longUrl") as string;
  const shortUrl = form.get("shortUrl") as string;

  const slugified = slugify(shortUrl);

  const { data: existedShortUrl } = await getShortUrl(slugified);
  let state: {
    existedError?: string;
    urlError?: string;
    createError?: string;
  } = {};
  if (!longUrl?.trim().length || !urlRegex.test(longUrl)) {
    state.urlError = "Invalid URL. Please provide a correct URL.";
  }

  if (existedShortUrl?.length > 0) {
    state.existedError = `Could not create shoten url with ${shortUrl}`;
  }

  if (Object.keys(state).length > 0) {
    return state;
  }

  const { data, error } = await supabase
    .from("shortUrl")
    .insert([{ url: longUrl, slug: slugified }])
    .select();

  if (error) {
    state.createError = "Shorten url could not created!";
  }
  if (Object.keys(state).length > 0) {
    return state;
  }

  return data as { url: string; slug: string }[];
}
