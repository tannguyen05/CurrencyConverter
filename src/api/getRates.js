export const getRates = async base => {
    try {
        const baseApi = `https://api.exchangerate-api.com/v4/latest/${base}`;
        const response = await fetch(baseApi, {
            method: "GET"
        });
        const results = await response.json();
        return results;
    } catch (e) {
        return { success: false, error: e };
    }
};
