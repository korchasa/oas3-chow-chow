import { OperationObject, ParameterObject, RequestBodyObject } from 'openapi3-ts';
import CompiledParameter from './CompiledParameter';
import CompiledRequestBody from './CompiledRequestBody'
import CompiledResponse from './CompiledResponse';
import { RequestMeta, ResponseMeta } from '.';
import ChowError from '../error';

export default class CompiledOperation {
  private header: {
    [key: string]: CompiledParameter;
  } = {};
  private query: {
    [key: string]: CompiledParameter;
  } = {};
  private path: {
    [key: string]: CompiledParameter;
  } = {};
  private cookie: {
    [key: string]: CompiledParameter;
  } = {};
  private body?: CompiledRequestBody;
  private response: {
    [key: string]: CompiledResponse;
  } = {};

  constructor(operation: OperationObject) {
    const parameters = !!operation.parameters ? [...operation.parameters] : []
    for (const parameter of parameters as ParameterObject[]) {
      switch(parameter.in) {
        case 'header':
          this.header = {
            ...this.header,
            [parameter.name]: new CompiledParameter(parameter)
          };
          break;
        case 'query':
          this.query = {
            ...this.query,
            [parameter.name]: new CompiledParameter(parameter)
          };
          break;
        case 'path':
          this.path = {
            ...this.path,
            [parameter.name]: new CompiledParameter(parameter)
          };
          break;
        case 'cookie':
          this.cookie = {
            ...this.cookie,
            [parameter.name]: new CompiledParameter(parameter)
          };
          break;
        default:
          throw new ChowError(`Unsupported Paramter Location`, { in: parameter.in, name: ''})
      } 
    }

    if (operation.requestBody) {
      this.body = new CompiledRequestBody(operation.requestBody as RequestBodyObject);
    }

    this.response = Object.keys(operation.responses).reduce((compiled: any, status: string) => {
      compiled[status] = new CompiledResponse(operation.responses[status]);
      return compiled;
    }, {});
  }

  public validateRequest(request: RequestMeta) {
    for (const key in this.header) {
      this.header[key].validate(request.header && request.header[key]);
    }

    for (const key in this.query) {
      this.query[key].validate(request.query && request.query[key]);
    }

    for (const key in this.path) {
      this.path[key].validate(request.path && request.path[key]);
    }

    for (const key in this.cookie) {
      this.cookie[key].validate(request.cookie && request.cookie[key]);
    }

    if (this.body) {
      this.body.validate(request.header && request.header['content-type'], request.body);
    }
  }

  public validateResponse(response: ResponseMeta) {
    const compiledResponse = this.response[response.status] || this.response['default'];
    if (compiledResponse) {
      compiledResponse.validate(response);
    } else {
      throw new ChowError('Unsupported Response Status Code', { in: 'Response', name: '' });
    }
  }
}
