import { defineStore } from 'pinia';
import { storePool } from '@/constant';
import { authApi } from '@/service/api';

const useAuthStore = defineStore(storePool.authStoreId, {
    persist: true,
    state: () => {
        return {
            coreUser: {} as auth.CoreUser,
            accessToken: '',
            tokenName: ''
        };
    },
    getters: {
        nickname(): string {
            return this.coreUser.nickname ? this.coreUser.username : this.coreUser.nickname;
        }
    },
    actions: {
        login(dto: auth.UserLoginDto) {
            authApi.login(dto).then(__ => {
                this.$patch(state => {
                    state.coreUser = __.coreUser;
                    state.tokenName = __.accessToken.accessTokenName;
                    state.accessToken = __.accessToken.accessToken;
                });
            });
        },
        logout() {
            authApi.logout(this.coreUser.id)
        }
    }
});

export default useAuthStore;