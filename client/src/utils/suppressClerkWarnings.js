/**
 * Suppress Clerk development warnings in development mode
 * Clerk warns about development keys and structural CSS, but these are expected in dev
 */
export const suppressClerkWarnings = () => {
  if (import.meta.env.DEV) {
    const originalWarn = console.warn;
    console.warn = function(...args) {
      const message = args[0]?.toString?.() || '';
      
      // Suppress Clerk development key warnings
      if (message.includes('Clerk has been loaded with development keys')) {
        return;
      }
      // Suppress structural CSS warnings
      if (message.includes('Structural CSS detected')) {
        return;
      }
      // Suppress code warnings
      if (message?.code === 'structural_css_pin_clerk_ui') {
        return;
      }
      
      // Call original console.warn for other messages
      originalWarn.apply(console, args);
    };
  }
};
