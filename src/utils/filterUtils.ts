export function getConditionsFromDataType(dataType: string) {
    switch (dataType) {
        case "string":
            return ["text is exactly", "text is not exactly", "text contains", "text does not contain", "text starts with", "text ends with", "text matches regex", "text does not match regex"]
        case "number":
            return ["number is equal to", "number is not equal to", "number is greater than", "number is greater than or equal to", "number is less than", "number is less than or equal to", "number is between", "number is not between"]
        default:
            return []
    }
}

export function getColumnDataType(tableData, columnName: string) {
    const firstTableRow = tableData[0]
    const columnDataType = typeof firstTableRow[columnName]
    return columnDataType
}