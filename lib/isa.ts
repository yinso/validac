import * as B from './base';
import * as T from './transform';
import * as S from './sequence';
import * as C from './constraint';
import * as I from './intersect';
import * as U from './union';
import { ConvertValidator , wrapConvert , DefaultProc } from './convert';

export interface IsaValidator<T> extends B.Validator<B.ExplicitAny, T> {
    isa(v : B.ExplicitAny) : v is T;
    where(constraint : C.Constraint<T> | C.ConstraintPredicate<T>) : IsaValidator<T>;
    intersect<U>(validator : IsaValidator<U>) : IsaValidator<T & U>;
    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U>;
    isOptional() : IsaValidator<T | undefined>;
    transform<U>(transform : T.TransformProc<T, U>) : ConvertValidator<B.ExplicitAny, U>;
    defaultTo(defaultProc : DefaultProc<T>) : ConvertValidator<B.ExplicitAny, T>;
    cast<U extends T>() : IsaValidator<U>;
    toConvert() : ConvertValidator<B.ExplicitAny, T>;
}

export abstract class BaseIsaValidator<T> extends B.BaseValidator<B.ExplicitAny, T> implements IsaValidator<T> {
    abstract validate(value : B.ExplicitAny, path ?: string) : B.ValidationResult<T>;

    isa(value : B.ExplicitAny, path : string = '$') : value is T {
        return this.validate(value, path).cata((_) => true, (_) => false);
    }

    where(constraint : C.Constraint<T> | C.ConstraintPredicate<T>) : IsaValidator<T> {
        return new WrapperIsaValidator(S.sequence(this, C.check(constraint)))
    }

    intersect<U>(validator: IsaValidator<U>) : IsaValidator<T & U> {
        return new WrapperIsaValidator(I.allOf(this, validator))
    }

    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U> {
        return new WrapperIsaValidator(U.oneOf(this, validator));
    }

    transform<U>(transform : T.TransformProc<any, U>) : IsaValidator<U> {
        return new WrapperIsaValidator(S.sequence(this, new T.TransformValidator(transform)))
    }

    isOptional() : IsaValidator<T | undefined> {
        return new WrapperIsaValidator(U.oneOf(C.check((v) => v === undefined), this));
    }

    defaultTo(defaultProc : DefaultProc<T>) : ConvertValidator<B.ExplicitAny, T> {
        return wrapConvert(U.oneOf(S.sequence(C.check((v) => v === undefined), T.transform(defaultProc)), this))
    }

    cast<U extends T>() : IsaValidator<U> {
        return (this as B.ExplicitAny) as IsaValidator<U>;
    }

    toConvert() : ConvertValidator<B.ExplicitAny, T> {
        return this.transform((v) => v);
    }
}

export class WrapperIsaValidator<T> extends BaseIsaValidator<T> {
    readonly inner : B.Validator<B.ExplicitAny, T>;
    constructor(inner : B.Validator<B.ExplicitAny, T>) {
        super();
        this.inner = inner;
    }

    validate(value : any, path : string = '$') {
        return this.inner.validate(value, path);
    }
}

export function wrapIsa<T>(inner : B.Validator<B.ExplicitAny, T>) : BaseIsaValidator<T> {
    return new WrapperIsaValidator(inner);
}

export type IsaPredicate<T> = (v : any) => v is T;

class TypeofValidator<T> extends BaseIsaValidator<T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string; 
    constructor(isa : IsaPredicate<T>, typeName : string) {
        super();
        this.isaProc = isa;
        this.typeName = typeName;
    }

    validate(value : any, path : string = '$') {
        if (this.isaProc(value)) {
            return B.ValidationResult.resolve(value);
        } else {
            return B.ValidationResult.reject<T>({
                error: 'TypeError',
                expected: this.typeName,
                path: path,
                actual: value
            });
        }
    }
}

export function isa<T>(test : IsaPredicate<T>, typeName : string) : IsaValidator<T> {
    return new TypeofValidator(test, typeName);
}

