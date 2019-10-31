import { createQuery } from '@datorama/akita';
// eslint-disable-next-line no-unused-vars
import { Observable } from 'rxjs';
import { ToastsStore } from 'react-toasts';
// eslint-disable-next-line no-unused-vars
import { uiStore, UploadingFile, ClassifiedFile, AppError } from './ui.store';

export const uiQuery = createQuery(uiStore);
/**
 * Queries for data flow from the store.
 */
export const UploadingFiles$: Observable<UploadingFile[]> = uiStore._select((state) => state.uploadList);
export const ClassifiedFiles$: Observable<ClassifiedFile[]> = uiStore._select((state) => state.classifiedFileList);
export const UrlText$: Observable<string> = uiStore._select((state) => state.urlText);
export const Error$: Observable<AppError | null> = uiStore._select((state) => state.error);

/**
 * Errors are handled asyncronously and directly as they appear.
 * All errors have to have a unique ID in them.
 */
Error$.subscribe((error) => {
    if (error) {
        ToastsStore.error(error!.message);
    }
});
