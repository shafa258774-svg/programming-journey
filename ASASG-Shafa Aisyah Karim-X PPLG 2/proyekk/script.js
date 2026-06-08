let keranjang = JSON.parse(localStorage.getItem('dataKeranjang')) || [];

function simpanKeranjang() {
    localStorage.setItem('dataKeranjang', JSON.stringify(keranjang));
}

let produkAktif = { nama: '', harga: '', gambar: '' };

function showToast(pesan, ikon = '🛒') {
    const container = document.getElementById('toast-container');
    if (!container) return; 

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-ikon">${ikon}</span> <span>${pesan}</span>`;
   
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

const kotakCari = document.getElementById('cari');
const semuaKartu = document.querySelectorAll('.kartu');

if (kotakCari) {
    kotakCari.addEventListener('input', function () {
        const teksCari = kotakCari.value.toLowerCase();
        semuaKartu.forEach(function (kartu) {
            const namaProduk = kartu.querySelector('h3').innerText.toLowerCase();
            if (namaProduk.includes(teksCari)) { kartu.style.display = ''; }
            else { kartu.style.display = 'none'; }
        });
    });
}

function bukaDetail(nama, harga, gambar) {
    document.getElementById('modal-nama').innerText = nama;
    document.getElementById('modal-harga').innerText = harga;
    document.getElementById('modal-gambar').src = gambar;
   
    produkAktif = { nama: nama, harga: harga, gambar: gambar };
    document.getElementById('modal').classList.add('aktif');
}

function tutupModal() {
    document.getElementById('modal').classList.remove('aktif');
}

function tutupModalLuar(event) {
    if (event.target.id === 'modal') {
        tutupModal();
    }
}

function tambahKeKeranjang() {
    const itemBaru = {
        nama: produkAktif.nama,
        harga: produkAktif.harga,
        gambar: produkAktif.gambar,
        dipilih: true
    };

    keranjang.push(itemBaru);
    simpanKeranjang();
    renderKeranjang();
    showToast(itemBaru.nama + ' ditambahkan ke keranjang!', '🛒');
    tutupModal();
}

function renderKeranjang() {
    document.getElementById('cart-count').innerText = keranjang.length;

    let htmlItems = '';
    let totalHarga = 0;
    let jumlahDipilih = 0;
    let diskon = 0;

    keranjang.forEach(function(item, index) {
        if (item.dipilih) {
            let hargaAngka = parseInt(item.harga.replace(/[^0-9]/g, ''));
            totalHarga += hargaAngka;
            jumlahDipilih++;
        }

        htmlItems += `
            <div class="cart-item">
                <input type="checkbox" class="cart-checkbox"
                    ${item.dipilih ? 'checked' : ''}
                    onchange="toggleDipilih(${index})">
                <img src="${item.gambar}" alt="${item.nama}">
                <div class="cart-item-info">
                    <h4>${item.nama}</h4>
                    <p>${item.harga}</p>
                    <button class="tombol-hapus" onclick="hapusDariKeranjang(${index})">Hapus</button>
                </div>
            </div>
        `;
    });

    document.getElementById('cart-items').innerHTML = htmlItems;
   
    if (keranjang.length === 0) {
        document.getElementById('cart-items').innerHTML = '<p style="color:#555; text-align:center; margin-top:40px;">Keranjang masih kosong 😢</p>';
    }

    if (jumlahDipilih >= 2) {
        diskon = totalHarga * 0.1;
        totalHarga = totalHarga - diskon;
    }

    let teksTotal = 'Rp ' + totalHarga.toLocaleString('id-ID');
    if (diskon > 0) {
        teksTotal += '<br><span style="font-size:12px; color:#34d399; font-weight:normal;">(Sudah diskon 10% beli 2+ item! 🎉)</span>';
    }
    document.getElementById('cart-total').innerHTML = teksTotal;
}

function toggleDipilih(index) {
    keranjang[index].dipilih = !keranjang[index].dipilih;
    simpanKeranjang();
    renderKeranjang();
}

function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    simpanKeranjang();
    renderKeranjang();
}

function bukaKeranjang() {
    document.getElementById('cart-sidebar').classList.add('aktif');
}

function tutupKeranjang() {
    document.getElementById('cart-sidebar').classList.remove('aktif');
}

function tutupKeranjangLuar(event) {
    if (event.target.id === 'cart-sidebar') {
        tutupKeranjang();
    }
}

function goToCheckout() {
    const barangDipilih = keranjang.filter(function(item) {
        return item.dipilih === true;
    });

    if (barangDipilih.length === 0) {
        showToast('Pilih dulu barang yang mau di-checkout!', '⚠️');
        return;
    }

    localStorage.setItem('dataCheckout', JSON.stringify(barangDipilih));

    const sisaBarang = keranjang.filter(function(item) { return item.dipilih === false; });
    localStorage.setItem('dataKeranjang', JSON.stringify(sisaBarang));

    window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cart-count')) {
        renderKeranjang();
    }
});