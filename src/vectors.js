export class Vector3 extends Float32Array {
    constructor() {
        super(3);
    }
    static FromValues(x, y, z) {
        let v = new Vector3();
        v.x = x;
        v.y = y;
        v.z = z;
        return v;
    }
    static FromArray(arr) {
        let v = new Vector3();
        v.set(arr, 0);
        return v;
    }
    static FromStringArray(arr, optionalCount, optionalDefault) {
        let vec = new Vector3();
        //make sure valid length
        if (arr.length < 3 - optionalCount || arr.length > 3) {
            console.error("Invalid string length for Vector%d %d with provided optional count %d, text %s", 3, arr.length, optionalCount, arr.join(" "));
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
            }
            else {
                vec[i] = optionalDefault;
            }
        }
        return vec;
    }
    get x() {
        return this[0];
    }
    set x(value) {
        this[0] = value;
    }
    get y() {
        return this[1];
    }
    set y(value) {
        this[1] = value;
    }
    get z() {
        return this[2];
    }
    set z(value) {
        this[2] = value;
    }
}
export class Vector4 extends Float32Array {
    constructor() {
        super(4);
    }
    static FromValues(x, y, z, w) {
        let v = new Vector4();
        v.x = x;
        v.y = y;
        v.z = z;
        v.w = w;
        return v;
    }
    static FromArray(arr) {
        let v = new Vector4();
        v.set(arr, 0);
        return v;
    }
    static FromStringArray(arr, optionalCount, optionalDefault) {
        let vec = new Vector4();
        //make sure valid length
        if (arr.length < 4 - optionalCount || arr.length > 4) {
            console.error("Invalid string length for Vector%d %d with provided optional count %d, text %s", 4, arr.length, optionalCount, arr.join(" "));
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
            }
            else {
                vec[i] = optionalDefault;
            }
        }
        return vec;
    }
    get x() {
        return this[0];
    }
    set x(value) {
        this[0] = value;
    }
    get y() {
        return this[1];
    }
    set y(value) {
        this[1] = value;
    }
    get z() {
        return this[2];
    }
    set z(value) {
        this[2] = value;
    }
    get w() {
        return this[3];
    }
    set w(value) {
        this[3] = value;
    }
}
