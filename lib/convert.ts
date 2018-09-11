import * as B from './base';
import * as T from './transform';
import * as S from './sequence';
import * as C from './constraint';
import * as I from './intersect';
import * as U from './union';

export type DefaultProc<T> = () => T;

export interface ConvertValidator<T, U> extends B.Validator<T, U> {
    where(constraint : C.Constraint<U> | C.ConstraintPredicate<U>) : ConvertValidator<T, U>;
    intersect<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U & V>;
    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V>;
    isOptional() : ConvertValidator<T, U | undefined>;
    transform<V>(transform : T.TransformProc<U, V>) : ConvertValidator<T, V>;
    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U>;
    cast<V extends U>() : ConvertValidator<T, V>;
}

export abstract class BaseConvertValidator<T, U> extends B.BaseValidator<T, U> implements ConvertValidator<T, U> {
    abstract validate(value : T, path ?: string) : B.ValidationResult<U>;

    where(constraint : C.Constraint<U> | C.ConstraintPredicate<U>) : ConvertValidator<T, U> {
        return new WrapperConvertValidator(S.sequence(this, C.check(constraint)))
    }

    intersect<V>(validator: ConvertValidator<T, V>) : ConvertValidator<T, U & V> {
        return new WrapperConvertValidator(I.allOf(this, validator))
    }

    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V> {
        return new WrapperConvertValidator(U.oneOf(this, validator));
    }

    transform<V>(transform : T.TransformProc<U, V>) : ConvertValidator<T, V> {
        let trans = new T.TransformValidator(transform);
        let seq = S.sequence(this, trans);
        let wrapper = new WrapperConvertValidator(seq);
        return wrapper;
        return new WrapperConvertValidator(S.sequence(this, new T.TransformValidator(transform)))
    }

    isOptional() : ConvertValidator<T, U | undefined> {
        return new WrapperConvertValidator(U.oneOf(C.check((v) => v === undefined), this));
    }

    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U> {
        return new WrapperConvertValidator(U.oneOf(S.sequence(C.check((v) => v === undefined), T.transform(defaultProc)), this))
    }

    cast<V extends U>() : ConvertValidator<T, V> {
        return (this as B.ExplicitAny) as ConvertValidator<T, V>;
    }
}

export class WrapperConvertValidator<T, U> extends BaseConvertValidator<T, U> {
    readonly inner : B.Validator<T, U>;
    constructor(inner : B.Validator<T, U>) {
        super();
        this.inner = inner;
    }

    validate(value : any, path : string = '$') {
        return this.inner.validate(value, path);
    }
}

export function wrapConvert<T, U>(inner : B.Validator<T, U>) : BaseConvertValidator<T, U> {
    return new WrapperConvertValidator(inner);
}
