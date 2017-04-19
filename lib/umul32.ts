/* Lower 32-bits of multiplication of two uint32 values a * b.
 */
export function umul32_lo(a: number, b: number): number {
    let a00 = a & 0xFFFF;
    let a16 = a >>> 16;
    let b00 = b & 0xFFFF;
    let b16 = b >>> 16;

    let c00 = a00 * b00;
    let c16 = c00 >>> 16;

    c16 += a16 * b00;
    c16 &= 0xFFFF;
    c16 += a00 * b16;

    let lo = c00 & 0xFFFF;
    let hi = c16 & 0xFFFF;

    return ((hi << 16) | lo) >>> 0;
}

/* Higher 32-bits of multiplication of two uint32 values a * b.
 */
export function umul32_hi(a: number, b: number): number {
    let a00 = a & 0xFFFF;
    let a16 = a >>> 16;
    let b00 = b & 0xFFFF;
    let b16 = b >>> 16;

    let c00 = a00 * b00;

    let c16 = c00 >>> 16;
    c16 += a00 * b16;
    let c32 = c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a16 * b00;

    c32 += c16 >>> 16;
    let c48 = c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;

    let lo = c32 & 0xFFFF;
    let hi = c48 & 0xFFFF;

    return ((hi << 16) | lo) >>> 0;
}
