<template>
    <div id="main-page" class="main-container">
        <el-tabs v-model="activeTabName" type="card" class="main-container" @tab-remove="removeTab"
                 @tab-click="selectTab">
            <template v-for="(pane,index) in tabPanes" :key="index">
                <el-tab-pane :name="pane.name" :disabled="pane.disabled" :closable="pane.closable"
                             :label="pane.label">
                    <template #label>
                        <el-dropdown trigger="contextmenu" :id="pane.name" ref="dropdownRef" size="small"
                                     @visible-change="handleChange($event, pane.name)"
                                     :disabled="tabPanes.length === 1">
                            <span :class="activeTabName === pane.name ? 'label' : ''">{{ pane.label }}</span>
                            <template #dropdown>
                                <el-dropdown-menu v-show="tabPanes.length > 1">
                                    <template v-for="(context,contextIndex) in tabContextMenu" :key="contextIndex">
                                        <el-dropdown-item class="tab-context-menu"
                                                          @click="doContextCommand(pane.name, context.command)"
                                                          v-if="showContext(pane.name, context.command)">
                                            <el-icon v-if="context.icon !== undefined">
                                                <component :is="context.icon"/>
                                            </el-icon>
                                            <span>{{ context.label }}</span>
                                        </el-dropdown-item>
                                    </template>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                    <router-view v-if="pane.name===activeTabName"/>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { TabsPaneContext } from 'element-plus';

const router = useRouter();

const store = useStore();

const { tabPanes, currActiveRoutePath } = storeToRefs(store.layout);
const activeTabName = currActiveRoutePath;

function removeTab(targetName: string) {
    store.layout.closeTabPane(targetName);
}

function selectTab(tabPane: TabsPaneContext) {
    router.push(tabPane.paneName as string);
}

const dropdownRef = ref();
const handleChange = (visible: boolean, name: string) => {
    if (!visible) return;
    dropdownRef.value.forEach((item: { id: string; handleClose: () => void }) => {
        if (item.id === name) return;
        item.handleClose();
    });
};

const tabContextMenu: Array<layout.ContextMenuOption> = reactive([
    {
        label: '关闭当前标签页',
        command: 'current',
        icon: 'CloseBold'
    },
    {
        label: '关闭左侧标签页',
        command: 'left',
        icon: 'ArrowLeftBold'
    },
    {
        label: '关闭右侧标签页',
        command: 'right',
        icon: 'ArrowRightBold'
    },
    {
        label: '关闭其它标签页',
        command: 'other',
        icon: 'CircleCloseFilled'
    },
    {
        label: '关闭所有标签页',
        command: 'all',
        icon: 'Menu'
    }
]);

function showContext(name: string, type: string) {
    let index = tabPanes.value.findIndex(item => item.name === name);
    if (type === 'left' && index === 1) {
        return false;
    }
    if (name === '/workbench' && (type === 'current')) {
        return false;
    }
    return !(type === 'right' && index === (tabPanes.value.length - 1));
}

function doContextCommand(name: string, type: string) {
    if (type === 'all') {
        store.layout.closeAll();
        return;
    }
    if (type === 'current') {
        store.layout.closeTabPane(name);
        return;
    }
    if (type === 'other') {
        store.layout.closeOther(name);
        return;
    }
    let curIndex = tabPanes.value.findIndex(item => item.name === name);
    if (type === 'left') {
        const left: Array<string> = [];
        tabPanes.value
            .forEach((element, index) => {
                if (index < curIndex && element.name !== '/workbench') {
                    left.push(element.name);
                }
            });
        store.layout.closeMany(left);
        return;
    }
    if (type === 'right') {
        const right: Array<string> = [];
        tabPanes.value
            .forEach((element, index) => {
                if (index > curIndex && element.name !== '/workbench') {
                    right.push(element.name);
                }
            });
        store.layout.closeMany(right);
        return;
    }
}

</script>

<style scoped>
.label {
    color: var(--el-color-primary);
}

::v-deep(.el-tabs__item .el-dropdown) {
    line-height: inherit;
}

::v-deep(.el-tabs__item:hover span) {
    color: var(--el-color-primary);
}

.tab-context-menu span {
    font-size: 12px;
    font-family: "Sarasa Fixed SC Semibold", Arial, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
    font-weight: 600;
}
</style>