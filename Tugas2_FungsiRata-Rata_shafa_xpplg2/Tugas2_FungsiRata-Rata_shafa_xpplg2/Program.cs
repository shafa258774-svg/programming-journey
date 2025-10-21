namespace Tugas2_FungsiRata_Rata_shafa_xpplg2
{
    internal class Program
    {
        // Fungsi RataRata yang menerima tiga bilangan double dan mengembalikan rata-ratanya
        static double RataRata(double a, double b, double c)
        {
            return (a + b + c) / 3.0;
        }
        static void Main(string[] args)
        {
            // Contoh pemanggilan fungsi dengan nilai 5, 7, dan 9
            double hasil = RataRata(5, 7, 9);
            Console.WriteLine($"Rata-rata dari 5, 7, dan 9 adalah: {hasil}");
        }
    }
}
