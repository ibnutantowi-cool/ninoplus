"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function addNewsAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await db.addNews({ title, content, category, status, imageUrl });
  
  revalidatePath('/tentang');
  revalidatePath('/admin/news');
}

export async function editNewsAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await db.updateNews(id, { title, content, imageUrl });
  
  revalidatePath('/tentang');
  revalidatePath('/admin/news');
}

export async function deleteNewsAction(id: string) {
  await db.deleteNews(id);
  revalidatePath('/tentang');
  revalidatePath('/admin/news');
}

export async function updateYoutubeIdAction(youtubeId: string) {
  await db.updateSettings({ youtubeId });
  revalidatePath('/tentang');
  revalidatePath('/admin/news');
}

export async function getAdminData() {
  const news = await db.getNews();
  const settings = await db.getSettings();
  return { news, settings };
}
