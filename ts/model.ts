import { Vector3, Vector4 } from "./vectors"

type RawFace = {
    VertexIndices: Array<number>,
    UVIndices: Array<number>,
    NormalIndices: Array<number>,
}

export class Model {

    public vertices: Array<Vector4>;
    public indices: Array<number>;


    public UVs: Array<Vector3>;
    public Normals: Array<Vector3>;

    //all the normals and UVs in order, will be resolved into Normals later in face code
    private UVsReference: Array<Vector3>;
    private NormalsReference: Array<Vector3>;

    private DefferredFaces: Array<RawFace>;

    constructor() {
        this.vertices = new Array<Vector4>();
        this.indices = new Array<number>();

        this.UVsReference = new Array<Vector3>();
        this.NormalsReference = new Array<Vector3>();

        this.UVs = new Array<Vector3>();
        this.Normals = new Array<Vector3>();

        this.DefferredFaces = new Array<RawFace>();
    }

    public static FromSrc(src: string): Model {
        let m = new Model();

        //loop over all lines in source
        src.split("\n").forEach(
            (lineContent: string, lineIndex: number) => {

                //check for comment on line, if there is code before the line, use it for the next step
                const commentIndex = lineContent.indexOf("#");
                if (commentIndex > -1) {
                    let code = this.HandleComment(lineContent);
                    if (code != null) {
                        lineContent = code;//set lineContent to code
                    } else {
                        return;//go to next line, not using continue becuase foreach uses anonymous function
                    }
                }


                //switch based on the type of the line
                const split = lineContent.trim().split(" ");
                switch (split[0]) {
                    case "v": {//vertex, position is vector4
                        m.HandleVertex(split.slice(1));
                        break;
                    }
                    case "vt": {//texture coordinate as vector3
                        m.HandleUV(split.slice(1))
                        break;
                    }
                    case "vn": {
                        m.HandleNormal(split.slice(1))
                        break;
                    }
                    case "vp": {
                        console.log("parameter space vertex detected, not implemented becuase i dont understand what it does");
                        break;
                    }
                    case "f": {
                        m.DeferFace(split)
                        break;
                    }
                }
            }
        )

        m.ProcessDeferredFaces();
        return m;
    }

    //parses comment line, if there is a string before, return it, otherwise null
    private static HandleComment(line: string): string | null {
        let cleanedLine = line.split("#")[0].trim();
        return cleanedLine.length > 0 ? cleanedLine : null;
    }

    //parses vertex code, if valid, pushes it to vertices
    private HandleVertex(splitLine: Array<string>) {
        if (splitLine[0] == "v") splitLine = splitLine.slice(1);

        let vec = Vector4.FromStringArray(splitLine, 1, 1);
        if (vec != null) this.vertices.push(vec)
    }

    //parses texture coordinate code, if valid pushes it to UVsReference
    private HandleUV(splitLine: Array<string>) {
        if (splitLine[0] == "vt") splitLine = splitLine.slice(1);

        let vec = Vector3.FromStringArray(splitLine, 2, 0);
        if (vec != null) this.UVsReference.push(vec);
    }

    //parses normal code, if valid pushes to NormalsReference
    private HandleNormal(splitLine: Array<string>) {
        if (splitLine[0] == "vn") splitLine = splitLine.slice(1);

        let vec = Vector3.FromStringArray(splitLine, 0, 0);
        if (vec != null) this.NormalsReference.push(vec)
    }

    //defers face for processing once all other things have been resolved
    private DeferFace(splitLine: Array<string>) {
        if (splitLine[0] == "f") splitLine = splitLine.slice(1);

        let f: RawFace = {
            VertexIndices: new Array<number>(),
            NormalIndices: new Array<number>(),
            UVIndices: new Array<number>(),
        }

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

                    f.NormalIndices.push(normIndex - 1)//subtract 1 becuase texture coord indices start from 1 in file but will start from 0 in an array
                    //fall
                }
                case 2: {
                    let uvIndex = Number(splitPoint[1]);
                    if (Number.isNaN(uvIndex)) {//optional, default to 0
                        uvIndex = 0;
                    }
                    f.UVIndices.push(uvIndex - 1);//subtract 1 becuase texture coord indices start from 1 in file but will start from 0 in an array
                    //fall
                }
                case 1: {
                    const vertIndex = Number(splitPoint[0]);
                    if (Number.isNaN(vertIndex)) {
                        console.error("Unable to convert vertex index %s to number", splitPoint[0]);
                        return;
                    }
                    f.VertexIndices.push(vertIndex - 1);//subtract 1 becuase texture coord indices start from 1 in file but will start from 0 in an array
                    //fall
                }
            }
        }

        let triangles = this.TriangulateFace(f);
        if (triangles === null) return


        //add faces to array
        this.DefferredFaces.push(...triangles)
    }

    //processes deferred faces
    private ProcessDeferredFaces() {
        for (let i = 0; i < this.DefferredFaces.length; i++) {
            const currentFace = this.DefferredFaces[i];//will be a triangle becuase the faces are trianulated before being sent to defferredfaces

            //add vertex indices to array, i dont need to process them further
            this.indices.push(...currentFace.VertexIndices)

            for (let pointIndex = 0; pointIndex < 3; pointIndex++) {
                //get indices
                const UVIndex = currentFace.UVIndices[pointIndex];
                const NormalIndex = currentFace.NormalIndices[pointIndex];

                //resolve indices, and push to list
                this.UVs.push(this.UVsReference[UVIndex]);
                this.Normals.push(this.NormalsReference[NormalIndex]);
            }
        }
    }

    private TriangulateFace(f: RawFace): Array<RawFace> | null {
        if (f.NormalIndices.length != 3 || f.UVIndices.length != 3 || f.VertexIndices.length != 3) {
            console.error("Face is not triangles, not implemented")
            //todo implement some algorithm to split face into triangles

            return null
        }
        return [f]
    }
}