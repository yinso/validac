import { IValidator } from './base';
export function chain<T1, TInput = any>(v1 : IValidator<T1, TInput>) : IValidator<T1, TInput>;
export function chain<T1, T2, TInput = any>(v1 : IValidator<T1, TInput>, v2 : IValidator<T2, T1>) : IValidator<T2, TInput>;
export function chain<T1, T2, T3, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
) : IValidator<T3, TInput>;
export function chain<T1, T2, T3, T4, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
) : IValidator<T4, TInput>;
export function chain<T1, T2, T3, T4, T5, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
) : IValidator<T5, TInput>;
export function chain<T1, T2, T3, T4, T5, T6, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
    v6 : IValidator<T6, T5>,
) : IValidator<T6, TInput>;
export function chain<T1, T2, T3, T4, T5, T6, T7, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
    v6 : IValidator<T6, T5>,
    v7 : IValidator<T7, T6>,
) : IValidator<T7, TInput>;
export function chain<T1, T2, T3, T4, T5, T6, T7, T8, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
    v6 : IValidator<T6, T5>,
    v7 : IValidator<T7, T6>,
    v8 : IValidator<T8, T7>,
) : IValidator<T8, TInput>;
export function chain<T1, T2, T3, T4, T5, T6, T7, T8, T9, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
    v6 : IValidator<T6, T5>,
    v7 : IValidator<T7, T6>,
    v8 : IValidator<T8, T7>,
    v9 : IValidator<T9, T8>,
) : IValidator<T9, TInput>;
export function chain<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2 : IValidator<T2, T1>,
    v3 : IValidator<T3, T2>,
    v4 : IValidator<T4, T3>,
    v5 : IValidator<T5, T4>,
    v6 : IValidator<T6, T5>,
    v7 : IValidator<T7, T6>,
    v8 : IValidator<T8, T7>,
    v9 : IValidator<T9, T8>,
    v10 : IValidator<T10, T9>,
) : IValidator<T10, TInput>;
