namespace BSSystem.Service.BSTestService.Request
{
    public class GetTokenRequest
    {
        string _Username;
        public string Username { get { return _Username; } set { _Username = value; } }
        string _ClearPassword;
        public string ClearPassword { get { return _ClearPassword; } set { _ClearPassword = value; } }
        string _Sha512Password;
        public string Sha512Password { get { return _Sha512Password; } set { _Sha512Password = value; } }
    }
}