import { findAndUpdateNodeData, findNodeById } from "./globalUtils"

export function getConditionsFromDataType(dataType: string) {
    switch (dataType) {
        case "string":
            return ["text is exactly", "text is not exactly", "text contains", "text does not contain", "text starts with", "text ends with", "text matches regex", "text does not match regex"]
        case "number":
            return ["number is equal to", "number is not equal to", "number is greater than", "number is greater than or equal to", "number is less than", "number is less than or equal to"]
        default:
            return []
    }
}

export function getColumnDataType(tableData, columnName: string) {
    for (let i = 0; i < tableData.length; i++) {
        const row = tableData[i]
        const columnDataType = typeof row[columnName]
        if (row[columnName] && columnDataType !== "object") {
            return columnDataType
        }
    }
    return "undefined"
}

export function processDataLogic(state, action) {
    const nodeId = action.payload
    const nodeData = findNodeById(nodeId, state.nodes)?.data;
    const sourceNodeData = findNodeById(nodeData?.sourceNode, state.nodes)?.data;

    switch (nodeData.selectedCondition) {
        case "number is equal to":
        case "number is not equal to":
        case "number is greater than":
        case "number is greater than or equal to":
        case "number is less than":
        case "number is less than or equal to":
            const number = Number.parseFloat(nodeData?.inputValue);
            const filteredData = sourceNodeData?.tableData?.filter((row) => {
                switch (nodeData.selectedCondition) {
                    case "number is equal to":
                        return row[nodeData?.selectedColumn] === number;
                    case "number is not equal to":
                        return row[nodeData?.selectedColumn] !== number;
                    case "number is greater than":
                        return row[nodeData?.selectedColumn] > number;
                    case "number is greater than or equal to":
                        return row[nodeData?.selectedColumn] >= number;
                    case "number is less than":
                        return row[nodeData?.selectedColumn] < number;
                    case "number is less than or equal to":
                        return row[nodeData?.selectedColumn] <= number;
                    default:
                        return false;
                }
            });

            state.nodes = findAndUpdateNodeData(nodeId, { tableData: filteredData }, state.nodes);
            state.outputData = filteredData;
            break;

        case "text is exactly":
        case "text is not exactly":
        case "text contains":
        case "text does not contain":
        case "text starts with":
        case "text ends with":
        case "text matches regex":
        case "text does not match regex":
            const text = nodeData?.inputValue;
            const filteredTextData = sourceNodeData?.tableData?.filter((row) => {
                switch (nodeData.selectedCondition) {
                    case "text is exactly":
                        return row[nodeData?.selectedColumn] === text;
                    case "text is not exactly":
                        return row[nodeData?.selectedColumn] !== text;
                    case "text contains":
                        return row[nodeData?.selectedColumn].includes(text);
                    case "text does not contain":
                        return !row[nodeData?.selectedColumn].includes(text);
                    case "text starts with":
                        return row[nodeData?.selectedColumn].startsWith(text);
                    case "text ends with":
                        return row[nodeData?.selectedColumn].endsWith(text);
                    case "text matches regex":
                        return new RegExp(text).test(row[nodeData?.selectedColumn]);
                    case "text does not match regex":
                        return !new RegExp(text).test(row[nodeData?.selectedColumn]);
                    default:
                        return false;
                }
            });

            state.nodes = findAndUpdateNodeData(nodeId, { tableData: filteredTextData }, state.nodes);
            state.outputData = filteredTextData;
            break;
        default:
            console.log("No condition found");
            break;
    }
}