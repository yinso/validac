import { Scalar } from '../scalar';
import { isString  } from './string';
import { isa } from '../isa';
import * as E from 'email-addresses';

export let isEmailAddressString = isString
    .where((v) => !!E.parseOneAddress(v))

function _isParsedMailbox(mailboxOrGroup: emailAddresses.ParsedMailbox | emailAddresses.ParsedGroup): mailboxOrGroup is emailAddresses.ParsedMailbox {
    return mailboxOrGroup.type === 'mailbox';
}

export class EmailAddress extends Scalar<string> {
    private _parsed : E.ParsedMailbox;
    constructor(inner ?: string) {
        super(isEmailAddressString.convert(inner));
        if (inner) {
            let parsed = E.parseOneAddress(inner);
            if (_isParsedMailbox(parsed)) {
                this._parsed = parsed;
            } else {
                throw new Error(`InvalidEmailAddress: ${inner}`);
            }
        } else {
            throw new Error(`InvalidEmailAddress: ${inner}`);
        }
    }

    get name() : string | null {
        return this._parsed.name;
    }

    get address() : string {
        return this._parsed.address;
    }

    get localPart() : string {
        return this._parsed.local;
    }

    get domain() : string {
        return this._parsed.domain;
    }

    static isEmailAddress(v : any) : v is EmailAddress {
        return v instanceof EmailAddress;
    }

    static fromJSON(v : any, path : string = '$') {
        return isEmailAddress.convert(v, path);
    }

    static convertEmailAddressString = isEmailAddressString
        .transform((v) => new EmailAddress(v))
}

export let isEmailAddress = isa(EmailAddress.isEmailAddress, 'Email')
isEmailAddress.appendConvert(EmailAddress.convertEmailAddressString)
