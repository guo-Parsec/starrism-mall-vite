import { defineStore } from 'pinia';
import { storePool } from '@/constant';
import { authApi } from '@/service/api';
import router from '@/router';

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
        },
        isLogin(): boolean {
            return this.accessToken != undefined && this.accessToken != '' && this.accessToken.length > 0;
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
                router.push('/workbench').catch(err => console.error(err));
            });
        },
        logout() {
            authApi.logout(this.coreUser.id);
        }
    }
});

export default useAuthStore;