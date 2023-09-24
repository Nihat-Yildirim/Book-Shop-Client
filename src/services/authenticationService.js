import appAxios from "@/utils/appAxios";

const AuthenticationService = {
    async userRegister(registeredUser){
        var result = await appAxios.post("Authentications/UserRegister",null,{
            params:{
                FirstName : registeredUser.firstName,
                LastName : registeredUser.lastName,
                Email : registeredUser.email,
                Password : registeredUser.password    
            }
        });
        return result.data;
    },

    async addOtpAuthentication(addedOtpAuthenticaiton){
        var result = await appAxios.post("Authentications/AddOtpAuthentication",addedOtpAuthenticaiton);
        return result.data;
    },

    async addMailAuthenticaiton(addedMailAuthenticaton){
        var result = await appAxios.post("Authentications/AddMailAuthenticaiton",addedMailAuthenticaton);
        return result.data;
    },

    async verifyMailComfirmCode(verifiedCode){
        var result = await appAxios.put(`Authentications/VerifyMailComfirmCode?Email=${verifiedCode.mail}&Code=${verifiedCode.code}`);
        return result.data;
    },

    async newMailComfirmCode(mail){
        var result = await appAxios.put(`Authentications/NewMailComfirmCode?Mail=${mail}`)
        return result.data;
    },

    async saveOtpAuthentication(savedOtpAuthentication){
        var result = await appAxios.put(`Authentications/SaveOtpAuthentication?Email=${savedOtpAuthentication.mail}&RecoveryCode=${savedOtpAuthentication.recoveryCode}}`);
        return result.data;
    },

    async verifySaveOtpAuthenticationCode(verifiedSaveOtpAuthenticationCode){
        var result = await appAxios.put(`Authentications/VerifySaveOtpAuthenticationCode?Email=${verifiedSaveOtpAuthenticationCode.mail}&Code=${verifiedSaveOtpAuthenticationCode.code}`);
        return result.data;
    },

    async activateOtpAuthentication(activatedOtpAuthentication){
        var result = await appAxios.put(`Authentications/ActivateOtpAuthentication?Email=${activatedOtpAuthentication.mail}&ActivationCode=${activatedOtpAuthentication.code}`);
        return result.data;
    },

    async disableOtpAuthentication(disapletedOtpAuthentication){
        var result = await appAxios.delete(`Authentications/DisableOtpAuthentication?Email=${disapletedOtpAuthentication.mail}&ActivationCode=${disapletedOtpAuthentication.code}`);
        return result.data;
    },
    
    async activateMailAuthentication(activatedMailAuthenticaiton){
        var result = await appAxios.put(`Authentications/ActivateMailAuthentication?Email=${activatedMailAuthenticaiton.mail}&ActivationCode=${activatedMailAuthenticaiton.code}`);
        return result.data;
    },

    async sendDisableMailAuthenticationCode(userId){
        var result = await appAxios.post(`Authentications/SendDisableMailAuthenticationCode?UserId=${userId}`);
        return result.data;
    },

    async disableMailAuthentication(disabletedMailAuthenticaiton){
        var result  = await appAxios.delete(`Authentications/DisableMailAuthentication?Email=${disabletedMailAuthenticaiton.mail}&ActivationCode=${disabletedMailAuthenticaiton.code}`);
        return result.data;
    },

    async updateUserClaim(updatedUserClaim){
        var result = await appAxios.put(`Authentications/UpdateUserClaim?UserId=${updatedUserClaim.userId}&Claim=${updatedUserClaim.userId}`);
        return result.data;
    },

    async login(loginParameter){
        var result = await appAxios.get(`Authentications/Login?Email=${loginParameter.mail}&Password=${loginParameter.password}`);
        return result.data;
    },

    async refreshTokenLogin(refreshTokenParameter){
        var result = await appAxios.get(`Authentications/RefreshTokenLogin?UserId=${refreshTokenParameter.userId}&RefreshToken=${refreshTokenParameter.token}`);
        return result.data;
    },

    async otpAuthenticationLogin(otpAuthenticationLoginParameter){
        var result = await appAxios.get(`Authentications/OtpAuthenticationLogin?Email=${otpAuthenticationLoginParameter.mail}&Code=${otpAuthenticationLoginParameter.code}`);
        return result.data;
    },

    async mailAuthenticationLogin(mailAuthenticationLoginParameter){
        var result = await appAxios.get(`Authentications/MailAuthenticationLogin?Email=${mailAuthenticationLoginParameter.mail}&Code=${mailAuthenticationLoginParameter.code}`);
        return result.data;
    }
};

export default AuthenticationService;