import { SchemaObject } from 'openapi3-ts';
import * as Ajv from 'ajv';
import * as betterAjvErrors from 'better-ajv-errors';
import ajv from './ajv';
import ChowError from '../error';

const noop: Ajv.ValidateFunction = (data: any) => {
  return true;
}

export default class CompiledSchema {
  private schemaObject?: SchemaObject;
  private validator: Ajv.ValidateFunction;

  constructor(schema?: SchemaObject, opts?: Ajv.Options) {
    this.schemaObject = schema;
    this.validator = schema ? ajv(opts).compile(schema) : noop;
  }

  public tryValidate(value: any) {
    const valid = this.validator(value);
    if (!valid) {
      const errorsStr = betterAjvErrors(this.schemaObject, value || {}, this.validator.errors!, { format: 'cli', indent: 2 });
      throw new Error("Schema validation error: " + errorsStr);
    }
  }
}
