import { Scalar } from '../scalar';
import { isString } from './string';
import * as url from 'whatwg-url';
import { isa } from '../isa';
import { ExplicitAny } from '../base';

export let isUrlString = isString
    .where((str) => {
        try {
            let res = new url.URL(str)
            return true
        } catch (e) {
            return false
        }
    })

export interface UrlOptions {
    hash? : string;
    hostname?: string;
    //password?: string;
    pathname?: string;
    port?: number;
    protocol?: string;
    query?: {[key: string]: any};
    //username? : string;
}

export class Url extends Scalar<string> {
    private _inner : url.URL;
    private _query : {[key: string]: ExplicitAny};
    protected constructor(v : string) {
        super(v)
        this._inner = new url.URL(v)
        this._query = this._parseSearch();
    }

    get hash() {
        return this._inner.hash
    }

    get host() {
        return this._inner.host
    }

    get hostname() {
        return this._inner.hostname
    }

    get href() {
        return this._inner.href
    }

    get origin() {
        return this._inner.origin
    }

    get password() {
        return this._inner.password
    }

    get pathname() {
        return this._inner.pathname
    }

    get port() {
        return this._inner.port
    }

    get protocol() {
        return this._inner.protocol
    }

    get query() {
        return this._query;
    }

    get search() {
        return this._inner.search
    }

    // get searchParams() {
    //     return this._inner.searchParams
    // }

    get username() {
        return this._inner.username
    }

    toJSON() {
        return this._inner.toJSON()
    }

    toString() {
        return this._inner.toString()
    }

    static isUrl(v : any) : v is Url {
        return v instanceof Url;
    }

    static fromJSON(v : any, path : string = '$') {
        return isUrl.convert(v, path);
    }

    static convertUrlString = isUrlString
        .transform((v) => new Url(v))

    // static format(options : UrlOptions) {
    //     return url.format({ ...options, query : flatten(options.query || {}, '') });
    // }

    private _parseSearch() {
        let query : {[key: string]: ExplicitAny }= {};
        Array.from(this._inner.searchParams).forEach((value, key) => {
            query[key] = value;
        })
        return unflatten(query);
    }
}

export let isUrl = isa(Url.isUrl, 'Url')
isUrl.appendConvert(Url.convertUrlString)

// what is the interface that we are looking for?
// we want to be able to format

// do we want separation between QUERY and POST?
// I don't like them to be separated in general.
// let's just say that they are one and the same...??
// what we want is as follows.
// we need to convert the query and the
function unflatten(map : {[key: string]: any}) : {[key: string]: any} {
    let result : {[key: string]: any}= {};
    // we want to first sort key?
    Object.keys(map).sort().forEach((key) => {
        processKey(result, key, map[key]);
        // create structure based on the keys.
        // assumption is that there aren't any conflicts...
        //
    })
    return result;
}

// below should be extracted out to its own library.

/*

v = {
    $.foo.bar: 1,
    $.foo.baz: 2
}

==>
{
    foo: {
        bar: 1
    }
}

== the split ==>
0, 1
[foo, bar]

when it's bar, we want to do current[bar] = 1
when it's foo, we want to do current[foo] = {}, current = current[foo]

*/

function processKey(result : {[key: string]: any}, key: string, value : any) : void {
    let segs = parseKey(key);
    let current = result;
    segs.forEach((seg, i) => {
        if (i < segs.length - 1) {
            current[seg] = current.hasOwnProperty(seg) ? current[seg] : isInteger(segs[i + 1]) ? [] : {};
            current = current[seg];
        } else {
            current[seg] = value;
        }
    })
}

function parseKey(key: string) {
    // what can we do with the key? we need to first split up the key...
    let segs = key.split('.').map((seg) => isIntString(seg) ? parseInt(seg) : seg); // the first seg needs to be $ but for now we'll ignore it.
    if (segs.length === 0) {
        return segs;
    } else if (segs[0] === '$') {
        segs.shift();
    }
    return segs;

}

function isInteger(seg : number | string) : seg is number {
    return typeof(seg) === 'number';
}

function isIntString(seg : string) {
    return /^\d+$/.test(seg);
}

function flatten(arg : {[key: string]: any}, key: string = '$') : {[key: string]: any} {
    let result = {};
    walk(result, arg, key)
    return result;
}

function walk(result : {[key: string]: any}, arg: {[key: string]: any}, key: string = '$') {
    Object.keys(arg).forEach((objKey) => {
        let value = arg[objKey];
        let fullKey = key === '' ? objKey : `${key}.${objKey}`
        if (value instanceof Array) {
            walk(result, value, fullKey);
        } else if (value instanceof Object) {
            walk(result, value, fullKey);
        } else {
            // this is the end...
            result[fullKey] = value;
        }
    })
}

// now that we have them, it's time to deal with forms.
// form specs are basically object specs.
