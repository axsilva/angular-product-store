import { TestBed } from '@angular/core/testing';

import { ToastApi } from './toast-api';

describe('ToastApi', () => {
  let service: ToastApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
