import { useLocation } from 'react-router-dom'

export const useQueryParams = (...args: string[]) => {
    const location = useLocation()
    const params = []
    const query = new URLSearchParams(location.search)

    // const searchParams = location.search.slice(1).split('&')

    for (const key of args) {
        params.push(query.get(key))

        // let v = ''
        // for (const item of searchParams) {
        //     const k = key + '='
        //     if (item.includes(k)) v = encodeURIComponent(item.slice(k.length))
        // }
        // params.push(v || null)
    }
    return params
}

// https://stackoverflow.com/questions/45516070/urlsearchparams-does-not-return-the-same-string-as-found-in-a-urls-parameters

// class UrlParams {
//    constructor(search) {
//       this.qs = (search || location.search).substr(1);
//       this.params = {};
//       this.parseQuerstring();
//    }
//    parseQuerstring() {
//       this.qs.split('&').reduce((a, b) => {
//         let [key, val] = b.split('=');
//         a[key] = val;
//         return a;
//       }, this.params);
//    }
//    get(key) {
//       return this.params[key];
//    }
// }

// const params = new UrlParams('?q=Javascript+Stuff');
// console.log(params.get('q'));
