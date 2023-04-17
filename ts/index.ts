import { Model } from "./model";

export class OBJFile {
    public Models: Array<Model>;

    constructor() {
        this.Models = new Array<Model>();
    }
}