import { Validator } from './base';

export function sequence<T1, T2>
    (v1 : Validator<T1>
    , v2: Validator<T2>
) : Validator<T2>;
export function sequence<T1, T2, T3>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
) : Validator<T3>;
export function sequence<T1, T2, T3, T4>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
) : Validator<T4>;
export function sequence<T1, T2, T3, T4, T5>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
) : Validator<T5>;
export function sequence<T1, T2, T3, T4, T5, T6>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
) : Validator<T6>;
export function sequence<T1, T2, T3, T4, T5, T6, T7>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
) : Validator<T7>;
export function sequence<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
) : Validator<T8>;
export function sequence<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
    , v9: Validator<T9>
) : Validator<T9>;
export function sequence<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
    , v9: Validator<T9>
    , v10: Validator<T10>
) : Validator<T10>;

