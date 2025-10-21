namespace Praktik6._4_shafa_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 1. Inisialisasi variabel penghitung (counter)
            int hitungan = 5;

            Console.WriteLine("Memulai hitungan mnundur: ");
            // 2. Perulangan 'while'
            // kondisi: selama nilai 'hitungan' lebih besar dari 0
            while (hitungan > 0)
            {
                // Blok kode di dalam perulangan
                Console.WriteLine($"Hitungan: {hitungan}");

                // 3. Update variabel penghitung (decrement/pengurangan)
                // Ini PENTING agar perulangan tidak menjadi loop tak terbaats (infinite loop)
                hitungan = hitungan - 1;
                // Atau bisa juga ditulis hitungan--;
            }
            // Kode setelah perulangan selesai
            Console.WriteLine("Selesai!! Hitungan mundur telah berakhir.");
        }
    }
}
