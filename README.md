<h2 align="center">AssemblyScript SCALE Codec</h2>

**as-scale-codec** is AssemblyScript implementation of Polkadot Scale Codec.

Scale codec is used as a communication mechanism between Polkadot Host and Polkadot Runtime

# Supported types

<table>
<tr><th>Types support </th><th>Numeric types</th></tr>
<tr><td>

| Types | Support | Arrays | Support |
| ----- | :-----: | ------ | ------- |  
| Fixed width number |  <ul><li>- [x] Yes</li></ul>  | Int Array | <ul><li>- [x] Yes</li></ul> |
| Compact Int | <ul><li>- [x] Yes</li></ul> | Byte Array  | <ul><li>- [x] Yes</li></ul> |
| Byte | <ul><li>- [x] Yes</li></ul> | Bool Array | <ul><li>- [x] Yes</li></ul> |
| Bool | <ul><li>- [x] Yes</li></ul> | String Array | <ul><li>- [x] Yes</li></ul> |
| Hash | <ul><li>- [x] Yes</li></ul> | UInt128 Array | <ul><li>- [ ] In Progress</li></ul> |
| String | <ul><li>- [x] Yes</li></ul> |  |  |
</td><td>

| Numbers | Int | UInt |
| ------- | --- | ---- |
|8| <ul><li>- [x] Yes</li></ul>  | <ul><li>- [x] Yes</li></ul> |
|16| <ul><li>- [x] Yes</li></ul> | <ul><li>- [x] Yes</li></ul> |
|32| <ul><li>- [x] Yes</li></ul> | <ul><li>- [x] Yes</li></ul> |
|64| <ul><li>- [x] Yes</li></ul> | <ul><li>- [x] Yes</li></ul> |
|128| <ul><li>- [ ] No</li></ul>  | <ul><li>- [x] Yes</li></ul> |
</td></tr></table>

## Special Types

- **Compact Int** - [Documentation](https://substrate.dev/docs/en/knowledgebase/advanced/codec#compactgeneral-integers)

# Usage

```bash
npm install as-scale-codec
```

## Types

### Encoding

Every type has function **toU8a**. It encodes type value into an array of bytes

```jsx
import { Bool, Byte, ScaleString, Hash, CompactInt } from "as-scale-codec"
import { Int8, Int16, Int32, Int64 } from "as-scale-codec"
import { UInt8, UInt16, UInt32, UInt64, UInt128 } from "as-scale-codec"

// Bool
const scaleBool = new Bool(true);
scaleBool.toU8a() // => [0x01]

// Byte
const scaleByte = new Byte(0x01);
scaleByte.toU8a() // => [0x01]

// String
const scaleString = new ScaleString("a");
scaleString.toU8a() // => [0x04, 0x61] 

// Hash
const scaleHash = new Hash([0xff, 0x00, 0xab]);
scaleHash.toU8a() // => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

// Compact Int
const scaleCompactInt = new CompactInt(1);
scaleCompactInt.toU8a() // => [0x04]

// Int
const scaleInt8 = new Int8(-1);
scaleInt8.toU8a() // => [0xff]

const scaleInt16 = new Int16(-1);
scaleInt16.toU8a() // => [0xff, 0xff]

const scaleInt32 = new Int32(-1);
scaleInt32.toU8a() // => [0xff, 0xff, 0xff, 0xff]

const scaleInt64 = new Int64(-1);
scaleInt64.toU8a() // => [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

// UInt
const scaleUInt8 = new UInt8(1);
scaleUInt8.toU8a() // => [0x01]

const scaleUInt16 = new UInt16(1);
scaleUInt16.toU8a() // => [0x01, 0x00]

const scaleUInt32 = new UInt32(1);
scaleUInt32.toU8a() // => [0x01, 0x00, 0x00, 0x00]

const scaleUInt64 = new UInt64(1);
scaleUInt64.toU8a() // => [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

const scaleUInt128 = new UInt128(u128.fromU64(18446744073709551615));
scaleUInt128.toU8a() // => [0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
```

### Decoding

Every type has a **static** function **fromU8a**. It decodes an array of bytes to a desired type

```jsx
import { Bool, Byte, ScaleString, Hash, CompactInt } from "as-scale-codec"
import { Int8, Int16, Int32, Int64 } from "as-scale-codec"
import { UInt8, UInt16, UInt32, UInt64, UInt128 } from "as-scale-codec"

// Bool
Bool.fromU8a([0x01]); // => new Bool(true)

// Byte
Byte.fromU8a([0x01]); // => new Byte(0x01)

// String
Byte.fromU8a([0x04, 0x61]); // => new ScaleString('a')

// Hash
Hash.fromU8a([0xff, 0x00, 0xab]); 
// => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

// Compact Int
CompactInt.fromU8a([0x04]); // => new CompactInt(1)

// Int
Int8.fromU8a([0xff]); // => new Int8(-1)
Int16.fromU8a([0xff, 0xff]); // => new Int16(-1)
Int32.fromU8a([0xff, 0xff, 0xff, 0xff]); // => new Int32(-1)
Int64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]); // => new Int64(-1)

// UInt
UInt8.fromU8a([0x01]); // => new UInt8(1)
UInt16.fromU8a([0x01, 0x00]); // => new UInt16(1)
UInt32.fromU8a([0x01, 0x00, 0x00, 0x00]); // => new UInt32(1)
UInt64.fromU8a([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]); // => new UInt64(1)
UInt128.fromU8a([0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
// => 340282366920938463444927863358058659840
```

## Arrays

### Encoding

Every array has function **toU8a**. It encodes array values into an array of bytes

```jsx
import { BoolArray, ByteArray, IntArray, StringArray } from "as-scale-codec"

// Bool Array
const boolArray = new BoolArray([true, false, true]);
boolArray.toU8a(); // => [0x0c, 0x01, 0x00, 0x01]

// Byte Array
const byteArray = new ByteArray([0x01, 0x01, 0x01]);
byteArray.toU8a(); // => [0x0c, 0x01, 0x01, 0x01]

// Int Array
const intArray = new IntArray([16384, 2, 3, 4]);
intArray.toU8a() // => [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]

// String Array
const stringArray = new StringArray(["hello", "world"]);
stringArray.toU8a() // => [0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64]
```

### Decoding

Every array has a **static** function **fromU8a**. It decodes an array of bytes to an array of desired types

```jsx
import { BoolArray, ByteArray, IntArray, StringArray } from "as-scale-codec"

// Bool Array
BoolArray.fromU8a([0x0c, 0x01, 0x00, 0x01]); 
// => new BoolArray([true, false, true])

// Byte Array
ByteArray.fromU8a([0x0c, 0x01, 0x01, 0x01])
// => new ByteArray([0x01, 0x01, 0x01])

// Int Array
IntArray.fromU8a([0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10])
// => new IntArray([16384, 2, 3, 4])

// String Array
StringArray.fromU8a([0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64])
// => new StringArray(["hello", "world"])
```

# Miscellaneous

### Convert bytes to hash

```jsx
Hash.bytesToHash([0xff, 0x00, 0xab]); 
// => [0x00, ... , 0x00, 0xff, 0x00, 0xab] (32 bytes long)

Hash.bytesToHash([0xff, 0x00, ..., 0x00]); // (32 bytes long)
// => [0xff, ... , 0x00] (32 bytes long)
```

# T**ests**

In order to run the tests one perform

```bash
npm run test
```