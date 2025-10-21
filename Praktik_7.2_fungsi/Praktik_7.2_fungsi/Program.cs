namespace Praktik_7._2_fungsi
{
    internal class Program
    {
        static void SapaNama(string nama)
        {
            Console.WriteLine("Halo, " + nama + "!");
            Console.WriteLine("semangat belajar C# hari ini!");
        }
        static void Main(string[] args)
        {
            Console.Write("Masukkan nama Anda: ");
            string namaSiswa = Console.ReadLine();
            SapaNama(namaSiswa); // Memanggil fungsi dengan argumen
        }
    }
}
