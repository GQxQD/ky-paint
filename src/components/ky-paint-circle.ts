import KyPaintObject from "./ky-paint-object";
import Point from "../utils/point";
import {KyPaintCircleOptions} from "../types/ky-paint-circle";

class KyPaintCircle extends KyPaintObject {
    private readonly options: KyPaintCircleOptions;

    public constructor(options: KyPaintCircleOptions) {
        const {x, y, radius} = options;
        super(x, y, radius * 2, radius * 2);
        this.options = options;
    }

    public draw(): void {
        const {fillStyle, strokeStyle} = this.ctx;
        const {x, y, radius, fill, stroke} = this.options;
        if (fill) {
            this.ctx.fillStyle = fill;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.fillStyle = fillStyle;
        }
        if (stroke) {
            this.ctx.strokeStyle = stroke;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
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

    public highlight(): void {
        const {strokeStyle} = this.ctx;
        const {x, y, radius} = this.options;
        this.ctx.strokeStyle = '#ffce19';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 1, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = 1;
    }

    public isHit(point: Point): boolean {
        const {x, y} = point;
        const {x: oX, y: oY, radius} = this.options;
        return Math.pow(x - oX, 2) + Math.pow(y - oY, 2) <= Math.pow(radius, 2);
    }

}

export default KyPaintCircle;
