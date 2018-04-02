import { RequestBodyObject } from 'openapi3-ts';
import CompiledSchema from './CompiledSchema';
import ChowError from '../error';

export default class CompiledRequestBody {
  private compiledSchemas: {
    [key: string]: CompiledSchema;
  };
  private required: boolean;

  constructor(requestBody: RequestBodyObject) {
    this.compiledSchemas = Object.keys(requestBody.content).reduce((compiled: any, mediaType: string) => {
      compiled[mediaType] = new CompiledSchema(requestBody.content[mediaType].schema);
      return compiled;
    }, {});
    this.required = !!requestBody.required;
  }

  public validate(mediaType: string, value: any) {
    if (this.required && !value) {
      throw new ChowError('Missing required body', { in: 'Request Body', name: '' });
    }
    if (!this.required && !value) {
      return;
    }
    if (!this.compiledSchemas[mediaType]) {
      throw new ChowError(`Unsupported mediaType: ${mediaType}`, { in: 'Request Body', name: 'media types'});
    }

    this.compiledSchemas[mediaType].tryValidate(value);
  }
}
