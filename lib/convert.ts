import * as B from './base';
import * as T from './transform';
import * as S from './sequence';
import * as C from './constraint';
import * as I from './intersect';
import * as U from './union';

export interface ConvertValidator<T> extends B.Validator<T> {
    where(constraint : B.Constraint<T> | B.ConstraintPredicate<T>) : ConvertValidator<T>;
    intersect<U>(validator : ConvertValidator<U>) : ConvertValidator<T & U>;
    union<U>(validator : ConvertValidator<U>) : ConvertValidator<T | U>;
    isOptional() : ConvertValidator<T | undefined>;
    transform<U>(transform : B.TransformProc<T, U>) : ConvertValidator<U>;
    defaultTo(defaultProc : B.DefaultProc<T>) : ConvertValidator<T>;
    cast<U extends T>() : ConvertValidator<U>;
}

export abstract class BaseConvertValidator2<T> extends B.BaseValidator<T> implements ConvertValidator<T> {
    abstract validate(value : B.ExplicitAny, path ?: string) : B.ValidationResult<T>;

    where(constraint : B.Constraint<T> | B.ConstraintPredicate<T>) : ConvertValidator<T> {
        return new WrapperConvertValidator(S.sequence(this, C.check(constraint)))
    }

    intersect<U>(validator: ConvertValidator<U>) : ConvertValidator<T & U> {
        return new WrapperConvertValidator(I.allOf(this, validator))
    }

    union<U>(validator : ConvertValidator<U>) : ConvertValidator<T | U> {
        return new WrapperConvertValidator(U.oneOf(this, validator));
    }

    transform<U>(transform : B.TransformProc<any, U>) : ConvertValidator<U> {
        return new WrapperConvertValidator(S.sequence(this, new T.TransformValidator(transform)))
    }

    isOptional() : ConvertValidator<T | undefined> {
        return new WrapperConvertValidator(U.oneOf(C.check((v) => v === undefined), this));
    }

    defaultTo(defaultProc : B.DefaultProc<T>) : ConvertValidator<T> {
        return new WrapperConvertValidator(U.oneOf(S.sequence(C.check((v) => v === undefined), T.transform(defaultProc)), this))
    }

    cast<U extends T>() : ConvertValidator<U> {
        return (this as B.ExplicitAny) as ConvertValidator<U>;
    }
}

export class WrapperConvertValidator<T> extends BaseConvertValidator2<T> {
    readonly inner : B.Validator<T>;
    constructor(inner : B.Validator<T>) {
        super();
        this.inner = inner;
    }

    validate(value : any, path : string = '$') {
        return this.inner.validate(value, path);
    }
}

export function wrapConvert<T>(inner : B.Validator<T>) : BaseConvertValidator2<T> {
    return new WrapperConvertValidator(inner);
}
