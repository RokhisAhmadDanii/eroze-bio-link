// Mendapatkan elemen audio dan canvas
const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Mengatur ukuran canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mendapatkan konteks audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audio);

// Membuat analyser node
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Menghubungkan audio dengan analyser
source.connect(analyser);
source.connect(audioContext.destination);

// Fungsi untuk membuat visualisasi audio
function draw() {
  // Mendapatkan data frekuensi audio
  analyser.getByteFrequencyData(dataArray);

  // Membersihkan canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Menggambar spectrum RGB
  const barWidth = canvas.width / bufferLength;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }

  // Mengulangi fungsi draw
  requestAnimationFrame(draw);
}

// Memulai visualisasi audio saat audio dimainkan
audio.addEventListener('play', () => {
  draw();
});
