import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  transform(value: any): string {
    if (value === 1) {
      return 'High';
    } else if (value === 2) {
      return 'Medium';
    } else if (value === 3) {
      return 'Low';
    }
    return '';
  }
}
