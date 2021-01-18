import * as S from './string';
import * as I from '../isa';
import { Scalar } from '../scalar';
import { ExplicitAny, CaseNames, CaseNameKeys } from '../base';

const camelCaseRegex = /^([a-z][a-z0-9]*)([A-Z][a-z0-9]+)*$/

const pascalCaseRegex = /^([A-Z][a-z0-9]+)+$/

const kebabCaseRegex = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/

const snakeCaseRegex = /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/

const macroCaseRegex = /^([A-Z][A-Z0-9]*)(_[A-Z0-9]+)*$/

export type IsCaseProc = (word : string) => boolean;

export type FromCaseProc = (word : string) => string[];

export type ToCaseProc = (words: string[]) => string;

export type CaseRegistryOptions = {
    caseName : CaseNameKeys;
    isCase : IsCaseProc;
    fromCase : FromCaseProc;
    toCase : ToCaseProc;
};

const caseRegistry : {[key in CaseNameKeys] ?: CaseRegistryOptions } = {};

export function registerCase(options : CaseRegistryOptions) {
    if (caseRegistry.hasOwnProperty(options.caseName)) {
        throw new Error(`DuplicateCasing: ${options.caseName}`)
    }
    caseRegistry[options.caseName] = options;
}

function fromCase(str : string) : string[] {
    for (var key in caseRegistry) {
        if (caseRegistry.hasOwnProperty(key)) {
            let options = (caseRegistry as ExplicitAny)[key] as CaseRegistryOptions;
            if (options.isCase(str)) {
                return options.fromCase(str);
            }
        }
    }
    throw new Error(`StringWithUnknownCasing: ${str}`)
}

registerCase({
    caseName: 'Camel',
    isCase: (v) => camelCaseRegex.test(v),
    fromCase: (str) => str.split(/(?=[A-Z])/).map((v) => v.toLowerCase()),
    toCase: (words) => [ words[0] ].concat(words.slice(1).map((w) => w[0].toUpperCase() + w.substring(1))).join('')
})

registerCase({
    caseName: 'Pascal',
    isCase: (v) => pascalCaseRegex.test(v),
    fromCase: (str) => str.split(/(?=[A-Z])/).map((v) => v.toLowerCase()),
    toCase: (words) => words.map((w) => w[0].toUpperCase() + w.substring(1)).join('')
})

registerCase({
    caseName: 'Kebab',
    isCase: (v) => kebabCaseRegex.test(v),
    fromCase: (str) => str.split('-'),
    toCase: (words) => words.join('-')
})

registerCase({
    caseName: 'Snake',
    isCase: (v) => snakeCaseRegex.test(v),
    fromCase: (str) => str.split('_'),
    toCase: (words) => words.join('_')
})

registerCase({
    caseName: 'Macro',
    isCase: (v) => macroCaseRegex.test(v),
    fromCase: (str) => str.split('_').map((v) => v.toLowerCase()),
    toCase: (words) => words.map((v) => v.toUpperCase()).join('_')
})

export class CasedWord extends Scalar<'CasedWord', string> {
    readonly words : string[];
    constructor(word : string) {
        super('CasedWord', word);
        this.words = fromCase(word);
    }

    toCase(casing : CaseNameKeys) {
        let options = caseRegistry[casing];
        if (options) {
            return options.toCase(this.words);
        } else {
            throw new Error(`UnknownCasing: ${casing}`);
        }
    }

    static isCasedWord = I.isa((v : ExplicitAny) : v is CasedWord => v instanceof CasedWord, 'CasedWord')
}

export let isCasedWord = CasedWord.isCasedWord;

export let isCamelCaseString = S.isString.where(S.match(camelCaseRegex))

export let isPascalCaseString = S.isString.where(S.match(pascalCaseRegex))

export let isKebabCaseString = S.isString.where(S.match(kebabCaseRegex))

export let isSnakeCaseString = S.isString.where(S.match(snakeCaseRegex))

export let isMacroCaseString = S.isString.where(S.match(macroCaseRegex))

isCasedWord.appendConvert(isCamelCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isPascalCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isKebabCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isSnakeCaseString
    .transform((v) => new CasedWord(v)))

isCasedWord.appendConvert(isMacroCaseString
    .transform((v) => new CasedWord(v)))
