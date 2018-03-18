// how to 
import { IValidator } from '../base';

export function isTuple<T1, T2>(v1 : IValidator<T1>, v2 : IValidator<T2>) : IValidator<[T1, T2]>;
export function isTuple<T1, T2, T3>(v1 : IValidator<T1>, v2 : IValidator<T2>, v3 : IValidator<T3>) : IValidator<[T1, T2, T3]>;
export function isTuple<T1, T2, T3, T4>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
) : IValidator<[T1, T2, T3, T4]>;
export function isTuple<T1, T2, T3, T4, T5>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
) : IValidator<[T1, T2, T3, T4, T5]>;
export function isTuple<T1, T2, T3, T4, T5, T6>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
) : IValidator<[T1, T2, T3, T4, T5, T6]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
    v11 : IValidator<T11>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
    v11 : IValidator<T11>,
    v12 : IValidator<T12>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
    v11 : IValidator<T11>,
    v12 : IValidator<T12>,
    v13 : IValidator<T13>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
    v11 : IValidator<T11>,
    v12 : IValidator<T12>,
    v13 : IValidator<T13>,
    v14 : IValidator<T14>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : IValidator<T1>,
    v2 : IValidator<T2>,
    v3 : IValidator<T3>,
    v4 : IValidator<T4>,
    v5 : IValidator<T5>,
    v6 : IValidator<T6>,
    v7 : IValidator<T7>,
    v8 : IValidator<T8>,
    v9 : IValidator<T9>,
    v10 : IValidator<T10>,
    v11 : IValidator<T11>,
    v12 : IValidator<T12>,
    v13 : IValidator<T13>,
    v14 : IValidator<T14>,
    v15 : IValidator<T15>,
) : IValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;

