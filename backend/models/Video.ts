import PublicationsQueue from './PublicationsQueue';
import Integration from "./Integration";

export default interface Video {
    id: string;
    feed: any; // rest from adapter
    filepath: string;
    schedule: PublicationsQueue;
    integration: Integration,
    queued: boolean
}