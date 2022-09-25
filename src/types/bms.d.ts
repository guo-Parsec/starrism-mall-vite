declare namespace bms {
    interface PageDto {
        currPage: number,
        pageSize: number,
    }

    interface BmsParamQuery extends PageDto {
        groupCode?: string;
        paramCode?: string;
        paramName?: string;
    }

    interface BmsParamVo {
        id: string,
        groupCode: string,
        paramCode: string,
        paramValue: string
        paramName: string,
        description: string
    }
}