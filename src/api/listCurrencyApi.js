export const getSymbols = async () => {
    try {
        const baseApi =
            "http://data.fixer.io/api/symbols?access_key=36816a6e74b71b8eea6ef20c4190213f";
        const response = await fetch(baseApi, {
            method: "GET"
        });
        const results = await response.json();
        return results;
    } catch (e) {
        return { success: false, error: e };
    }
};
