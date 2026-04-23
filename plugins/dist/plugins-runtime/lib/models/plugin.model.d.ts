import { EventsMap } from '../../../../plugin-types/index.d.ts';
export type RegisterListener = <K extends keyof EventsMap>(type: K, event: (arg: EventsMap[K]) => void, props?: {
    [key: string]: unknown;
}) => symbol;
