// how to 
import { Validator } from '../validator';

export function isTuple<T1, T2>(v1 : Validator<T1>, v2 : Validator<T2>) : Validator<[T1, T2]>;
export function isTuple<T1, T2, T3>(v1 : Validator<T1>, v2 : Validator<T2>, v3 : Validator<T3>) : Validator<[T1, T2, T3]>;
export function isTuple<T1, T2, T3, T4>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
) : Validator<[T1, T2, T3, T4]>;
export function isTuple<T1, T2, T3, T4, T5>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
) : Validator<[T1, T2, T3, T4, T5]>;
export function isTuple<T1, T2, T3, T4, T5, T6>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
) : Validator<[T1, T2, T3, T4, T5, T6]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
    v11 : Validator<T11>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
    v11 : Validator<T11>,
    v12 : Validator<T12>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
    v11 : Validator<T11>,
    v12 : Validator<T12>,
    v13 : Validator<T13>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
    v11 : Validator<T11>,
    v12 : Validator<T12>,
    v13 : Validator<T13>,
    v14 : Validator<T14>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : Validator<T1>,
    v2 : Validator<T2>,
    v3 : Validator<T3>,
    v4 : Validator<T4>,
    v5 : Validator<T5>,
    v6 : Validator<T6>,
    v7 : Validator<T7>,
    v8 : Validator<T8>,
    v9 : Validator<T9>,
    v10 : Validator<T10>,
    v11 : Validator<T11>,
    v12 : Validator<T12>,
    v13 : Validator<T13>,
    v14 : Validator<T14>,
    v15 : Validator<T15>,
) : Validator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;

