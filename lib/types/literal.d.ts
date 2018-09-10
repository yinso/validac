import { IsaValidator, isa } from '../isa';

export function isLiteral<T extends string>(value : T, typeName ?: string) : IsaValidator<T>;
export function isLiteral<T extends number>(value : T, typeName ?: string) : IsaValidator<T>;
export function isLiteral<T extends boolean>(value : T, typeName ?: string) : IsaValidator<T>;
export function isLiteral<T extends null>(value : T, typeName ?: string) : IsaValidator<T>;
export function isLiteral<T extends undefined>(value : T, typeName ?: string) : IsaValidator<T>;

export function convertLiteral<T extends string>(value : T, typeName ?: string) : IsaValidator<T>;
export function convertLiteral<T extends number>(value : T, typeName ?: string) : IsaValidator<T>;
export function convertLiteral<T extends boolean>(value : T, typeName ?: string) : IsaValidator<T>;
export function convertLiteral<T extends null>(value : T, typeName ?: string) : IsaValidator<T>;
export function convertLiteral<T extends undefined>(value : T, typeName ?: string) : IsaValidator<T>;
