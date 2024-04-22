// Melakukan iterasi dari 1 hingga 50
for (let i = 1; i <= 50; i++) {
  // Memeriksa apakah bilangan habis dibagi 3 dan 5
  if (i % 3 === 0 && i % 5 === 0) {
    // Jika ya, cetak "FooBar"
    console.log('FooBar');
  }
  // Memeriksa apakah bilangan habis dibagi 3
  else if (i % 3 === 0) {
    // Jika ya, cetak "Foo"
    console.log('Foo');
  }
  // Memeriksa apakah bilangan habis dibagi 5
  else if (i % 5 === 0) {
    // Jika ya, cetak "Bar"
    console.log('Bar');
  }
}
