import { defineStore } from 'pinia';
import { storePool } from '@/constant';
import router from '@/router';
import { useRoute } from 'vue-router';

const useLayoutStore = defineStore(storePool.layoutStoreId, {
    persist: true,
    state: () => {
        return {
            tabPanes: [
                {
                    label: '工作站',
                    disabled: false,
                    name: '/workbench',
                    closable: false
                }
            ] as Array<layout.TabPanesOption>,
            currActiveRoutePath: '',
        };
    },
    getters: {
        tabPaneNames(): Array<string> {
            return this.tabPanes.map(pane => pane.name);
        }
    },
    actions: {
        putTabPane(pane: layout.TabPanesOption) {
            if (pane.closable == undefined) {
                pane.closable = false;
            }
            if (pane.disabled == undefined) {
                pane.disabled = false;
            }
            this.$patch(state => {
                state.currActiveRoutePath = pane.name
                if (this.tabPaneNames.includes(pane.name)) {
                    console.warn(`pane [${pane.name}] has existed!`);
                    return;
                }
                state.tabPanes.push(pane);
            });
        },
        closeTabPane(paneName: string) {
            this.$patch(state => {
                if (!this.tabPaneNames.includes(paneName)) {
                    console.warn(`pane [${paneName}] not exist!`);
                    return;
                }
                state.tabPanes = state.tabPanes.filter(item => paneName != item.name);
                if (state.currActiveRoutePath === paneName) {
                    state.currActiveRoutePath = this.tabPaneNames[this.tabPaneNames.length - 1]
                    router.push(state.currActiveRoutePath).catch(err => console.error(err))
                }
            });
        },
        putActiveRoutePath() {
            const route = useRoute()
            this.$patch(state => {
                state.currActiveRoutePath = route.path
            })
        }
    }
});

export default useLayoutStore;