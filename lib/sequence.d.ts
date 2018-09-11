import { Validator } from './base';

export function sequence<T, T1, T2>
    (v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
) : Validator<T, T2>;
export function sequence<T, T1, T2, T3>
    (v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
) : Validator<T, T3>;
export function sequence<T, T1, T2, T3, T4>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
) : Validator<T, T4>;
export function sequence<T, T1, T2, T3, T4, T5>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
) : Validator<T, T5>;
export function sequence<T, T1, T2, T3, T4, T5, T6>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
    , v6: Validator<T5, T6>
) : Validator<T, T6>;
export function sequence<T, T1, T2, T3, T4, T5, T6, T7>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
    , v6: Validator<T5, T6>
    , v7: Validator<T6, T7>
) : Validator<T, T7>;
export function sequence<T, T1, T2, T3, T4, T5, T6, T7, T8>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
    , v6: Validator<T5, T6>
    , v7: Validator<T6, T7>
    , v8: Validator<T7, T8>
) : Validator<T, T8>;
export function sequence<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
    , v6: Validator<T5, T6>
    , v7: Validator<T6, T7>
    , v8: Validator<T7, T8>
    , v9: Validator<T8, T9>
) : Validator<T, T9>;
export function sequence<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
(v1 : Validator<T, T1>
    , v2: Validator<T1, T2>
    , v3: Validator<T2, T3>
    , v4: Validator<T3, T4>
    , v5: Validator<T4, T5>
    , v6: Validator<T5, T6>
    , v7: Validator<T6, T7>
    , v8: Validator<T7, T8>
    , v9: Validator<T8, T9>
    , v10: Validator<T9, T10>
) : Validator<T, T10>;


