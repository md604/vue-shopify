import { QuotesApp } from './vue-section-quotes';

let activeApps = [];
const appTypeClass = [];

// register available app types classes
appTypeClass['vue-quotes'] = QuotesApp;  

window.theme.vue.availableApps.forEach(app => {
    if (appTypeClass[app.type]) {
        const newApp = new appTypeClass[app.type](app.id, app.data);
        activeApps.push(newApp);
        newApp.init();
    } else {
        console.log(`App "${app.type}" was not registered`);
    }
});

if (Shopify.designMode) {
    // editor mode helper function
    const registerNewApps = function(event) {
        const eventSectionId = event.detail.sectionId;
        event
        .target
        .querySelectorAll(`div[data-app-id="${eventSectionId}"]`)
        .forEach(appElement => {
            const appType = appElement.getAttribute('data-app-type');
            eval(document.getElementById(`${eventSectionId}-${appType}`).innerHTML);
        });
    }
    // Handle theme editor events
    document.addEventListener("shopify:section:load", event => {
        const eventSectionId = event.detail.sectionId;
        registerNewApps(event);
        window.theme.vue.availableApps.forEach(app => {
            // check if a new section has got apps
            if (app.id == eventSectionId) {
                // create instances for apps in the new section
                if (appTypeClass[app.type]) {
                    const newApp = new appTypeClass[app.type](app.id, app.data);
                    activeApps.push(newApp);
                    newApp.init();
                } else {
                    console.log(`App "${app.type}" was not registered`);
                }
            }
        });
    });
    document.addEventListener("shopify:section:unload", event => {
        const eventSectionId = event.detail.sectionId,
            newActiveApps = [],
            newAvailableApps = [];
        activeApps.forEach(app => {
            // check if a unloaded section had apps
            if (app.getSectionId() == eventSectionId) {
                // turn off and unmount apps from unloaded section
                app.kill();
            } else {
                // save untouched apps aside
                newActiveApps.push(app)
            }
        });
        window.theme.vue.availableApps.forEach(app => {
            // check if a unloaded section had apps
            if (app.id != eventSectionId) {
                // save untouched apps aside
                newAvailableApps.push(app)
            }
        });
        // reinit global app lists
        window.theme.vue.availableApps = newAvailableApps;
        activeApps = newActiveApps;
    });
}