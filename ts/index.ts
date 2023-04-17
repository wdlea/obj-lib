import { Model } from "./model";

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