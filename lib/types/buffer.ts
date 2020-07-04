import { isa } from "../isa";
import { isLiteral } from "./literal";
import { isObject } from "./object";
import { isArray } from "./array";
import { isNumber } from "./number";
import { isString, match } from "./string";

export const isBuffer = isa((v: any): v is Buffer => v instanceof Buffer, 'Buffer');

const convertBufferJson = isObject({
    type: isLiteral('Buffer'),
    data: isArray(isNumber)
}).transform((v) => Buffer.from(v.data));

isBuffer.appendConvert(convertBufferJson);

export const convertHexString = isString.where(match(/^([0-9a-fA-F][0-9a-fA-F])*$/))
    .transform((v) => Buffer.from(v, 'hex'));

isBuffer.appendConvert(convertHexString);

export const isBase64Regex = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=)?$/;

export const convertBase64String = isString.where(match(isBase64Regex))
    .transform((v) => Buffer.from(v, 'base64'));

isBuffer.appendConvert(convertBase64String);
