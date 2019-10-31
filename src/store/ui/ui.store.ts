import { createStore } from '@datorama/akita';

export const initialState = {
    isUploadingImages: false,
    uploadList: [],
    urlText: '',
    classifiedFileList: [],
    error: null,
} as UiState;

export const uiStore = createStore(initialState, { name: 'ui' });

/**
 * Denotes a file that the user wishes to classify.
 * @export
 * @interface UploadingFile
 */
export interface UploadingFile {
    name: string;
    isComplete: Boolean;
    isUploading: Boolean;
}

/**
 * Denotes a file that is already classfied by the
 * @export
 * @interface ClassifiedFile
 */
export interface ClassifiedFile {
    name: string;
    classification: PredictionResponse[];
    bestPrediction: PredictionResponse;
}

/**
 * Denotes a single Prediction record sent by the Colabel API.
 * @export
 * @interface PredictionResponse
 */
export interface PredictionResponse {
    score: number;
    label: string;
}

/**
 * Denotes the entire UI Data Store structure.
 * @export
 * @interface UiState
 */
export interface UiState {
    isUploadingImages: false,
    uploadList: UploadingFile[],
    urlText: string,
    classifiedFileList: ClassifiedFile[],
    error: AppError | null,
}

/**
 * Denotes an error thrown by the Application.
 * @export
 * @interface AppError
 */
export interface AppError {
    id: string,
    message: string,
}
