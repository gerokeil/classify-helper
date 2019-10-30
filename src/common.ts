// eslint-disable-next-line no-unused-vars
import { Observable, Subscription } from 'rxjs';

export function OnEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    // eslint-disable-next-line no-console
    return source$.subscribe(nextFn, console.error);
}

export function IsLink(text: string): boolean {
    return text.startsWith('http') || text.startsWith('https');
}

export function ExtractHostname(url: string) {
    return (((url.indexOf('//') > -1) ? url.split('/')[2] : url.split('/')[0]).split(':')[0]).split('?')[0];
}
