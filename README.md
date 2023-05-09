# obj-lib

A simple package i made for parsing .obj files. It can read files and return vertices, faces, normals and texture coordinates. 

> This library CANNOT parse mtllibs

> This library can only parse triangulated meshes

## Example

    import {Model} from "obj-lib"

    const A_MODEL = `//3d model`

    const m = Model.fromSrc(A_MODEL)

    console.log(m.vertices)
    console.log(m.normals)
    console.log(m.UVs)
    console.log(m.indices)