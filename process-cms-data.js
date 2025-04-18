// process-cms-data.js
const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca semua file dalam folder dan menggabungkannya menjadi array
function combineJsonFiles(folderPath, outputPath) {
  try {
    // Periksa apakah folder ada
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder ${folderPath} tidak ada, melewati...`);
      // Buat file output kosong jika tidak ada
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
      return;
    }

    // Membaca direktori
    const files = fs.readdirSync(folderPath);
    
    // Filter hanya file JSON
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    
    if (jsonFiles.length === 0) {
      console.log(`Tidak ada file JSON di ${folderPath}, membuat file kosong...`);
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
      return;
    }
    
    // Membaca dan menggabungkan data dari semua file
    const combinedData = jsonFiles.map(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    });
    
    // Tulis data gabungan ke file output
    fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2));
    console.log(`Data berhasil digabungkan dan disimpan di ${outputPath}`);
  } catch (error) {
    console.error(`Terjadi kesalahan saat memproses ${folderPath}:`, error);
    // Buat file kosong jika terjadi error
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  }
}

// Fungsi untuk memastikan keberadaan file
function ensureFileExists(filePath, defaultContent = {}) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
      console.log(`File ${filePath} dibuat dengan konten default`);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat memeriksa file ${filePath}:`, error);
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
  }
}

// Pastikan folder _data ada
if (!fs.existsSync('_data')) {
  fs.mkdirSync('_data');
}

// Buat folder untuk koleksi jika belum ada
const folders = ['team', 'programs', 'articles', 'timeline', 'gallery'];
folders.forEach(folder => {
  const folderPath = `_data/${folder}`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
});

// Proses berbagai koleksi data
combineJsonFiles('_data/team', '_data/team.json');
combineJsonFiles('_data/programs', '_data/programs.json');
combineJsonFiles('_data/articles', '_data/articles.json');
combineJsonFiles('_data/timeline', '_data/timeline.json');
combineJsonFiles('_data/gallery', '_data/gallery.json');

// Pastikan file-file pengaturan ada
const settingsFiles = [
  { path: '_data/hero.json', default: {} },
  { path: '_data/about.json', default: {} },
  { path: '_data/programs-settings.json', default: {} },
  { path: '_data/team-settings.json', default: {} },
  { path: '_data/articles-settings.json', default: {} },
  { path: '_data/timeline-settings.json', default: {} },
  { path: '_data/gallery-settings.json', default: {} },
  { path: '_data/contact.json', default: {} },
  { path: '_data/location.json', default: {} },
  { path: '_data/footer.json', default: {} },
  { path: '_data/navigation.json', default: { menu: [] } },
  { path: '_data/settings.json', default: {} },
  { path: '_data/ui.json', default: {} }
];

settingsFiles.forEach(file => {
  ensureFileExists(file.path, file.default);
});

console.log('Semua data berhasil diproses!');
