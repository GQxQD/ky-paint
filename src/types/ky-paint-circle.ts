import {KyPaintObjectOptions} from './ky-paint-object';

export interface KyPaintCircleOptions extends KyPaintObjectOptions {
    radius: number,
    fill?: string,
    stroke?: string,
}
