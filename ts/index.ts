import { Model } from "./model";
export { Model } from "./model"
export { Vector3, Vector4 } from "./vectors"

export class OBJFile {
    public Model: Model;

    constructor() {
        this.Model = new Model();
    }

    public static fromSrc(src: string): OBJFile {
        let f = new OBJFile();
        f.Model = Model.FromSrc(src)
        return f
    }
}