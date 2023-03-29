import { nonSerializableStore } from "../non-serializable-store";

export function QuickSaveFrame() {
    return <div class="flex flex-col justify-center items-center -my-2">
        <SaveButton />
        <LoadButton />
    </div>;
}

function SaveButton() {
    function onClick() {
        const ci = nonSerializableStore.ci;
        if (ci === null) {
            return;
        }

        ci.sendBackendEvent({
            type: "wc-trigger-event",
            event: "hand_savestate",
        });
    }

    return <div class="sidebar-button" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0
                 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565
                 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
    </div>;
}

function LoadButton() {
    function onClick() {
        const ci = nonSerializableStore.ci;
        if (ci === null) {
            return;
        }

        ci.sendBackendEvent({
            type: "wc-trigger-event",
            event: "hand_loadstate",
        });
    }

    return <div class="sidebar-button" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0
                 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565
                 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
    </div>;
}
