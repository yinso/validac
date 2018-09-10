import { IsaValidator } from './isa';

export function isOneOf<T1>(v1 : IsaValidator<T1>) : IsaValidator<T1>;
export function isOneOf<T1, T2>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    )
: IsaValidator<T1 | T2>;
export function isOneOf<T1, T2, T3>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    )
: IsaValidator<T1 | T2 | T3>;
export function isOneOf<T1, T2, T3, T4>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    )
: IsaValidator<T1 | T2 | T3 | T4>;
export function isOneOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5>;
export function isOneOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    , v9: IsaValidator<T9>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    , v9: IsaValidator<T9>
    , v10: IsaValidator<T10>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function isAllOf<T1>
    (v1 : IsaValidator<T1>)
: IsaValidator<T1>;
export function isAllOf<T1, T2>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    )
: IsaValidator<T1 & T2>;
export function isAllOf<T1, T2, T3>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    )
: IsaValidator<T1 & T2 & T3>;
export function isAllOf<T1, T2, T3, T4>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    )
: IsaValidator<T1 & T2 & T3 & T4>;
export function isAllOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5>;
export function isAllOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    , v9 : IsaValidator<T9>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    , v9 : IsaValidator<T9>
    , v10 : IsaValidator<T10>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
