import { Vector3, Vector4 } from "./vectors";
export class Model {
    constructor() {
        this.vertices = new Array();
        this.indices = new Array();
        this.UVsReference = new Array();
        this.NormalsReference = new Array();
        this.UVs = new Array();
        this.Normals = new Array();
        this.DefferredFaces = new Array();
    }
    static FromSrc(src) {
        let m = new Model();
        //loop over all lines in source
        src.split("\n").forEach((lineContent, lineIndex) => {
            //check for comment on line, if there is code before the line, use it for the next step
            const commentIndex = lineContent.indexOf("#");
            if (commentIndex > -1) {
                let code = this.HandleComment(lineContent);
                if (code != null) {
                    lineContent = code; //set lineContent to code
                }
                else {
                    return; //go to next line, not using continue becuase foreach uses anonymous function
                }
            }
            //switch based on the type of the line
            const split = lineContent.trim().split(" ");
            switch (split[0]) {
                case "v": { //vertex, position is vector4
                    m.HandleVertex(split.slice(1));
                    break;
                }
                case "vt": { //texture coordinate as vector3
                    m.HandleUV(split.slice(1));
                    break;
                }
                case "vn": {
                    m.HandleNormal(split.slice(1));
                    break;
                }
                case "vp": {
                    console.log("parameter space vertex detected, not implemented becuase i dont understand what it does");
                    break;
                }
                case "f": {
                }
            }
        });
        return m;
    }
    //parses comment line, if there is a string before, return it, otherwise null
    static HandleComment(line) {
        let cleanedLine = line.split("#")[0].trim();
        return cleanedLine.length > 0 ? cleanedLine : null;
    }
    //parses vertex code, if valid, pushes it to vertices
    HandleVertex(splitLine) {
        if (splitLine[0] == "v")
            splitLine = splitLine.slice(1);
        let vec = Vector4.FromStringArray(splitLine, 1, 1);
        if (vec != null)
            this.vertices.push(vec);
    }
    //parses texture coordinate code, if valid pushes it to UVsReference
    HandleUV(splitLine) {
        if (splitLine[0] == "vt")
            splitLine = splitLine.slice(1);
        let vec = Vector3.FromStringArray(splitLine, 2, 0);
        if (vec != null)
            this.UVsReference.push(vec);
    }
    //parses normal code, if valid pushes to NormalsReference
    HandleNormal(splitLine) {
        if (splitLine[0] == "vn")
            splitLine = splitLine.slice(1);
        let vec = Vector3.FromStringArray(splitLine, 0, 0);
        if (vec != null)
            this.NormalsReference.push(vec);
    }
    //defers face for processing once all other things have been resolved
    DeferFace(splitLine) {
        if (splitLine[0] == "f")
            splitLine = splitLine.slice(1);
        let f = {
            VertexIndices: new Array(),
            NormalIndices: new Array(),
            UVIndices: new Array(),
        };
        if (splitLine.length < 3) {
            console.error("Cannot form a face from less than 3 vertices");
            return;
        }
        for (let pointIndex = 0; pointIndex < splitLine.length; pointIndex++) {
            const splitPoint = splitLine[pointIndex].trim().split("/");
            switch (splitPoint.length) {
                case 3: {
                    const normIndex = Number(splitPoint[2]);
                    if (Number.isNaN(normIndex)) {
                        console.error("Unable to convert normal index %s to number", splitPoint[2]);
                        return;
                    }
                    f.NormalIndices.push(normIndex);
                    //fall
                }
                case 2: {
                    let uvIndex = Number(splitPoint[1]);
                    if (Number.isNaN(uvIndex)) {
                        uvIndex = 0;
                    }
                    f.UVIndices.push(uvIndex - 1); //subtract 1 becuase texture coord indices start from 1 in file but will start from 0 in an array
                    //fall
                }
                case 1: {
                    const vertIndex = Number(splitPoint[0]);
                    if (Number.isNaN(vertIndex)) {
                        console.error("Unable to convert vertex index %s to number", splitPoint[0]);
                        return;
                    }
                    f.VertexIndices.push(vertIndex);
                    //fall
                }
            }
        }
    }
}
