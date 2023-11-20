import BaseService from '@/lib/axios/BaseService';

export const endpoint = {
  base: 'check',
  getStrategy: 'strategy',
  create: '/create'
} as const;

interface TStrategy {
  arg: {
    name: string;
    age: number;
  };
}

class GenerateService extends BaseService {
  async getStrategy() {
    return await this.request.get('https://jsonplaceholder.typicode.com/posts');
  }
  async createStrategy(_: string, body: TStrategy) {
    try {
      return await this.post(body.arg, endpoint.create);
    } catch (error) {
      return error;
    }
  }
}

const generateService = new GenerateService({
  baseEndpoint: endpoint.base
});

export default generateService;
