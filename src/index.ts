import type { MPP } from "./MPP";
import type { Participant } from "./MPP";
const MPP = (globalThis as any).MPP as MPP;

let customBackground = `#777`;

MPP.client.on("hi", msg => {
    customBackground = msg.u.color;

    MPP.client.sendArray([
        {
            m: "+custom"
        }
    ]);
});

export interface ExtendedNameMessage {
    m: "extname";
    background: string;
}

export interface ExtendedParticipant extends Participant {
    custom: {
        hasExtName: boolean;
        background: string;
    };
}

const setupParticipant = (p: Participant) => {
    const ext = p as ExtendedParticipant;

    if (!ext.custom) {
        ext.custom = {
            hasExtName: true,
            background: p.color
        };
    }
};

MPP.client.on("custom", msg => {
    if (typeof msg.data !== "object") return;
    if (msg.data.m !== "m") return;
});

MPP.client.on("ch", msg => {
    MPP.client.sendArray([
        {
            m: "custom",
            data: {
                m: "extname",
                background: customBackground
            } as ExtendedNameMessage,
            target: {
                mode: "subscribed",
                global: false
            }
        }
    ]);
});
