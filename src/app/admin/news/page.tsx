"use client";

import { useState, useEffect, useRef } from "react";
import { PlusCircle, Save, Trash2, Video, ImageIcon, Edit } from "lucide-react";
import { addNewsAction, deleteNewsAction, updateYoutubeIdAction, getAdminData, editNewsAction } from "./actions";

export default function AdminNewsCMS() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Berita",
    content: "",
    status: "Publish",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  
  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Username atau Password salah!");
    }
  };

  async function loadData() {
    setIsLoading(true);
    const data = await getAdminData();
    setNewsList(data.news.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setYoutubeLink(`https://www.youtube.com/watch?v=${data.settings?.youtubeId || ""}`);
    setIsLoading(false);
  }

  const handleSaveNews = async () => {
    if (!formData.title || !formData.content) return alert("Judul dan konten wajib diisi!");
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append("status", formData.status);
    data.append("imageUrl", formData.imageUrl);

    // Call server action
    if (editingId) {
      await editNewsAction(editingId, data);
    } else {
      await addNewsAction(data);
    }
    
    // Reset
    setFormData({ title: "", category: "Berita", content: "", status: "Publish", imageUrl: "" });
    setEditingId(null);
    loadData();
    alert(editingId ? "Berita berhasil diperbarui!" : "Berita berhasil disimpan!");
  };

  const handleEditNews = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category || "Berita",
      status: item.status || "Publish",
      imageUrl: item.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Berita", content: "", status: "Publish", imageUrl: "" });
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await deleteNewsAction(id);
      loadData();
    }
  };

  const handleSaveYoutube = async () => {
    const match = youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    const videoId = match ? match[1] : youtubeLink;
    
    if (videoId) {
      await updateYoutubeIdAction(videoId);
      alert("Video YouTube berhasil diupdate!");
      loadData();
    } else {
      alert("Link YouTube tidak valid!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B192C] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-[#0B192C]">Admin Login</h1>
            <p className="text-sm text-slate-500 mt-2">Masuk untuk mengelola berita & program</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
              <input 
                type="text" 
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                placeholder="admin"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-bold transition-colors shadow-md mt-4">
              Masuk ke Dashboard Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-[#0B192C] font-bold">Memuat Data Admin...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0B192C]">Pusat Admin Berita & Program</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Form Input */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden p-6">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2 border-b pb-4 text-[#0B192C]">
              {editingId ? (
                <><Edit className="w-6 h-6 text-cyan-600"/> Edit Berita</>
              ) : (
                <><PlusCircle className="w-6 h-6 text-cyan-600"/> Tambah Berita Baru</>
              )}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Berita</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                  placeholder="Masukkan judul berita..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Foto Berita (Link/URL)</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
                  placeholder="https://contoh.com/gambar.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-1">Karena menggunakan Vercel, silakan *upload* foto Anda ke Google Drive / Imgur / Postimages, lalu *copy-paste* link-nya ke sini.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Konten Berita</label>
                <textarea 
                  rows={8} 
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-sm leading-relaxed"
                  placeholder="Tulis detail lengkap berita di sini..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                {editingId && (
                  <button onClick={handleCancelEdit} className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-bold flex items-center transition-colors shadow-sm">
                    Batal
                  </button>
                )}
                <button onClick={handleSaveNews} className="px-6 py-2.5 bg-[#0B192C] text-white rounded-lg hover:bg-[#0F172A] text-sm font-bold flex items-center gap-2 transition-colors shadow-md">
                  <Save className="w-4 h-4" /> {editingId ? "Perbarui Berita" : "Publikasikan Berita"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden p-6">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2 border-b pb-4 text-[#0B192C]">
              <Video className="w-6 h-6 text-red-600"/> Pengaturan Video YouTube
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Link YouTube (Muncul di Tengah)</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button onClick={handleSaveYoutube} className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-bold flex items-center gap-2 transition-colors shadow-md">
                  <Save className="w-4 h-4" /> Update Video Utama
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: List of News */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden p-6 h-full flex flex-col">
            <h2 className="font-bold text-xl mb-6 border-b pb-4 text-[#0B192C]">Daftar Berita Aktif</h2>
            <div className="space-y-4 flex-grow overflow-y-auto pr-2">
              {newsList.length > 0 ? newsList.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4 relative group hover:shadow-md transition-shadow bg-slate-50 hover:bg-white">
                  {item.imageUrl && (
                    <div className="w-full h-24 mb-3 rounded border border-slate-200 overflow-hidden bg-slate-200">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-[#0B192C] leading-snug pr-16">{item.title}</h3>
                  <div suppressHydrationWarning className="text-xs text-slate-500 mt-2 font-medium">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => handleEditNews(item)}
                      className="text-cyan-600 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 p-1.5 rounded-full transition-colors"
                      title="Edit Berita"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                      title="Hapus Berita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-slate-500 text-center py-12 flex flex-col items-center">
                  <ImageIcon className="w-12 h-12 text-slate-200 mb-3" />
                  Belum ada berita.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
