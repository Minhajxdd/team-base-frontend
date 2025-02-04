import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidUtils {
  generateUUID = (() => {
    const buffer = new Uint8Array(16);
    
    return function() {
      const timestamp = Date.now();
      const view = new DataView(buffer.buffer);
      
      view.setFloat64(0, timestamp, false);
      
      crypto.getRandomValues(buffer.subarray(8));
      
      buffer[6] = (buffer[6] & 0x0f) | 0x40;
      buffer[8] = (buffer[8] & 0x3f) | 0x80;
      
      return Array.from(buffer, (byte, i) => {
        return byte.toString(16).padStart(2, '0') + 
          ((i === 4 || i === 6 || i === 8 || i === 10) ? '-' : '');
      }).join('');
    };
  })();
}
