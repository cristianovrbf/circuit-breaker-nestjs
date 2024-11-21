import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CircuitBreaker,
  CircuitBreakerOptions,
} from '../providers/circuit-breaker';

export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreaker: CircuitBreaker;

  constructor() {
    let circuitBreakerOpts: CircuitBreakerOptions = {
      successThreshold: 1,
      failureThreshold: 5,
      openStateTime: 100
    };

    this.circuitBreaker = new CircuitBreaker(circuitBreakerOpts);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return this.circuitBreaker.exec(next);
  }
}
