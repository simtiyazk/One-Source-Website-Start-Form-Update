/**
 * Create an object with all the parameters passed and return it
 */
export function getParams() {
    let query = (window.location.search || '?').substr(1);
    let map   = {};

    query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, (match, key, value) => {
      map[key] = value || true;
    });
    return map;
}
