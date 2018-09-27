import { Scalar } from '../scalar';
import { isString , match } from './string';
import { isa } from '../isa';
import * as uuid from 'uuid';

export let isUuidString = isString
    .where(match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))

export class Uuid extends Scalar<string> {
    constructor(inner ?: string) {
        super(isUuidString.toConvert().assert(inner || uuid.v4()));
    }

    static isUuid(v : any) : v is Uuid {
        return v instanceof Uuid;
    }

    static fromJSON(v : any, path : string = '$') {
        return isUuid.toConvert().assert(v, path);
    }

    static convertUrlString = isUuidString
        .transform((v) => new Uuid(v))
}

export let isUuid = isa(Uuid.isUuid, 'Uuid')
isUuid.appendConvert(Uuid.convertUrlString)

export let convertUuid = isUuid.toConvert()
