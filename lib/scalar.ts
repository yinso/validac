export abstract class Scalar<K extends string, T> {
    readonly $type: K
    private _value : T;
    protected constructor($type: K, value : T) {
        this.$type = $type
        this._value = value;
    }
    valueOf() : T { return this._value }
    toString() : string { return (this._value as any).toString() }
    toJSON() : T { return this._value }
}
