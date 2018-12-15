// Updates states immutably
const stateUpdater = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
}

export default stateUpdater;