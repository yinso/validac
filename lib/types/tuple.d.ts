import { ExplicitAny , ConvertValidator , IsaValidator } from '../base';

export function isTuple<T1>(
    v1 : IsaValidator<T1>,
) : IsaValidator<[T1]>;
export function isTuple<T1, T2>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>
) : IsaValidator<[T1, T2]>;
export function isTuple<T1, T2, T3>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>
) : IsaValidator<[T1, T2, T3]>;
export function isTuple<T1, T2, T3, T4>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
) : IsaValidator<[T1, T2, T3, T4]>;
export function isTuple<T1, T2, T3, T4, T5>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
) : IsaValidator<[T1, T2, T3, T4, T5]>;
export function isTuple<T1, T2, T3, T4, T5, T6>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
    v11 : IsaValidator<T11>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
    v11 : IsaValidator<T11>,
    v12 : IsaValidator<T12>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
    v11 : IsaValidator<T11>,
    v12 : IsaValidator<T12>,
    v13 : IsaValidator<T13>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
    v11 : IsaValidator<T11>,
    v12 : IsaValidator<T12>,
    v13 : IsaValidator<T13>,
    v14 : IsaValidator<T14>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : IsaValidator<T1>,
    v2 : IsaValidator<T2>,
    v3 : IsaValidator<T3>,
    v4 : IsaValidator<T4>,
    v5 : IsaValidator<T5>,
    v6 : IsaValidator<T6>,
    v7 : IsaValidator<T7>,
    v8 : IsaValidator<T8>,
    v9 : IsaValidator<T9>,
    v10 : IsaValidator<T10>,
    v11 : IsaValidator<T11>,
    v12 : IsaValidator<T12>,
    v13 : IsaValidator<T13>,
    v14 : IsaValidator<T14>,
    v15 : IsaValidator<T15>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
