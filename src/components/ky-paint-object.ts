import Point from '../utils/point';
import KyPaint from '../ky-paint';
import Position from '../utils/position';
import {KyPaintObjectOptions} from '../types/ky-paint-object';

abstract class KyPaintObject {
    // 高亮边框颜色
    protected readonly hlStroke: string = '#70fff5';
    // 高亮填充颜色
    protected readonly hlFill: string = 'rgba(112,255,245,.2)';
    // 字体
    protected readonly fontFamily: string = 'msyh';
    protected options: KyPaintObjectOptions;
    private position: Position;
    protected paint: KyPaint;
    protected ctx: CanvasRenderingContext2D;
    protected isHighlight: boolean = false;

    protected constructor(x: number, y: number, width: number, height: number) {
        this.position = new Position(x, y, width, height);
    }

    setPaint(paint: KyPaint) {
        this.paint = paint;
        this.ctx = paint.getContext();
    };

    abstract draw(): void;

    abstract highlight(): void;

    abstract isHit(point: Point): boolean;

    public setHighlight(is: boolean) {
        this.isHighlight = is;
        this.paint.repaint();
    }

    public moveTo(point: Point) {
        this.position.x = point.x;
        this.position.y = point.y;
        this.options.x = point.x;
        this.options.y = point.y;
        this.paint.repaint();
    }

    public setPosition(position: Position) {
        this.position = position;
    }

    public getPosition() {
        return this.position;
    }
}

export default KyPaintObject;
