import { CompilerOptions, createPlatformFactory, NgModuleFactory, NgModuleRef, PlatformRef, Type } from '@angular/core';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { DOCUMENT } from '@angular/common';

const platformFactory = createPlatformFactory(platformCoreDynamic, 'consoleDynamic', [
  { provide: DOCUMENT, useValue: {} },
]);

export class BlessedPlatformRef extends PlatformRef {
  protected platform: PlatformRef = platformFactory();
  protected screen;

  bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>> {
    const bootstrapper = () => this.platform.bootstrapModuleFactory(moduleFactory, options);
    this.bootstrap(bootstrapper);
    return Promise.resolve(null);
  }

  bootstrapModule<M>(moduleType: Type<M>, compilerOptions?: (
    CompilerOptions & BootstrapOptions) | Array<CompilerOptions & BootstrapOptions>): Promise<NgModuleRef<M>> {
    const bootstrapper = () => this.platform.bootstrapModule(moduleType, compilerOptions);
    this.bootstrap(bootstrapper);
    return Promise.resolve(null);
  }

  protected bootstrap<M>(bootstrapper: () => Promise<NgModuleRef<M>>) {
    bootstrapper().then(() => {
    });
  }
}

export const platformBlessedDynamic = () => new BlessedPlatformRef();

