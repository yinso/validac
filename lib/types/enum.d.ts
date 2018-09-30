import { ExplicitAny , ConvertValidator , IsaValidator } from '../base';

export function isEnum<
    T1 extends string,
    >
    (v1 : T1)
: IsaValidator<T1>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    >
    (v1 : T1, v2 : T2)
: IsaValidator<T1 | T2>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3)
: IsaValidator<T1 | T2 | T3>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4)
: IsaValidator<T1 | T2 | T3 | T4>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5)
: IsaValidator<T1 | T2 | T3 | T4 | T5>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6)
: IsaValidator<T1 | T2 | T3 | T4 | T5 | T6>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7)
: IsaValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8)
: IsaValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9)
: IsaValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    T10 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9, v10: T10)
: IsaValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
