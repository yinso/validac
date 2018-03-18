import { IValidator } from '../base';

export function isStringEnum<T1 extends string, T2 extends string, TInput = any>(v1 : T1, v2 : T2) : IValidator<T1 | T2>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3) : IValidator<T1 | T2 | T3>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4) : IValidator<T1 | T2 | T3 | T4>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3) : IValidator<T1 | T2 | T3>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5) : IValidator<T1 | T2 | T3 | T4 | T5>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6) : IValidator<T1 | T2 | T3 | T4 | T5 | T6>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function isStringEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
