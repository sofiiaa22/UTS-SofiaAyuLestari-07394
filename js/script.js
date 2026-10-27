// Data Array Buku Lengkap dengan Deskripsi
const books = [
    { id: "85000", judul: "The Picture of Dorian Gray", kategori: "sastra", harga: "Rp 85.000", hargaAngka: 85000, penulis: "Oscar Wilde", deskripsi: "Kisah tentang seorang pemuda yang menukar jiwanya demi kelanggengan pemudaan, sementara lukisan dirinya menanggung segala dosa dan keburukannya." },
    { id: "95000", judul: "Pride and Prejudice", kategori: "sastra", harga: "Rp 95.000", hargaAngka: 95000, penulis: "Jane Austen", deskripsi: "Kisah klasik tentang percintaan, salah paham, dan benturan kelas sosial antara Elizabeth Bennet dan Mr. Darcy." },
    { id: "75000", judul: "Kumpulan Puisi Kuno", kategori: "puisi", harga: "Rp 75.000", hargaAngka: 75000, penulis: "Anonim", deskripsi: "Bunga rampai bait-bait sajak masa lampau yang merekam keindahan keheningan dan nostalgia." },
    { id: "80000", judul: "Leaves of Grass", kategori: "puisi", harga: "Rp 80.000", hargaAngka: 80000, penulis: "Walt Whitman", deskripsi: "Antologi puisi yang merayakan alam, kemanusiaan, dan kebebasan jiwa manusia." },
    { id: "120000", judul: "Meditations", kategori: "filsafat", harga: "Rp 120.000", hargaAngka: 120000, penulis: "Marcus Aurelius", deskripsi: "Catatan refleksi pribadi kaisar Stoik Roma tentang kebajikan, ketenangan pikiran, dan cara menghadapi penderitaan." },
    { id: "110000", judul: "Beyond Good and Evil", kategori: "filsafat", harga: "Rp 110.000", hargaAngka: 110000, penulis: "Friedrich Nietzsche", deskripsi: "Kritik tajam atas moralitas tradisional dan pencarian kebenaran di luar batasan standar masyarakat." }
];

let selectedBookPrice = 0;

// Render Buku ke HTML
function renderBooks(dataBuku) {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';

    dataBuku.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => openModal(book);
        card.innerHTML = `
            <h3>${book.judul}</h3>
            <p>Oleh: ${book.penulis}</p>
            <div class="price">${book.harga}</div>
            <div class="click-hint">🔍 Klik untuk detail</div>
        `;
        bookGrid.appendChild(card);
    });
}

// Filter Kategori
function filterBooks(kategori) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (kategori === 'semua') {
        renderBooks(books);
    } else {
        const filtered = books.filter(book => book.kategori === kategori);
        renderBooks(filtered);
    }
}

// Tampilkan semua buku saat pertama load
renderBooks(books);

// Fungsi Pop-up Modal
function openModal(book) {
    document.getElementById('modalTitle').innerText = book.judul;
    document.getElementById('modalAuthor').innerText = "Oleh: " + book.penulis;
    document.getElementById('modalDesc').innerText = book.deskripsi;
    document.getElementById('modalPrice').innerText = book.harga;
    selectedBookPrice = book.hargaAngka;
    
    document.getElementById('bookModal').classList.add('active');
}

function closeModal() {
    document.getElementById('bookModal').classList.remove('active');
}

function closeModalOutside(event) {
    if (event.target.id === 'bookModal') {
        closeModal();
    }
}

function selectBookForCalc() {
    const select = document.getElementById('bookSelect');
    select.value = selectedBookPrice;
    closeModal();
    
    // Scroll mulus ke bagian kalkulator
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
}

// Kalkulator Pembelian
function hitungTotal() {
    const harga = parseInt(document.getElementById('bookSelect').value);
    const jumlah = parseInt(document.getElementById('qtyInput').value);
    
    if (jumlah < 1 || isNaN(jumlah)) {
        alert("Masukkan jumlah buku yang valid!");
        return;
    }

    const total = harga * jumlah;
    const formatRupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);

    document.getElementById('totalResult').innerHTML = `Total: ${formatRupiah}`;
}

// Fitur Toggle Dark / Light Mode
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeBtn.innerHTML = "🦇 Mode Gelap";
    } else {
        themeBtn.innerHTML = "🌙 Mode Terang";
    }
});

// Fungsi Kirim Pesanan ke WhatsApp
function pesanWhatsApp() {
    const select = document.getElementById('bookSelect');
    const namaBuku = select.options[select.selectedIndex].text;
    const jumlah = document.getElementById('qtyInput').value;
    const totalTeks = document.getElementById('totalResult').innerText;

    if (totalTeks === "Total: Rp 0" || jumlah < 1) {
        alert("Hitung total pesanan kamu dulu ya!");
        return;
    }

    const pesan = `Halo Terra Book, aku mau pesan buku:\n\n📖 *Buku:* ${namaBuku}\n📚 *Jumlah:* ${jumlah} eksemplar\n💰 *${totalTeks}*\n\nMohon info rekening untuk pembayarannya. Terima kasih!`;
    
    // Nomor WhatsApp toko (bisa diganti nomor kamu)
    const nomorWA = "6281234567890";
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    
    window.open(urlWA, '_blank');
}