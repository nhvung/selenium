using System;
using System.IO;

namespace VSSystem.ThirdParty.Selenium.Extensions
{
    class ImageExtension
    {
        public static byte[] ConvertImage(byte[] input, string imageFormat, int quality = 100)
        {
            byte[] result = input;
            try
            {
                using (var outStream = new MemoryStream())
                {
                    using (var img = SkiaSharp.SKBitmap.Decode(input))
                    {
                        if (imageFormat.Equals("jpeg", StringComparison.InvariantCultureIgnoreCase))
                        {
                            img.Encode(outStream, SkiaSharp.SKEncodedImageFormat.Jpeg, quality);
                        }
                        else if (imageFormat.Equals("png", StringComparison.InvariantCultureIgnoreCase))
                        {
                            img.Encode(outStream, SkiaSharp.SKEncodedImageFormat.Png, quality);
                        }
                        else if (imageFormat.Equals("bmp", StringComparison.InvariantCultureIgnoreCase))
                        {
                            img.Encode(outStream, SkiaSharp.SKEncodedImageFormat.Bmp, quality);
                        }
                        else if (imageFormat.Equals("gif", StringComparison.InvariantCultureIgnoreCase))
                        {
                            img.Encode(outStream, SkiaSharp.SKEncodedImageFormat.Gif, quality);
                        }
                        img.Dispose();
                    }
                    outStream.Close();
                    outStream.Dispose();
                    result = outStream.ToArray();
                }
                input = null;
            }
            catch //(System.Exception ex)
            {

            }
            return result;
        }
    }
}
