declare module "three" {
  // Minimal Object3D base with add(...) used by Scene / Mesh / Camera
  export class Object3D {
    constructor();
    add(...objects: any[]): void;
    position: { x: number; y: number; z: number };
  }

  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    lerp(v: Vector2, alpha: number): Vector2;
    copy(v: Vector2): Vector2;
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
  }

  export class Scene extends Object3D {
    constructor();
  }

  export class OrthographicCamera extends Object3D {
    position: { z: number };
    constructor(
      left: number,
      right: number,
      top: number,
      bottom: number,
      near?: number,
      far?: number
    );
  }

  export class WebGLRenderer {
    // domElement is a canvas so width/height are available
    domElement: HTMLCanvasElement & {
      width?: number;
      height?: number;
      parentElement?: HTMLElement | null;
    };
    constructor(params?: any);
    setPixelRatio(n: number): void;
    setSize(w: number, h: number, updateStyle?: boolean): void;
    getPixelRatio(): number;
    dispose(): void;
    render(scene: Scene, camera: any): void;
  }

  export class PlaneGeometry {
    constructor(width: number, height: number);
    dispose(): void;
  }

  export class Mesh extends Object3D {
    constructor(geometry?: any, material?: any);
  }

  export class ShaderMaterial {
    constructor(parameters?: any);
    dispose(): void;
  }

  export class Clock {
    constructor();
    getElapsedTime(): number;
  }

  // keep other exports permissive
  export const MeshBasicMaterial: any;
  export const Texture: any;
  export const Color: any;
  export const NearestFilter: any;
}
