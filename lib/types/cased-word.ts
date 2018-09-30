import * as S from './string';
import * as I from '../isa';
import { Scalar } from '../scalar';
import { ExplicitAny, Casing } from '../base';

const camelCaseRegex = /^([a-z][a-z0-9]*)([A-Z][a-z0-9]+)*$/

const pascalCaseRegex = /^([A-Z][a-z0-9]+)+$/

const kababCaseRegex = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/

const snakeCaseRegex = /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/

const upperSnakeCaseRegex = /^([A-Z][A-Z0-9]*)(_[A-Z0-9]+)*$/

export class CasedWord extends Scalar<string> {
    readonly words : string[];
    constructor(word : string) {
        super(word);
        this.words = this._toWords(word);
    }

    toCase(casing : keyof typeof Casing) {
        switch (Casing[casing]) {
            case 'Camel':
                return this.toCamelCase();
            case 'Pascal':
                return this.toPascalCase();
            case 'Kabab':
                return this.toKababCase();
            case 'Snake':
                return this.toSnakeCase();
            case 'UpperSnake':
                return this.toUpperSnakeCase();
            default:
                throw new Error(`InvalidCasing: ${casing}`)
        }
    }

    toCamelCase() {
        return [ this.words[0] ].concat(this.words.slice(1).map((w) => w[0].toUpperCase() + w.substring(1))).join('');
    }

    toPascalCase() {
        return this.words.map((w) => w[0].toUpperCase() + w.substring(1)).join('');
    }

    toSnakeCase() {
        return this.words.join('_');
    }

    toUpperSnakeCase() {
        return this.words.map((v) => v.toUpperCase()).join('_');
    }

    toKababCase() {
        return this.words.join('-');
    }

    static isCasedWord = I.isa((v : ExplicitAny) : v is CasedWord => v instanceof CasedWord, 'CasedWord')

    private _toWords(str : string) : string[] {
        if (camelCaseRegex.test(str)) {
            return this._camelToWords(str);
        } else if (pascalCaseRegex.test(str)) {
            return this._pascalToWords(str);
        } else if (snakeCaseRegex.test(str)) {
            return this._snakeToWords(str);
        } else if (kababCaseRegex.test(str)) {
            return this._kababToWords(str);
        } else if (upperSnakeCaseRegex.test(str)) {
            return this._upperSnakeToWords(str);
        } else {
            throw new Error(`InvalidCaseWord: ${str}`);
        }
    }

    private _snakeToWords(str : string) : string[] {
        return str.split('_');
    }

    private _upperSnakeToWords(str : string) : string[] {
        return str.split('_').map((w) => w.toLowerCase());
    }

    private _kababToWords(str : string) : string[] {
        return str.split('-');
    }

    private _camelToWords(str : string) : string[] {
        return str.split(/(?=[A-Z])/).map((v) => v.toLowerCase());
    }

    private _pascalToWords(str : string) : string[] {
        return str.split(/(?=[A-Z])/).map((v) => v.toLowerCase());
    }
}

export let isCasedWord = CasedWord.isCasedWord;

export let isCamelCaseString = S.isString.where(S.match(camelCaseRegex))

export let isPascalCaseString = S.isString.where(S.match(pascalCaseRegex))

export let isKababCaseString = S.isString.where(S.match(kababCaseRegex))

export let isSnakeCaseString = S.isString.where(S.match(snakeCaseRegex))

export let isUpperSnakeCaseString = S.isString.where(S.match(upperSnakeCaseRegex))

isCasedWord.appendConvert(isCamelCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isPascalCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isKababCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isSnakeCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isUpperSnakeCaseString
    .transform((v) => new CasedWord(v)))
