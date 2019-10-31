import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Observable, Subscription } from 'rxjs';
import { URLs } from './constants';


/**
 * Helper function to bind a subscription to an observable.
 * @export
 * @template T
 * @param {Observable<T>} source$
 * @param {(value: T) => void} nextFn
 * @returns {Subscription}
 */
export function OnEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    // eslint-disable-next-line no-console
    return source$.subscribe(nextFn, console.error);
}

/**
 * Helper function to denote if a URL is a string or not.
 * @export
 * @param {string} text
 * @returns {boolean}
 */
export function IsLink(text: string): boolean {
    return text.startsWith('http') || text.startsWith('https');
}

/**
 * Helper function to extract the domain name from a URL.
 * @export
 * @param {string} url
 * @returns the domain name from the URL
 */
export function ExtractHostname(url: string) {
    return (((url.indexOf('//') > -1) ? url.split('/')[2] : url.split('/')[0]).split(':')[0]).split('?')[0];
}

/**
 * Helper method to call the Colabel API.
 * @export
 * @param {string} imageUrl
 * @returns The Axios POST promise.
 */
export function ImageURLClassifyPredictionPOST(imageUrl: string) {
    return axios.post(URLs.API.COLABEL_PREDICTION, { is_remote: true, file: imageUrl }, {
        headers: {
            crossorigin: true,
            Authorization: 'TOKEN <<TOKEN TOKEN TOKEN>>',
        },
    });
}
