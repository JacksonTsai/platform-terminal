// import { platformTerminalDynamic } from 'platform-terminal/';
import { platformTerminalDynamic } from '../../platform-terminal/src/public_api';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformTerminalDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
