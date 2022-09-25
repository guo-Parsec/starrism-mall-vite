declare namespace layout {
    interface TabPanesOption {
        label: string,
        disabled?: boolean,
        name: string,
        closable?: boolean
    }

    interface MenuOption {
        index: string,
        label: string,
        disabled?: boolean,
        children?: Array<MenuOption>,
        isLeaf: boolean
    }

    interface ContextMenuOption {
        label: string,
        command?: string,
        icon?: ComponentDefinition
    }
}