namespace VSSystem.Service.TestService.Models
{
    public class AccountInfo
    {
        string _Username;
        public string Username { get { return _Username; } set { _Username = value; } }
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        string _SkypeId;
        public string SkypeId { get { return _SkypeId; } set { _SkypeId = value; } }
        string _Email;
        public string Email { get { return _Email; } set { _Email = value; } }
        string _Sha512Password;
        public string Sha512Password { get { return _Sha512Password; } set { _Sha512Password = value; } }
    }
}