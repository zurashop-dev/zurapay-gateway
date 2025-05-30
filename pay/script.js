// Loading animation + fade-in
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    const container = document.querySelector('.container');
    container.style.display = 'block';
    container.classList.add('fade-in');
  }, 1000);
});

// Tab switching with animation
const tabButtons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    contents.forEach((content) => {
      content.classList.remove('active', 'fade-in');
    });

    const target = btn.getAttribute('data-tab');
    const targetContent = document.getElementById(target);
    targetContent.classList.add('active', 'fade-in');

    // Set payment method dropdown
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
      if (target === 'qris') paymentMethodSelect.value = 'QRIS';
      else if (target === 'ewallet') paymentMethodSelect.value = 'E-WALLET';
      else if (target === 'bank') paymentMethodSelect.value = 'BANK TRANSFER';
    }
  });
});

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied!');
  }).catch(() => {
    alert('Failed to copy');
  });
}

// Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// QR modal zoom
const qrImg = document.getElementById('qrImg');
const qrModal = document.getElementById('qrModal');
const qrModalImg = qrModal?.querySelector('img');

if (qrImg && qrModal && qrModalImg) {
  qrImg.addEventListener('click', () => {
    qrModalImg.src = qrImg.src;
    qrModal.classList.add('active');
    qrModalImg.classList.add('zoom-in');
    setTimeout(() => {
      qrModalImg.classList.remove('zoom-in');
    }, 300);
  });

  qrModal.addEventListener('click', () => {
    qrModal.classList.remove('active');
  });
}

// Scroll reveal animation
const scrollElements = document.querySelectorAll('.scroll-reveal');

function scrollReveal() {
  const triggerBottom = window.innerHeight * 0.9;
  scrollElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', scrollReveal);
scrollReveal();

// FORM SUBMISSION
const form = document.getElementById('confirmPayment');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = form.querySelector('#itemName').value.trim();
    const amount = form.querySelector('#amount').value.trim();
    const paymentMethod = form.querySelector('#paymentMethod').value;
    const proofFile = form.querySelector('#paymentProof')?.files[0];

    if (!itemName || !amount || !paymentMethod) {
      alert('Mohon isi semua field yang diperlukan.');
      return;
    }

    let proofText = 'Tidak ada bukti transfer yang diupload.';
    if (proofFile) {
      proofText = Bukti transfer telah diupload: ${proofFile.name};
    }

    const waMessage = 
      *Konfirmasi Pembayaran*\n +
      Nama Barang: ${itemName}\n +
      Nominal: Rp ${amount}\n +
      Metode Pembayaran: ${paymentMethod}\n +
      ${proofText};

    const encodedMessage = encodeURIComponent(waMessage);
    const waNumber = '6289523523000';
    const waUrl = https://wa.me/${waNumber}?text=${encodedMessage};
    window.open(waUrl, '_blank');
  });
}
