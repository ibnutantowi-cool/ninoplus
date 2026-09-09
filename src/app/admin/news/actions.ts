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
  const file = formData.get("image") as File;

  let imageUrl = "";

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await db.addNews({ title, content, category, status, imageUrl });
  
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
