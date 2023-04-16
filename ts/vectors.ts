export class Vector3 extends Float32Array {
    constructor() {
        super(3);
    }

    public static FromValues(x: number, y: number, z: number): Vector3 {
        let v = new Vector3();
        v.x = x;
        v.y = y;
        v.z = z;

        return v;
    }
    public static FromArray(arr: Float32Array): Vector3 {
        let v = new Vector3();
        v.set(arr, 0);
        return v;
    }
    public static FromStringArray(arr: Array<string>, optionalCount: number, optionalDefault: number): Vector3 | null {
        let vec = new Vector3();


        //make sure valid length
        if (arr.length < 3 - optionalCount || arr.length > 3) {
            console.error("Invalid string length for Vector%d %d with provided optional count %d, text %s", 3, arr.length, optionalCount, arr.join(" "))
            return null;
        }

        for (let i = 0; i < 3; i++) {
            if (i < arr.length) {
                const num = Number(arr[i]);
                if (Number.isNaN(num)) {
                    console.error("Unable to convert %s to number", arr[i]);
                    return null;
                }
                vec[i] = num;
            } else {
                vec[i] = optionalDefault;
            }
        }
        return vec;
    }

    public get x() {
        return this[0];
    }
    public set x(value: number) {
        this[0] = value;
    }
    public get y() {
        return this[1];
    }
    public set y(value: number) {
        this[1] = value;
    }
    public get z() {
        return this[2];
    }
    public set z(value: number) {
        this[2] = value;
    }
}

export class Vector4 extends Float32Array {
    constructor() {
        super(4);
    }

    public static FromValues(x: number, y: number, z: number, w: number): Vector4 {
        let v = new Vector4();
        v.x = x;
        v.y = y;
        v.z = z;
        v.w = w;

        return v;
    }

    public static FromArray(arr: Float32Array): Vector4 {
        let v = new Vector4();
        v.set(arr, 0);
        return v;
    }
    public static FromStringArray(arr: Array<string>, optionalCount: number, optionalDefault: number): Vector4 | null {
        let vec = new Vector4();


        //make sure valid length
        if (arr.length < 4 - optionalCount || arr.length > 4) {
            console.error("Invalid string length for Vector%d %d with provided optional count %d, text %s", 4, arr.length, optionalCount, arr.join(" "))
            return null;
        }

        for (let i = 0; i < 4; i++) {
            if (i < arr.length) {
                const num = Number(arr[i]);
                if (Number.isNaN(num)) {
                    console.error("Unable to convert %s to number", arr[i]);
                    return null;
                }
                vec[i] = num;
            } else {
                vec[i] = optionalDefault;
            }
        }
        return vec;
    }

    public get x() {
        return this[0];
    }
    public set x(value: number) {
        this[0] = value;
    }
    public get y() {
        return this[1];
    }
    public set y(value: number) {
        this[1] = value;
    }
    public get z() {
        return this[2];
    }
    public set z(value: number) {
        this[2] = value;
    }
    public get w() {
        return this[3];
    }
    public set w(value: number) {
        this[3] = value;
    }
}