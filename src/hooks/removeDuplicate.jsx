export const removeDuplicate = (duplicateStore, duplicateValue) => {
    if (duplicateStore.includes(duplicateValue)) {
        for (var i = duplicateStore.length - 1; i >= 0; i--) {
            if (duplicateStore[i] === duplicateValue) {
                duplicateStore.splice(i, 1)
            }
        }
    }
    return duplicateStore
}
