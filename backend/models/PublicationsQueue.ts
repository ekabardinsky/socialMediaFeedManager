import Video from "./Video";

interface Publication {
    comment: string;
    type: string; // rest from adapter
}

export default interface PublicationsQueue {
    id: string;
    publication: Publication;
    video: Video;
    account: Account;
    date: bigint;
    published: boolean;
    failureMessage: string;
    metadata: any; // rest from adapter
}