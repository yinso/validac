import { Scalar } from '../scalar';
import { isString , match } from './string';
import { isLiteral } from './literal';
import { isa , isOneOf } from '../isa';

// inspired by https://github.com/emilbayes/is-domain-name/blob/master/index.js
const _isDomainRegex = /^([a-z0-9]([-a-z0-9]*[a-z0-9])?\.)+([a-z]+)$/;

export let isDomainNameString = isOneOf(
    isLiteral('localhost'),
    isString.where(match(_isDomainRegex))
);

export class DomainName extends Scalar<string> {
    constructor(inner : string) {
        super(inner);
    }

    static isDomainName(v : any) : v is DomainName {
        return v instanceof DomainName;
    }

    static convertDomainNameString = isDomainNameString
        .transform((v) => new DomainName(v));
}

export let isDomainName = isa(DomainName.isDomainName, 'DomainName');

isDomainName.appendConvert(DomainName.convertDomainNameString);
