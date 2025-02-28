using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BUOI3
{
    public class exception
    {
        static void Main(string[] args)
        {
            try
            {
                f2();
            }
            catch (DivideByZeroException dex){
                Console.WriteLine("mau so khong the bang 0 \n"+ dex.StackTrace);
            }
            catch(Exception ex){
                Console.WriteLine("general exception  " + ex.Message);
            }
            Console.ReadLine();
        }
    }
    static void f2()
    {
        f1();
    }
    static void f1()
    {
        int a=5;
        int b=0;
        Console.WriteLine(a / b);
    }
}