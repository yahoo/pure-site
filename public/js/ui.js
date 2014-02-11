YUI().use('node-base', 'gallery-affix', 'gallery-scrollspy', function (Y) {
    var sidebar  = Y.one('.sidebar'),
        layout   = Y.one('#layout'),
        menu     = Y.one('#menu'),
        menuLink = Y.one('#menuLink');

    // Create Affix (Fixes the sidebar as you scroll)
    // Doing an if check here because we don't include a sidebar if there are
    // no section headings.
    if (sidebar) {
        sidebar.plug(Y.Plugin.Affix, {
            offset: {
                top: 190
            }
        });

        // Plugin Scrollspy (Updates the sidebar with the current section heading)
        Y.one('body').plug(Y.Plugin.ScrollSpy, {
            target: sidebar,
            activeClass: 'sidebar-list-item-active'
        });
    }

    // Toggle the main site menu
    menuLink.on('click', function (e) {
        var active = 'active';
        e.preventDefault();
        layout.toggleClass(active);
        menu.toggleClass(active);
        menuLink.toggleClass(active);
    });
});
