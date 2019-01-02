import { BaseIsaValidator } from '../isa';
import { IsaValidator } from '../base';

export interface FunctionIsaValidator extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run<T>(proc : Function, ...args : any[]) : T;
}

export function isFunction // this version just does typeof === 'function'
    ()
: FunctionIsaValidator;
export function isFunction
    <TR>
    (r : IsaValidator<TR>)
: FunctionIsaValidator;
export function isFunction
    <T1, TR>
    (p1 : IsaValidator<T1>, r : IsaValidator<TR>)
: FunctionIsaValidator;
export function isFunction
    <T1, T2, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, r : IsaValidator<TR>)
: FunctionIsaValidator;
export function isFunction
    <T1, T2, T3, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, r : IsaValidator<TR>)
: FunctionIsaValidator;
export function isFunction
    <T1, T2, T3, T4, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, r : IsaValidator<TR>)
: FunctionIsaValidator;
export function isFunction
    <T1, T2, T3, T4, T5, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, p5 : IsaValidator<T5>, r : IsaValidator<TR>)
: FunctionIsaValidator;

export function functionType
    <TR>
    (proc: Function, r : IsaValidator<TR>)
: Function;
export function functionType
    <T1, TR>
    (proc: Function, p1 : IsaValidator<T1>, r : IsaValidator<TR>)
: Function;
export function functionType
    <T1, T2, TR>
    (proc: Function, p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, r : IsaValidator<TR>)
: Function;
export function functionType
    <T1, T2, T3, TR>
    (proc: Function, p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, r : IsaValidator<TR>)
: Function;

export function signature
<T, TR>
(r : IsaValidator<TR>)
: TypedPropertyDescriptor<T> | void;
export function signature
<T, T1, TR>
(p1: IsaValidator<T1>, r : IsaValidator<TR>)
: TypedPropertyDescriptor<T> | void;
