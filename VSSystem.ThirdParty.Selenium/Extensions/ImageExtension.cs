using System;
using System.Drawing.Imaging;
using System.IO;

namespace VSSystem.ThirdParty.Selenium.Extensions
{
    class ImageExtension
    {
        public static byte[] ConvertImage(byte[] input, string imageFormat)
        {
            byte[] result = input;
            try
            {
                using (var srcStream = new MemoryStream(input))
                {
                    using (var outStream = new MemoryStream())
                    {
                        using (var img = System.Drawing.Image.FromStream(srcStream))
                        {
                            if (imageFormat.Equals("Jpeg", StringComparison.InvariantCultureIgnoreCase)
                                || imageFormat.Equals("Jpg", StringComparison.InvariantCultureIgnoreCase))
                            {
                                img.Save(outStream, ImageFormat.Jpeg);
                            }
                            else if (imageFormat.Equals("Png", StringComparison.InvariantCultureIgnoreCase))
                            {
                                img.Save(outStream, ImageFormat.Png);
                            }
                            else if (imageFormat.Equals("Bmp", StringComparison.InvariantCultureIgnoreCase))
                            {
                                img.Save(outStream, ImageFormat.Bmp);
                            }

                            img.Dispose();
                        }
                        outStream.Close();
                        outStream.Dispose();
                        result = outStream.ToArray();
                    }
                    srcStream.Close();
                    srcStream.Dispose();
                }
            }
            catch //(Exception ex)
            {

            }
            return result;
        }
    }
}
