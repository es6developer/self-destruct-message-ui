import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'expiryTime' })

export class ExpiryTimePipe implements PipeTransform {
  transform(expiry: string) {
    var expiryTime = new Date(expiry).getTime();
    var now = new Date().getTime();
    var diffTime = expiryTime - now;
    var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    let text = "";
    if (days != 0) {
      text += `${days}d `
    }
    if (hours != 0) {
      text += `${hours}h `
    }
    if (minutes != 0) {
      text += `${minutes}m `
    }
    if (seconds) {
      text += `${seconds}s`
    }
    if (diffTime < 0) {
      return "Expired"
    }
    return text;

  }
}
