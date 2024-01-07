/**
 * Enum 값들 중 하나인지 확인하는 함수.
 *
 * @param value - 검증하려는 값.
 * @param enumValues - Enum의 values로 이루어진 배열.
 * @returns {boolean} 값이 Enum에 속하면 true, 그렇지 않으면 false 반환.
 *
 * @example
 * ```typescript
 * enum Season {
 * SPRING = '봄',
 * SUMMER = '여름',
 * FALL = '가을',
 * WINTER = '겨울',
 * }
 * isInEnum("겨울", Object.values(Season)) -> true
 * ```
 */
const isInEnum = (value: string, enumValues: string[]): boolean => {
  return enumValues.includes(value);
};

export default isInEnum;
