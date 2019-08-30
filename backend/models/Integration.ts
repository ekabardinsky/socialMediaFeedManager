import Account from './Account';

export default interface Integration {
    id: string;
    sourceAccount: Account;
    sourceChannel: any; // rest from adapter
    lastSyncTime: bigint;
    targetAccount: Account;
}