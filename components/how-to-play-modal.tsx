export function HowToPlayModalContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <h5 className="font-semibold text-base-content">Pilih Tema</h5>
              <p className="text-sm text-base-content/70">
                Pilih antara Keluarga, Sahabat, atau Pasangan sesuai dengan siapa kamu bermain
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <h5 className="font-semibold text-base-content">Masukkan Pemain</h5>
              <p className="text-sm text-base-content/70">
                Tambahkan 2-4 pemain dengan memasukkan nama masing-masing
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <h5 className="font-semibold text-base-content">Ambil Kartu</h5>
              <p className="text-sm text-base-content/70">
                Secara bergantian, ambil satu kartu dari tumpukan
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">4</span>
            </div>
            <div>
              <h5 className="font-semibold text-base-content">Baca & Jawab</h5>
              <p className="text-sm text-base-content/70">
                Baca pertanyaan dengan lantang dan minta semua pemain menjawab
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">5</span>
            </div>
            <div>
              <h5 className="font-semibold text-base-content">Lanjutkan</h5>
              <p className="text-sm text-base-content/70">
                Giliran berikutnya mengambil kartu baru hingga kartu habis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/20 pt-4">
        <h4 className="font-semibold text-base-content mb-2">Tips:</h4>
        <ul className="space-y-2 text-sm text-base-content/70">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Jawab dengan jujur tapi tetap nyaman
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Dengarkan dengan penuh perhatian
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Nikmati setiap momen!
          </li>
        </ul>
      </div>
    </div>
  );
}
