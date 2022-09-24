declare namespace auth {
    interface UserLoginDto {
        username: string,
        password: string
    }

    interface CoreUser {
        id: string,
        username: string,
        nickname: string,
        email?: string,
        phoneNumber?: string,
        avatarUrl?: null,
        roles?: Array,
        permissions?: Array,
        sex?: number,
        sexName?: string
    }

    interface AccessToken {
        accessToken: string,
        accessTokenName: string
    }

    interface LoginUserData {
        coreUser: CoreUser,
        accessToken: AccessToken
    }
}