import { MediaTypeObject } from 'openapi3-ts';
import CompiledSchema from './CompiledSchema';
import ChowError from '../error';

export default class CompiledMediaType {
  private name: string;
  private compiledSchema: CompiledSchema;

  constructor(name: string, mediaType: MediaTypeObject) {
    this.name = name;
    this.compiledSchema = new CompiledSchema(mediaType.schema);
  }

  public validate(value: any) {
    this.compiledSchema.tryValidate(value);
  }
}
