using System;
using System.Collections.Generic;

namespace VSSystem.ThirdParty.Selenium.Models
{
    public class Resolution
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        int _Width;
        public int Width { get { return _Width; } set { _Width = value; } }
        int _Height;
        public int Height { get { return _Height; } set { _Height = value; } }
        public Resolution(int width, int height, string name = "")
        {
            _Width = width;
            _Height = height;
            _Name = name;
        }

        static Resolution _XGA = new Resolution(1024, 768, "xga");
        static Resolution _HD = new Resolution(1366, 768, "hd");
        static Resolution _HDPlus = new Resolution(1440, 768, "hd+");
        static Resolution _FullHD = new Resolution(1920, 1080, "fullhd");
        static Resolution _FullHDPlus = new Resolution(2160, 1080, "fullhd+");
        static Resolution _QHD = new Resolution(2560, 1440, "qhd");
        static Resolution _QHDPlus = new Resolution(2960, 1440, "qhd+");
        static Resolution _UHD = new Resolution(3840, 2160, "uhd");

        public static Resolution Default { get { return _FullHD; } }

        static Dictionary<string, Resolution> _mapping;
        public static bool TryParse(string s, out Resolution result)
        {
            result = null;
            try
            {
                if (string.IsNullOrWhiteSpace(s))
                {
                    return false;
                }
                if (_mapping == null)
                {
                    _mapping = new Dictionary<string, Resolution>(StringComparer.InvariantCultureIgnoreCase)
                        {
                            {"xga", _XGA},

                            {"hd", _HD},
                            {"hd+", _HDPlus},

                            {"fullhd", _FullHD},
                            {"fullhd+", _FullHDPlus},

                            {"2k", _QHD},
                            {"qhd", _QHD},

                            {"2k+", _QHDPlus},
                            {"qhd+", _QHDPlus},

                            {"4k", _UHD},
                            {"uhd", _UHD},
                        };
                }
                if (_mapping.ContainsKey(s))
                {
                    result = _mapping[s];
                }
                else
                {
                    var temp = s.Split(new char[] { ',', 'x', 'X' }, StringSplitOptions.RemoveEmptyEntries);
                    if (temp.Length == 2)
                    {
                        int w, h;
                        int.TryParse(temp[0], out w);
                        int.TryParse(temp[1], out h);
                        if (w > 0 && h > 0)
                        {
                            result = new Resolution(w, h);
                        }
                    }
                }
            }
            catch { }
            return false;
        }

        public override string ToString()
        {
            return $"{_Width}, {_Height}{(string.IsNullOrWhiteSpace(_Name) ? "" : $", {_Name}")}";
        }
        public System.Drawing.Size ToSize()
        {
            return new System.Drawing.Size(_Width, _Height);
        }
    }
}