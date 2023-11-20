import BaseService from '@/lib/axios/BaseService';
import { ExtralTrategies } from '../feature/Table/Table';

export const endpoint = {
  base: 'strategy',
  stop: '/stop',
  liquidate: '/update/liquidate',
  start: '/start',
  get: '/get'
} as const;

export interface ILiveStrategy extends ExtralTrategies {
  userId: string;
  strategyId: string;
}

class StrategyService extends BaseService {
  async startStrategy(body: ILiveStrategy) {
    return await this.post(body, endpoint.start);
  }

  async stopStrategy(userId: string, strategyId: string) {
    return await this.post({ userId, strategyId }, endpoint.stop);
  }

  async getStrategies() {
    return await this.get<ExtralTrategies[]>(endpoint.get);
  }
}

const strategyService = new StrategyService({
  baseEndpoint: endpoint.base
});

export default strategyService;
