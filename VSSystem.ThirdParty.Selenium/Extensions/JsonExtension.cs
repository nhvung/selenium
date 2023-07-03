using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace VSSystem.ThirdParty.Selenium.Extensions
{
    class JsonExtension
    {
        static Dictionary<string, object> DeserializeToDictionary(string json)
        {

            try
            {
                Dictionary<string, object> tempDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);
                Dictionary<string, object> result = new Dictionary<string, object>(StringComparer.InvariantCultureIgnoreCase);
                foreach (var kv in tempDictionary)
                {
                    if (kv.Value is JObject)
                    {
                        result[kv.Key] = DeserializeToDictionary(kv.Value?.ToString());
                    }
                    else
                    {
                        result[kv.Key] = kv.Value;
                    }
                }
                return result;
            }
            catch { }
            return new Dictionary<string, object>();
        }
        public static Dictionary<string, object> ConvertJson(string json)
        {
            try
            {
                if (string.IsNullOrEmpty(json))
                {
                    return new Dictionary<string, object>();
                }
                Dictionary<string, object> result = DeserializeToDictionary(json);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static object GetValue(Dictionary<string, object> input, string key)
        {
            try
            {
                string[] sKeys = key.Split(new char[] { '.', ' ' }, StringSplitOptions.RemoveEmptyEntries);
                object result = input;
                if (sKeys.Length == 0) return result;
                string sKey = sKeys.First();
                string newKey = key.Substring(sKey.Length);
                if (newKey.StartsWith(".")) newKey = newKey.Substring(1);
                if (input.ContainsKey(sKey))
                {
                    if (input[sKey] is Dictionary<string, object>)
                    {
                        result = GetValue(((Dictionary<string, object>)input[sKey]).ToDictionary(ite => ite.Key, ite => ite.Value, StringComparer.InvariantCultureIgnoreCase), newKey);
                    }
                    else result = input[sKey];
                }
                else
                {
                    result = null;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}