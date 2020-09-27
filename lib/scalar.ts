export abstract class Scalar<T> {
    private _value : T;
    protected constructor(value : T) {
        this._value = value;
    }
    valueOf() : T { return this._value }
    toString() : string { return (this._value as any).toString() }
    toJSON() : T { return this._value }
}
