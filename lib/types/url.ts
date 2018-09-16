import { Scalar } from '../scalar';
import { isString , match } from './string';
import * as url from 'url';
import { isa } from '../isa';

export let isUrlString = isString
    .where((str) => {
        try {
            let res = new url.URL(str)
            return true
        } catch (e) {
            return false
        }
    })

export class Url extends Scalar<string> {
    private _inner : url.URL;
    protected constructor(v : string) {
        super(v)
        this._inner = new url.URL(v)
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

    get search() {
        return this._inner.search
    }

    get searchParams() {
        return this._inner.searchParams
    }

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
        return isUrl.toConvert().assert(v, path);
    }

    static convertUrlString = isUrlString
        .transform((v) => new Url(v))
}

export let isUrl = isa(Url.isUrl, 'Url')
isUrl.appendConvert(Url.convertUrlString)

export let convertUrl = isUrl.toConvert()
