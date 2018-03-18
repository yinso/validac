import { IValidator } from '../base';

export function isUnion<T1, T2, TInput = any>(v1 : IValidator<T1, TInput>, v2: IValidator<T2, TInput>) : IValidator<T1 | T2, TInput>;
export function isUnion<T1, T2, T3, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
) : IValidator<T1 | T2 | T3, TInput>;
export function isUnion<T1, T2, T3, T4, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
) : IValidator<T1 | T2 | T3 | T4, TInput>;
export function isUnion<T1, T2, T3, T4, T5, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5, TInput>;
export function isUnion<T1, T2, T3, T4, T5, T6, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
    v6: IValidator<T6, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5 | T6, TInput>;
export function isUnion<T1, T2, T3, T4, T5, T6, T7, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
    v6: IValidator<T6, TInput>,
    v7: IValidator<T7, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7, TInput>;
export function isUnion<T1, T2, T3, T4, T5, T6, T7, T8, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
    v6: IValidator<T6, TInput>,
    v7: IValidator<T7, TInput>,
    v8: IValidator<T8, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, TInput>;
export function isUnion<T1, T2, T3, T4, T5, T6, T7, T8, T9, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
    v6: IValidator<T6, TInput>,
    v7: IValidator<T7, TInput>,
    v8: IValidator<T8, TInput>,
    v9: IValidator<T9, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, TInput>;
export function isUnion<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TInput = any>(
    v1 : IValidator<T1, TInput>,
    v2: IValidator<T2, TInput>,
    v3: IValidator<T3, TInput>,
    v4: IValidator<T4, TInput>,
    v5: IValidator<T5, TInput>,
    v6: IValidator<T6, TInput>,
    v7: IValidator<T7, TInput>,
    v8: IValidator<T8, TInput>,
    v9: IValidator<T9, TInput>,
    v10: IValidator<T10, TInput>,
) : IValidator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T10, TInput>;
