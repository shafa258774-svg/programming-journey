const dataDariStorage = localStorage.getItem('dataCheckout');
const keranjangCheckout = JSON.parse(dataDariStorage);
let totalBayar = 0;
let diskon = 0;

function showToast(pesan, ikon = '✅') {
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

if (keranjangCheckout && keranjangCheckout.length > 0) {
    let htmlItem = '';

    keranjangCheckout.forEach(function (item) {
        let hargaAngka = parseInt(item.harga.replace(/[^0-9]/g, ''));
        totalBayar += hargaAngka;

        // html untuk setiap item di checkout
        htmlItem += `
            <div class="checkout-item">
                <img src="${item.gambar}" alt="${item.nama}">
                <div>
                    <h4>${item.nama}</h4>
                    <p>${item.harga}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('checkout-items').innerHTML = htmlItem;

    if (keranjangCheckout.length >= 2) {
        diskon = totalBayar * 0.1; 
        totalBayar = totalBayar - diskon; 
    }

    let teksTotal = 'Rp ' + totalBayar.toLocaleString('id-ID');
    if (diskon > 0) {
        teksTotal += '<br><span style="font-size:12px; color:#34d399; font-weight:normal;">(Sudah diskon 10% beli 2+ item! 🎉)</span>';
    }

    document.getElementById('checkout-total-harga').innerHTML = teksTotal;
}
else {
    document.getElementById('checkout-items').innerHTML = '<p style="color:#888;">Tidak ada barang di keranjang.</p>';
}

function prosesPembayaran() {
    const nama = document.getElementById('input-nama').value;
    const wa = document.getElementById('input-wa').value;
    const alamat = document.getElementById('input-alamat').value;
    const bayar = document.getElementById('input-bayar').value;

    if (nama === '' || wa === '' || alamat === '' || bayar === '') {
        showToast('Isi semua data pengiriman & pembayaran dulu ya!', '⚠️');
        return;
    }

    showToast('Pembayaran berhasil! Terima kasih sudah berbelanja 🎉', '✅');

    localStorage.removeItem('dataCheckout');
   
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}