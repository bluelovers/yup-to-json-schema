import yupToJsonSchema from "../src";
import { object, string, number } from "yup";

describe("object type conversion", () => {
  test("simple object conversion", () => {
    expect(yupToJsonSchema(object())).toStrictEqual({
      type: "object"
    });
  });

  test("object with properties", () => {
    expect(
      yupToJsonSchema(object({ name: string(), age: number() }))
    ).toStrictEqual({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" }
      }
    });
  });

  test("object with required properties", () => {
    expect(
      yupToJsonSchema(object({ name: string().required(), age: number() }))
    ).toStrictEqual({
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        age: { type: "number" }
      }
    });
  });

  test("object with description and examples", () => {
    expect(yupToJsonSchema(object({ name: string().required(), age: number() }).meta({ description: "test user", example: { name: 'David', age: 32 } }))).toStrictEqual({
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        age: { type: "number" }
      },
      description: "test user",
      examples: [{ name: 'David', age: 32 }]
    });
  });
});
