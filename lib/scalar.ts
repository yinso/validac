export class Scalar<T> {
    private _value : T;
    constructor(value : T) {
        this._value = value;
    }
    valueOf() : T { return this._value }
    toString() : string { return this._value.toString() }
    toJSON() : T { return this._value }
}

