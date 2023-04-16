import { Vector3, Vector4 } from "./vectors";
export class Model {
    constructor() {
        this.vertices = new Array();
        this.indices = new Array();
        this.UVs = new Array();
        this.Normals = new Array();
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
                case "vt": {
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
    //parses texture coordinate code, if valid pushes it to UVs
    HandleUV(splitLine) {
        if (splitLine[0] == "vt")
            splitLine = splitLine.slice(1);
        let vec = Vector3.FromStringArray(splitLine, 2, 0);
        if (vec != null)
            this.UVs.push(vec);
    }
}
