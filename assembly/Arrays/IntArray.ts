import { CompactInt } from "../Int/CompactInt";
import { AbstractArray } from "./AbstractArray";

import { DecodedData } from "../interfaces/DecodedData";

export class IntArray extends AbstractArray<CompactInt, i64> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u64> {
        const compactInt = CompactInt.fromU8a(value);

        return new DecodedData<u64>(
            compactInt.value,
            compactInt.encodedLength()
        )
    }

    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): IntArray {
        return AbstractArray.fromU8a<IntArray>(input);
    }
}
