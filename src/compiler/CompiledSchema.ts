import { SchemaObject } from 'openapi3-ts';
import { ValidateFunction } from 'ajv';
import * as betterAjvErrors from 'better-ajv-errors';
import ajv from './ajv';

const noop: ValidateFunction = (data: any) => {
  return true;
}

export default class CompiledSchema {
  private schemaObject?: SchemaObject;
  private validator: ValidateFunction;

  constructor(schema?: SchemaObject) {
    this.schemaObject = schema;
    this.validator = schema ? ajv.compile(schema) : noop;
  }

  public validate(value: any) {
    const valid = this.validator(value);
    if (!valid) {
      const errors = betterAjvErrors(this.schemaObject, value || '', this.validator.errors!, { format: 'js', indent: 2 });
      throw errors;
    }
  }
}