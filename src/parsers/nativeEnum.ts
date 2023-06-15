import { ZodNativeEnumDef } from "zod";

export type JsonSchema7NativeEnumType = {
  type: "string" | "number" | ["string", "number"];
  enum: (string | number)[];
};

export function parseNativeEnumDef(
  def: ZodNativeEnumDef
): JsonSchema7NativeEnumType {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key: string) => {
    const subKey = object[key];
    if (subKey === undefined) return false;
    return typeof object[subKey] !== "number";
  });

  const actualValues = actualKeys.map((key: string) => object[key]);

  const parsedTypes = Array.from(
    new Set(
      actualValues.map((values: string | number | undefined) => typeof values)
    )
  );

  return {
    type:
      parsedTypes.length === 1
        ? parsedTypes[0] === "string"
          ? "string"
          : "number"
        : ["string", "number"],
    enum: actualValues.filter((value) => value !== undefined) as (
      | string
      | number
    )[],
  };
}
