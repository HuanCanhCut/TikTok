export const removeDuplicate = (duplicateStore, duplicateValue) => {
    if (duplicateStore.includes(duplicateValue)) {
        const indexToRemove = duplicateStore.indexOf(duplicateValue)
        if (indexToRemove !== -1) {
            duplicateStore.splice(indexToRemove, 1)
        }
    }
}
