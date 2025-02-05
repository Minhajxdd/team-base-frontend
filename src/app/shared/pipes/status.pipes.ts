import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if(value === 'todo') {
        return 'Todo';
    } else if(value === 'progress') {
        return 'In Progress';
    } else if(value === 'done') {
        return 'Done';
    } else {
        return '';
    }
  }
}
