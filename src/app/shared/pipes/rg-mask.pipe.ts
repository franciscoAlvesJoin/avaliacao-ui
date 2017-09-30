import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rgMaskPipe' })
export class RgMaskPipe implements PipeTransform {
    transform(rg: string) {
    if (rg.length === 9) {
        rg = rg.slice(0, 2) + '.' +
        rg.slice(2, 5) + '.' +
        rg.slice(5, 8) + '-' + rg.slice(8, 9);
    }
      return rg;
    }
}
