import PublicationsQueue from './PublicationsQueue';

export default interface Video {
    id: string;
    feed: any; // rest from adapter
    filepath: string;
    schedule: PublicationsQueue;
}