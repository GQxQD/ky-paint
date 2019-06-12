import {KyPaintObjectOptions} from './ky-paint-object';

export interface KyPaintRectOptions extends KyPaintObjectOptions {
    width: number,
    height: number,
    fill?: string,
    stroke?: string,
}
