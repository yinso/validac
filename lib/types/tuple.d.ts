import { IsaValidatorCompat, IsaValidator } from '../base';

export function isTuple<T1>(
    v1 : IsaValidatorCompat<T1>,
) : IsaValidator<[T1]>;
export function isTuple<T1, T2>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>
) : IsaValidator<[T1, T2]>;
export function isTuple<T1, T2, T3>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>
) : IsaValidator<[T1, T2, T3]>;
export function isTuple<T1, T2, T3, T4>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
) : IsaValidator<[T1, T2, T3, T4]>;
export function isTuple<T1, T2, T3, T4, T5>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
) : IsaValidator<[T1, T2, T3, T4, T5]>;
export function isTuple<T1, T2, T3, T4, T5, T6>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
    v14 : IsaValidatorCompat<T14>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
    v14 : IsaValidatorCompat<T14>,
    v15 : IsaValidatorCompat<T15>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
