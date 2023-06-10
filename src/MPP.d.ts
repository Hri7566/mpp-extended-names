import type Client from "mppclone-client";

declare interface MPP {
    client: Client;
}

declare interface Tag {
    text: string;
    color: string;
}

declare interface User {
    _id: string; // user id
    name: string;
    color: string;
    tag?: Tag;
}

declare interface Participant extends User {
    id: string; // participant id (same as user id on mppclone)
}
