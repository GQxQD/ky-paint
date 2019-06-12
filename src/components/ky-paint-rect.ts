import KyPaintObject from './ky-paint-object';
import {KyPaintRectOptions} from '../types/ky-paint-rect';
import Point from '../utils/point';

class KyPaintRect extends KyPaintObject {
    protected readonly options: KyPaintRectOptions;

    public constructor(options: KyPaintRectOptions) {
        const {x, y, width, height} = options;
        super(x, y, width, height);
        this.options = options;
    }

    public draw(): void {
        const {fillStyle, strokeStyle} = this.ctx;
        const {x, y, width, height, fill, stroke, text} = this.options;
        if (fill) {
            this.ctx.fillStyle = fill;
            this.ctx.fillRect(x, y, width, height);
            this.ctx.fillStyle = fillStyle;
        }
        if (stroke) {
            this.ctx.strokeStyle = stroke;
            this.ctx.strokeRect(x, y, width, height);
            this.ctx.strokeStyle = strokeStyle;
        }
        if (text) {
            // this.ctx.textBaseline = 'bottom';
            const fontSize = 12;
            this.ctx.font = fontSize + 'px ' + this.fontFamily;
            const {width: textWidth} = this.ctx.measureText(text);
            this.ctx.fillText(text, (width - textWidth) / 2 + x, (height + fontSize * 0.7) / 2 + y);
        }
        if (this.isHighlight) {
            this.highlight();
        }
    }

    public isHit(point: Point): boolean {
        const {x, y} = point;
        const {x: minX, y: minY} = this.options;
        const maxX = minX + this.options.width;
        const maxY = minY + this.options.height;
        const isInZone = x >= minX && x <= maxX && y >= minY && y <= maxY;
        if (this.options.fill) {
            return isInZone;
        }
        return !(x >= (minX + 2) && x <= (maxX - 2) && y >= (minY + 2) && y <= (maxY - 2)) && isInZone;
    }

    public highlight(): void {
        const {strokeStyle, fillStyle} = this.ctx;
        const {x, y, width, height} = this.options;
        this.ctx.strokeStyle = this.hlStroke;
        this.ctx.strokeRect(x - 1, y - 1, width + 2, height + 2);
        this.ctx.strokeStyle = strokeStyle;
        if (this.options.fill) {
            this.ctx.fillStyle = this.hlFill;
            this.ctx.fillRect(x - 1, y - 1, width + 2, height + 2);
            this.ctx.fillStyle = fillStyle;
        }
    }
}

export default KyPaintRect;
