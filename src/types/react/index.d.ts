/**
 * Declarações mínimas de React usadas pelo projeto.
 *
 * O ambiente de desenvolvimento original não tinha acesso ao registro npm
 * para instalar @types/react; estas declarações cobrem a API utilizada e
 * mantêm o type-check estrito do restante do código. Ao instalar
 * @types/react e @types/react-dom, esta pasta pode ser removida.
 */
declare module 'react' {
  export type ReactNode = ReactElement | string | number | boolean | null | undefined | Iterable<ReactNode>;
  export interface ReactElement {
    type: unknown;
    props: unknown;
    key: string | null;
  }
  export type Key = string | number;
  export type SetStateAction<S> = S | ((prev: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export interface RefObject<T> {
    current: T;
  }
  export type FC<P = object> = (props: P) => ReactNode;
  export interface Context<T> {
    Provider: FC<{ value: T; children?: ReactNode }>;
  }
  export function useState<S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useCallback<T extends (...args: never[]) => unknown>(fn: T, deps: readonly unknown[]): T;
  export function useRef<T>(initial: T): RefObject<T>;
  export function useId(): string;
  export function useContext<T>(ctx: Context<T>): T;
  export function createContext<T>(defaultValue: T): Context<T>;
  export const Fragment: FC<{ children?: ReactNode; key?: Key }>;
  export const StrictMode: FC<{ children?: ReactNode }>;
}

declare module 'react-dom/client' {
  import type { ReactNode } from 'react';
  export interface Root {
    render(node: ReactNode): void;
    unmount(): void;
  }
  export function createRoot(el: Element): Root;
}

declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare namespace JSX {
  type Element = import('react').ReactElement;
  interface ElementChildrenAttribute {
    children: unknown;
  }
  interface IntrinsicAttributes {
    key?: string | number;
  }
  /** Componentes podem retornar qualquer ReactNode (React 18+). */
  type ElementType = string | ((props: any) => import('react').ReactNode); // eslint-disable-line @typescript-eslint/no-explicit-any
  interface SyntheticEvent {
    preventDefault(): void;
    stopPropagation(): void;
    target: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    currentTarget: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    key?: string;
  }
  type Handler = (e: SyntheticEvent) => void;
  interface IntrinsicProps {
    onClick?: Handler;
    onSubmit?: Handler;
    onChange?: Handler;
    onKeyDown?: Handler;
    // Demais atributos HTML/SVG não são tipados detalhadamente aqui.
    [attr: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  interface IntrinsicElements {
    [elemName: string]: IntrinsicProps;
  }
}
