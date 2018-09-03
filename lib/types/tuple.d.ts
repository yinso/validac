// how to 
import { Validator } from '../validator';

export function isTuple<TInput, T1>(
    v1 : Validator<TInput, T1>,
) : Validator<TInput, [T1]>;
export function isTuple<TInput, T1, T2>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>
) : Validator<TInput, [T1, T2]>;
export function isTuple<TInput, T1, T2, T3>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>
) : Validator<TInput, [T1, T2, T3]>;
export function isTuple<TInput, T1, T2, T3, T4>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
) : Validator<TInput, [T1, T2, T3, T4]>;
export function isTuple<TInput, T1, T2, T3, T4, T5>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
) : Validator<TInput, [T1, T2, T3, T4, T5]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
    v11 : Validator<TInput, T11>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
    v11 : Validator<TInput, T11>,
    v12 : Validator<TInput, T12>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
    v11 : Validator<TInput, T11>,
    v12 : Validator<TInput, T12>,
    v13 : Validator<TInput, T13>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
    v11 : Validator<TInput, T11>,
    v12 : Validator<TInput, T12>,
    v13 : Validator<TInput, T13>,
    v14 : Validator<TInput, T14>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : Validator<TInput, T1>,
    v2 : Validator<TInput, T2>,
    v3 : Validator<TInput, T3>,
    v4 : Validator<TInput, T4>,
    v5 : Validator<TInput, T5>,
    v6 : Validator<TInput, T6>,
    v7 : Validator<TInput, T7>,
    v8 : Validator<TInput, T8>,
    v9 : Validator<TInput, T9>,
    v10 : Validator<TInput, T10>,
    v11 : Validator<TInput, T11>,
    v12 : Validator<TInput, T12>,
    v13 : Validator<TInput, T13>,
    v14 : Validator<TInput, T14>,
    v15 : Validator<TInput, T15>,
) : Validator<TInput, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;

