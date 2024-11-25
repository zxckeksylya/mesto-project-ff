export const required = value => {
    if (value !== '') {
        return true;
    }
    return false;
};
