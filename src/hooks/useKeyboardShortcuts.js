import { useEffect } from 'react';

/**
 * Custom hook for search and filter keyboard shortcuts
 * @param {React.RefObject} searchInputRef - Ref to the search input element
 * @param {Function} onOpenFilters - Callback to open the filter modal
 */
const useKeyboardShortcuts = (searchInputRef, onOpenFilters, onToggleSidebar) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Search shortcut: /
            if (e.key === '/' && !e.altKey && !e.ctrlKey && !e.metaKey) {
                // Prevent if user is already typing in an input/textarea
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
                    return;
                }

                e.preventDefault();
                if (searchInputRef && searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }

            // Filter shortcut: Alt + /
            if (e.key === '/' && e.altKey) {
                e.preventDefault();
                if (onOpenFilters) {
                    onOpenFilters(true);
                }
            }

            // Sidebar toggle shortcut: Alt + \
            if (e.key === '\\' && e.altKey) {
                e.preventDefault();
                if (onToggleSidebar) {
                    onToggleSidebar();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchInputRef, onOpenFilters, onToggleSidebar]);
};

export default useKeyboardShortcuts;
