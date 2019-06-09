import KyPaintObject from "./ky-paint-object";
import {KyPaintRectOptions} from "../types/ky-paint-rect";
import Point from "../utils/point";

class KyPaintRect extends KyPaintObject {
    private readonly options: KyPaintRectOptions;

    public constructor(options: KyPaintRectOptions) {
        const {x, y, width, height} = options;
        super(x, y, width, height);
        this.options = options;
    }

    public draw(): void {
        const {fillStyle, strokeStyle} = this.ctx;
        const {x, y, width, height, fill, stroke} = this.options;
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
        if (this.isHighlight) {
            this.highlight();
        }
    }

    public moveTo(point: Point) {
        this.options.x = point.x;
        this.options.y = point.y;
        super.moveTo(point);
    }

    public isHit(point: Point): boolean {
        const {x, y} = point;
        const {x: minX, y: minY} = this.options;
        const maxX = minX + this.options.width;
        const maxY = minY + this.options.height;
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }

    public highlight(): void {
        const {strokeStyle, fillStyle} = this.ctx;
        const {x, y, width, height} = this.options;
        this.ctx.strokeStyle = '#70fff5';
        this.ctx.strokeRect(x - 1, y - 1, width + 2, height + 2);
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = 'rgba(112,255,245,.2)';
        this.ctx.fillRect(x - 1, y - 1, width + 2, height + 2);
        this.ctx.fillStyle = fillStyle;
    }
}

export default KyPaintRect;
