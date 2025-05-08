import { getHintUtils } from "@epic-web/client-hints";
import { clientHint as colorSchemeHint, subscribeToSchemeChange } from "@epic-web/client-hints/color-scheme";
import { clientHint as reducedMotionHint, subscribeToMotionChange } from "@epic-web/client-hints/reduced-motion";
import { clientHint as timezoneHint } from "@epic-web/client-hints/time-zone";
import { useEffect } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import { Route } from "../+types/root";

export const { getHints, getClientHintCheckScript } = getHintUtils({
    theme: colorSchemeHint,
    timezone: timezoneHint,
    reducedMotion: reducedMotionHint,
})

//Utility function used to get the time zone for the current users browser on the server or the client
export function getTimeZone() {
    const hints = getHints()
    return hints?.timezone
}

//Utility function used to get the client hints for the current users browser.
export function useHints() {
    const requestInfo = useLoaderData<Route.ComponentProps["loaderData"]>();
    return requestInfo?.hints;
}

//Utility component used to check the client hints on the client and send them to the server
export function ClientHintCheck({ nonce }: { nonce?: string }) {
    const { revalidate } = useRevalidator()

    useEffect(() => {
        subscribeToSchemeChange(() => revalidate())
    }, [revalidate])

    useEffect(() => {
        subscribeToMotionChange(() => revalidate())
    }, [revalidate])

    return (
        <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
                __html: getClientHintCheckScript(),
            }}
        />
    )
}

