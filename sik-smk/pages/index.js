import { useState } from 'react';
import { Trophy, Medal, Search, Plus, Award, User, BookOpen } from 'lucide-react';

export default function Home() {
  // Data Awal (Dummy Data)
  const [dataPrestasi, setDataPrestasi] = useState([
    { id: 1, nama: 'Budi Santoso', kelas: 'XII PPLG 1', judul: 'Juara 1 LKS Kab. Sleman - Web Tech', tingkat: 'Kabupaten', tahun: '2026', kategori: 'Akademik' },
    { id: 2, nama: 'Siti Rahma', kelas: 'XI AKL 2', judul: 'Juara 2 O2SN Pencak Silat', tingkat: 'Provinsi', tahun: '2025', kategori: 'Non-Akademik' },
    { id: 3, nama: 'Rian Hidayat', kelas: 'XII TKR 3', judul: 'Juara 3 Mobile Legends Student League', tingkat: 'Nasional', tahun: '2026', kategori: 'Non-Akademik' },
  ]);

  const [search, setSearch] = useState('');
  const [filterTingkat, setFilterTingkat] = useState('Semua');
  
  // State Form Tambah Data
  const [form, setForm] = useState({ nama: '', kelas: '', judul: '', tingkat: 'Kabupaten', tahun: '2026', kategori: 'Akademik' });
  const [showModal, setShowModal] = useState(false);

  // Filter Data
  const filteredData = dataPrestasi.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                        item.judul.toLowerCase().includes(search.toLowerCase());
    const matchTingkat = filterTingkat === 'Semua' || item.tingkat === filterTingkat;
    return matchSearch && matchTingkat;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.judul) return alert("Mohon isi semua bidang!");
    
    setDataPrestasi([{ id: Date.now(), ...form }, ...dataPrestasi]);
    setForm({ nama: '', kelas: '', judul: '', tingkat: 'Kabupaten', tahun: '2026', kategori: 'Akademik' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header / Navbar */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 d-flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <div>
              <h1 className="text-xl font-bold">SIP-SMK</h1>
              <p className="text-xs text-blue-200">Sistem Informasi Prestasi Siswa</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prestasi</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Award className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500">Total Prestasi</p>
              <h3 className="text-2xl font-bold">{dataPrestasi.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Trophy className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500">Tingkat Nasional</p>
              <h3 className="text-2xl font-bold">{dataPrestasi.filter(i => i.tingkat === 'Nasional').length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Medal className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500">Tingkat Provinsi/Kab.</p>
              <h3 className="text-2xl font-bold">{dataPrestasi.filter(i => i.tingkat !== 'Nasional').length}</h3>
            </div>
          </div>
        </div>

        {/* Control Bar: Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nama siswa atau kejuaraan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-sm text-slate-500 font-medium">Filter:</span>
            <select 
              value={filterTingkat}
              onChange={(e) => setFilterTingkat(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Tingkat</option>
              <option value="Kabupaten">Kabupaten</option>
              <option value="Provinsi">Provinsi</option>
              <option value="Nasional">Nasional</option>
            </select>
          </div>
        </div>

        {/* Tabel Data Prestasi */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <th className="p-4">Siswa</th>
                  <th className="p-4">Kelas</th>
                  <th className="p-4">Kejuaraan / Prestasi</th>
                  <th className="p-4">Tingkat</th>
                  <th className="p-4">Tahun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-medium text-slate-900 flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{item.nama}</span>
                      </td>
                      <td className="p-4 text-slate-600">{item.kelas}</td>
                      <td className="p-4 text-slate-800 font-medium">{item.judul}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.tingkat === 'Nasional' ? 'bg-red-100 text-red-700' :
                          item.tingkat === 'Provinsi' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.tingkat}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{item.tahun}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-400">Data prestasi tidak ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Input Form */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Input Data Prestasi Siswa</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Nama Siswa</label>
                <input type="text" required value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Ahmad Yani" />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Kelas / Jurusan</label>
                <input type="text" required value={form.kelas} onChange={e => setForm({...form, kelas: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: XI PPLG 2" />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Nama Kejuaraan / Prestasi</label>
                <input type="text" required value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Juara 1 Karate" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Tingkat</label>
                  <select value={form.tingkat} onChange={e => setForm({...form, tingkat: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Tahun</label>
                  <input type="text" value={form.tahun} onChange={e => setForm({...form, tahun: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-slate-100">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}