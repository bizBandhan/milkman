export default async function loadData(
    promise,
    successCallback,
    finallyCallback
) {
    try {
        let resp = await promise
        successCallback(resp);
    } catch (error) {

    } finally {
        finallyCallback();
    }

}