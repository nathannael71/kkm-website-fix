const fs = require('fs');
const path = require('path');

// Fungsi untuk memastikan direktori ada
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Created directory: ${directory}`);
  }
}

// Fungsi untuk memastikan file JSON ada
function ensureJsonFileExists(filePath, defaultContent = {}) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath, 
      JSON.stringify(defaultContent, null, 2)
    );
    console.log(`Created file: ${filePath}`);
    return true;
  }
  return false;
}

// Fungsi untuk memastikan file JSON valid
function validateJsonFile(filePath, defaultContent = {}) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    return true;
  } catch (error) {
    console.error(`Invalid JSON in ${filePath}. Resetting to default.`);
    fs.writeFileSync(
      filePath, 
      JSON.stringify(defaultContent, null, 2)
    );
    return false;
  }
}

// Pastikan semua folder yang diperlukan ada
const dataDir = path.join(__dirname, '_data');
const sectionsToEnsure = [
  'team',
  'programs',
  'articles',
  'timeline',
  'gallery'
];

// Buat direktori data utama jika belum ada
ensureDirectoryExists(dataDir);

// Buat subdirektori untuk setiap bagian
sectionsToEnsure.forEach(section => {
  const sectionDir = path.join(dataDir, section);
  ensureDirectoryExists(sectionDir);
});

// Daftar file JSON yang harus ada
const requiredJsonFiles = [
  { name: 'settings.json', defaultContent: {} },
  { name: 'ui.json', defaultContent: {
    colors: {
      primary: "#0071e3",
      secondary: "#86868b",
      accent: "#F4A83A"
    }
  }},
  { name: 'hero.json', defaultContent: {
    title: "GROW YOUR SKILL WITH US",
    subtitle: "Empowering students through career development and creative outlets"
  }},
  { name: 'about.json', defaultContent: {} },
  { name: 'programs-settings.json', defaultContent: {} },
  { name: 'team-settings.json', defaultContent: {} },
  { name: 'articles-settings.json', defaultContent: {} },
  { name: 'timeline-settings.json', defaultContent: {} },
  { name: 'gallery-settings.json', defaultContent: {} },
  { name: 'contact.json', defaultContent: {} },
  { name: 'location.json', defaultContent: {} },
  { name: 'footer.json', defaultContent: {} },
  { name: 'navigation.json', defaultContent: {
    menu: [
      { label: "Home", url: "#home", icon: "fa-home" },
      { label: "About", url: "#about", icon: "fa-info-circle" },
      { label: "Programs", url: "#programs", icon: "fa-box" },
      { label: "Team", url: "#team", icon: "fa-users" },
      { label: "Gallery", url: "#gallery", icon: "fa-images" },
      { label: "Contact", url: "#contact", icon: "fa-envelope" }
    ]
  }}
];

// Daftar file koleksi yang harus dikonversi dari folder ke file array
const collectionJsonFiles = [
  { name: 'team.json', folder: 'team', defaultContent: [] },
  { name: 'programs.json', folder: 'programs', defaultContent: [] },
  { name: 'articles.json', folder: 'articles', defaultContent: [] },
  { name: 'timeline.json', folder: 'timeline', defaultContent: [] },
  { name: 'gallery.json', folder: 'gallery', defaultContent: [] }
];

// Membuat atau memastikan file JSON yang diperlukan ada
requiredJsonFiles.forEach(file => {
  const filePath = path.join(dataDir, file.name);
  const created = ensureJsonFileExists(filePath, file.defaultContent);
  if (!created) {
    validateJsonFile(filePath, file.defaultContent);
  }
});

// Mengumpulkan file dari folder koleksi ke file array tunggal
collectionJsonFiles.forEach(collection => {
  const outputFilePath = path.join(dataDir, collection.name);
  let allItems = [];
  
  // Periksa apakah folder koleksi ada
  const collectionDir = path.join(dataDir, collection.folder);
  if (fs.existsSync(collectionDir)) {
    // Baca semua file JSON dari folder koleksi
    const files = fs.readdirSync(collectionDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(collectionDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const item = JSON.parse(content);
          allItems.push(item);
        } catch (error) {
          console.error(`Error reading ${file}: ${error.message}`);
        }
      }
    });
  }
  
  // Tulis semua item ke file output
  fs.writeFileSync(outputFilePath, JSON.stringify(allItems, null, 2));
  console.log(`Processed ${collection.name} with ${allItems.length} items`);
});

console.log('All required data files are ready');
