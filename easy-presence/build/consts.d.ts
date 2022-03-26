interface ActivityTimestamps {
    start?: Date | number;
    end?: Date | number;
}
interface ActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}
interface ActivityParty {
    id?: string;
    size?: [number, number];
}
interface button {
    label: string;
    url: string;
}
/**
 * @see https://discord.com/developers/docs/game-sdk/activities
 */
export interface Activity {
    details: string;
    state: string;
    timestamps?: ActivityTimestamps;
    assets?: ActivityAssets;
    party?: ActivityParty;
    buttons?: [button] | [button, button];
    instance?: boolean;
}
export interface ResponseActivity extends Activity {
    name: string;
    application_id: string;
    type: number;
}
export interface DiscordEnvironment {
    config: {
        cdn_host: string;
        api_endpoint: string;
        environment: string;
    };
    /**
     * The user logged into the connected Discord client.
     * @see https://discord.com/developers/docs/resources/user
    */
    user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
        bot: false;
        flags: number;
        premium_type: number;
    };
}
export declare enum IPCOpcode {
    HANDSHAKE = 0,
    FRAME = 1,
    CLOSE = 2,
    PING = 3,
    PONG = 4
}
export {};
