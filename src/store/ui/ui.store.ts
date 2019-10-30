import { createStore } from '@datorama/akita';

const initialState = {
    isUploadingImages: false,
    uploadList: [],
} as UiState;

export const uiStore = createStore(initialState, { name: 'ui' });

export interface UploadingFile {
    name: string;
    isComplete: Boolean;
    isUploading: Boolean;
}

export interface UiState {
    isUploadingImages: false,
    uploadList: UploadingFile[],
}
