// Ambient declaration so side-effect CSS imports (react-grid-layout / react-resizable
// stylesheets) type-check under `noUncheckedSideEffectImports`. The bundler (Vite)
// handles the actual CSS at runtime; TypeScript only needs the module to exist.
declare module "*.css" {
  const content: string;
  export default content;
}
