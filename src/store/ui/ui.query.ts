import { createQuery } from '@datorama/akita';
// eslint-disable-next-line no-unused-vars
import { Observable } from 'rxjs';
// eslint-disable-next-line no-unused-vars
import { uiStore, UploadingFile } from './ui.store';

export const uiQuery = createQuery(uiStore);

export const UploadingFiles$: Observable<UploadingFile[]> = uiStore._select((state) => state.uploadList);
