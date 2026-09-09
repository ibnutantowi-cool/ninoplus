import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool: mysql.Pool | null = null;
let useJsonFallback = false;

const dataFilePath = path.join(process.cwd(), 'data.json');

// Ensure JSON file exists
function ensureJsonFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({
      news: [
        {
          id: "1",
          title: "Peresmian Pusat Kendali Bencana Nino Plus",
          content: "Nino Plus secara resmi diperkenalkan sebagai inovasi teknologi karya anak bangsa yang didukung penuh oleh CSR PIK2.",
          category: "Edukasi",
          status: "Publish",
          imageUrl: null,
          createdAt: new Date().toISOString()
        }
      ],
      settings: { youtubeId: "dQw4w9WgXcQ" }
    }, null, 2));
  }
}

function readJsonData() {
  ensureJsonFile();
  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJsonData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

async function getPool() {
  if (useJsonFallback) return null;
  
  if (!pool) {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
      });
      await connection.query('CREATE DATABASE IF NOT EXISTS ninoplus');
      await connection.end();

      pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ninoplus',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      await pool.query(`
        CREATE TABLE IF NOT EXISTS news (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(100),
          status VARCHAR(50) DEFAULT 'Publish',
          imageUrl VARCHAR(255),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS settings (
          id VARCHAR(50) PRIMARY KEY,
          youtubeId VARCHAR(100)
        )
      `);

      const [rows]: any = await pool.query('SELECT * FROM settings WHERE id = "1"');
      if (rows.length === 0) {
        await pool.query('INSERT INTO settings (id, youtubeId) VALUES ("1", "dQw4w9WgXcQ")');
      }
    } catch (error) {
      console.warn("MySQL Connection Failed. Falling back to JSON File.");
      useJsonFallback = true;
      return null;
    }
  }
  return pool;
}

export const db = {
  getNews: async () => {
    const p = await getPool();
    if (!p) {
      const data = readJsonData();
      return data.news;
    }
    const [rows] = await p.query('SELECT * FROM news ORDER BY createdAt DESC');
    return rows as any[];
  },
  getNewsById: async (id: string) => {
    const p = await getPool();
    if (!p) {
      const data = readJsonData();
      return data.news.find((n: any) => n.id === id) || null;
    }
    const [rows]: any = await p.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  },
  addNews: async (newsItem: any) => {
    const p = await getPool();
    const id = Math.random().toString(36).substr(2, 9);
    
    if (!p) {
      const data = readJsonData();
      data.news.push({
        id,
        ...newsItem,
        category: newsItem.category || 'Berita',
        status: newsItem.status || 'Publish',
        imageUrl: newsItem.imageUrl || null,
        createdAt: new Date().toISOString()
      });
      writeJsonData(data);
      return id;
    }

    await p.query(
      'INSERT INTO news (id, title, content, category, status, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [id, newsItem.title, newsItem.content, newsItem.category || 'Berita', newsItem.status || 'Publish', newsItem.imageUrl || null]
    );
    return id;
  },
  deleteNews: async (id: string) => {
    const p = await getPool();
    if (!p) {
      const data = readJsonData();
      data.news = data.news.filter((n: any) => n.id !== id);
      writeJsonData(data);
      return;
    }
    await p.query('DELETE FROM news WHERE id = ?', [id]);
  },
  getSettings: async () => {
    const p = await getPool();
    if (!p) {
      const data = readJsonData();
      return data.settings;
    }
    const [rows]: any = await p.query('SELECT * FROM settings WHERE id = "1"');
    return rows.length > 0 ? rows[0] : null;
  },
  updateSettings: async (settings: any) => {
    const p = await getPool();
    if (!p) {
      const data = readJsonData();
      data.settings.youtubeId = settings.youtubeId;
      writeJsonData(data);
      return;
    }
    await p.query('UPDATE settings SET youtubeId = ? WHERE id = "1"', [settings.youtubeId]);
  }
};
