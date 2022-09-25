<template>
    <el-container class="main-container">
        <el-header height="80px" style="padding: 10px">
            <el-form :inline="true" :model="queryForm">
                <el-form-item label="参数标识">
                    <el-input v-model="queryForm.paramCode" clearable placeholder="请输入参数标识"/>
                </el-form-item>
                <el-form-item label="参数名称">
                    <el-input v-model="queryForm.paramName" clearable placeholder="请输入参数名称"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doQuery">查询</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main style="height: 100%">
            <el-table :data="pageData.records" border style="width: 100%">
                <el-table-column type="selection" align="center" width="55"/>
                <el-table-column prop="groupCode" align="center" label="组别"/>
                <el-table-column prop="paramCode" align="center" label="参数标识"/>
                <el-table-column prop="paramValue" align="center" label="参数值"/>
                <el-table-column prop="paramName" align="center" label="参数名称"/>
                <el-table-column prop="description" align="center" label="备注"/>
            </el-table>
        </el-main>
        <el-footer>
            <el-config-provider :locale="locale">
                <el-pagination
                    small
                    background
                    @current-change="pageChange"
                    v-model="queryForm.currPage"
                    :layout="'prev,pager,next,->,total'"
                    :total="pageData.total"
                />
            </el-config-provider>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { bmsApi } from '@/service/api';
import PageData = Service.PageData;
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = zhCn;
const queryForm: bms.BmsParamQuery = reactive<bms.BmsParamQuery>({
    pageSize: 10,
    currPage: 1,
    paramCode: '',
    paramName: ''
});

doQuery();

let pageData: PageData<bms.BmsParamVo> = reactive<PageData<bms.BmsParamVo>>({} as PageData<bms.BmsParamVo>);

function doQuery() {
    bmsApi.pageQuery(queryForm).then(res => {
        pageData.records = res.records;
        pageData.total = res.total;
    });
}

function pageChange(currPage: number) {
    queryForm.currPage = currPage;
    doQuery();
}
</script>

<style scoped>

</style>