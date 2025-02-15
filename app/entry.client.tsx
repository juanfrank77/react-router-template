import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18n from "./localization/i18n";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next/client";

async function hydrate() {
    await i18next
        .use(initReactI18next) // Tell i18next to use react-i18next
        .use(LanguageDetector) // Setup a client-side language detector
        .use(Backend) // Setup your backend
        .init({
            ...i18n, // Your i18next configuration
            ns: getInitialNamespaces(), // Detects the namespaces used in the initial render
            backend: {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
            },
            detection: {
                // Here only enable htmlTag detection, we'll detect the language only
                // server-side with remix-i18next, by using the `<html lang>` attribute
                // we can communicate to the client the language detected by the server
                order: ["htmlTag"],
                // Because we only use htmlTag, there's no reason to cache the language
                // detected by the browser, so we disable it
                caches: []
            },
        })
    
    startTransition(() => {
        hydrateRoot(
            document,
            <I18nextProvider i18n={i18next}>
                <StrictMode>
                    <HydratedRouter />
                </StrictMode>
            </I18nextProvider>
        );
    })
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
} else {
    // Safari doesn't support requestIdleCallback yet
    window.setTimeout(hydrate, 1);
}