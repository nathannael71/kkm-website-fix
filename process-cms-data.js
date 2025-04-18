const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Buat folder _data jika belum ada
const dataFolder = path.join(__dirname, '_data');
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

// Fungsi untuk memeriksa apakah file JSON valid
function isValidJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    return true;
  } catch (error) {
    console.error(`Error parsing JSON in ${filePath}:`, error.message);
    return false;
  }
}

// Fungsi untuk memastikan semua file JSON ada
function ensureAllDataFilesExist() {
  // Daftar file data yang harus ada
  const requiredFiles = [
    'settings.json',
    'ui.json',
    'hero.json',
    'about.json',
    'programs-settings.json',
    'team-settings.json',
    'articles-settings.json',
    'timeline-settings.json',
    'gallery-settings.json',
    'contact.json',
    'location.json',
    'footer.json',
    'navigation.json'
  ];

  // File koleksi yang mungkin berupa array
  const collectionFiles = [
    'team.json',
    'programs.json',
    'articles.json',
    'timeline.json',
    'gallery.json'
  ];

  // Buat file kosong jika belum ada
  [...requiredFiles, ...collectionFiles].forEach(filename => {
    const filePath = path.join(dataFolder, filename);
    if (!fs.existsSync(filePath)) {
      console.log(`Creating empty file: ${filename}`);
      // Untuk file koleksi, buat array kosong
      const isCollection = collectionFiles.includes(filename);
      const initialContent = isCollection ? '[]' : '{}';
      fs.writeFileSync(filePath, initialContent);
    } else if (!isValidJSON(filePath)) {
      // Jika file ada tapi JSON tidak valid, buat ulang
      console.log(`Fixing invalid JSON in: ${filename}`);
      const isCollection = collectionFiles.includes(filename);
      const initialContent = isCollection ? '[]' : '{}';
      fs.writeFileSync(filePath, initialContent);
    }
  });
}

// Fungsi untuk memproses semua file dari admin/collections ke _data
function processCollectionData() {
  // Pola untuk semua file JSON di bawah folder admin/collections
  const pattern = path.join(__dirname, 'admin', 'collections', '**', '*.json');
  
  // Gunakan glob untuk menemukan semua file
  glob.sync(pattern).forEach(filePath => {
    try {
      // Baca file
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Ambil nama koleksi dari path
      const pathParts = filePath.split(path.sep);
      const collectionName = pathParts[pathParts.length - 2]; // ambil nama folder parent
      const targetFile = path.join(dataFolder, `${collectionName}.json`);
      
      // Jika file target sudah ada, baca dan update
      let targetData = [];
      if (fs.existsSync(targetFile)) {
        try {
          const targetContent = fs.readFileSync(targetFile, 'utf8');
          targetData = JSON.parse(targetContent);
        } catch (error) {
          console.error(`Error reading target file ${targetFile}:`, error.message);
          // Jika error parsing, mulai dengan array kosong
          targetData = [];
        }
      }
      
      // Untuk koleksi, tambahkan atau update data
      const slugField = data.slug || data.id || data.name;
      if (slugField) {
        // Cari apakah item dengan slug yang sama sudah ada
        const existingIndex = targetData.findIndex(item => 
          (item.slug === slugField) || 
          (item.id === slugField) || 
          (item.name === slugField)
        );
        
        if (existingIndex >= 0) {
          // Update item yang ada
          targetData[existingIndex] = data;
        } else {
          // Tambahkan item baru
          targetData.push(data);
        }
      } else {
        // Jika tidak ada slug, tambahkan sebagai item baru
        targetData.push(data);
      }
      
      // Tulis kembali file
      fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2));
      console.log(`Updated collection data: ${collectionName}`);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
    }
  });
}

// Fungsi untuk memastikan semua data valid
function validateData() {
  // Pola untuk semua file JSON di _data
  const pattern = path.join(dataFolder, '*.json');
  
  // Validasi semua file
  glob.sync(pattern).forEach(filePath => {
    try {
      // Coba parse JSON
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`Validated: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`Invalid JSON in ${filePath}:`, error.message);
      // Tulis ulang dengan JSON kosong yang sesuai
      const isCollection = path.basename(filePath).match(/^(team|programs|articles|timeline|gallery)\.json$/);
      const initialContent = isCollection ? '[]' : '{}';
      fs.writeFileSync(filePath, initialContent);
      console.log(`Fixed: ${path.basename(filePath)}`);
    }
  });
}

// Jalankan semua fungsi
console.log('Starting CMS data processing...');
ensureAllDataFilesExist();
processCollectionData();
validateData();
console.log('CMS data processing completed.');
