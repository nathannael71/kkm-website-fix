// process-cms-data.js
const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca semua file dalam folder dan menggabungkannya menjadi array
function combineJsonFiles(folderPath, outputPath) {
  try {
    // Membaca direktori
    const files = fs.readdirSync(folderPath);
    
    // Filter hanya file JSON
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    
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
    console.error('Terjadi kesalahan:', error);
  }
}

// Proses berbagai koleksi data
combineJsonFiles('_data/team', '_data/team.json');
combineJsonFiles('_data/programs', '_data/programs.json');
combineJsonFiles('_data/articles', '_data/articles.json');
combineJsonFiles('_data/timeline', '_data/timeline.json');
combineJsonFiles('_data/gallery', '_data/gallery.json');

console.log('Semua data berhasil diproses!');
