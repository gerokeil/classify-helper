import { arrayAdd, arrayUpdate } from '@datorama/akita';
// eslint-disable-next-line no-unused-vars
import { AxiosResponse } from 'axios';
import uuid from 'uuid';
// eslint-disable-next-line no-unused-vars
import { uiStore, UploadingFile, PredictionResponse, ClassifiedFile, UiState } from './ui.store';
import { ImageURLClassifyPredictionPOST } from '../../common';

/**
 * Add a file into the upload file list.
 * @param {UploadingFile} uploadingFile
 */
function AddUploadingFile(uploadingFile: UploadingFile) {
  uiStore.update((state) => ({
    uploadList: arrayAdd(state.uploadList, uploadingFile),
  }));
}

/**
 * Clears the upload file list.
 */
function ClearUploadingFileList() {
  uiStore.update(() => ({
    uploadList: [],
  }));
}

/**
 * Cleats the classified file list.
 */
function ClearClassifiedFileList() {
  uiStore.update(() => ({
    classifiedFileList: [],
  }));
}

/**
 * Updates the URL text value with a given text.
 * @param {string} urlText
 */
function SetURLText(urlText: string) {
  uiStore.update((currentState) => ({ ...currentState, urlText }));
}

/**
 * Replaces the Upload file list with a given list.
 * @param {UploadingFile[]} fileList
 */
function SetUploadingFiles(fileList: UploadingFile[]) {
  uiStore.update({ uploadList: fileList });
}

/**
 * Calls Colabel API for prediction and then populates the classified files list from the result.
 */
function UploadFiles() {
  const { uploadList } = uiStore._value();
  const compareWith = (uploadFile: { name: string }) => (file: { name: string }) => file.name === uploadFile.name;
  uploadList.forEach((uploadFile) => {
    uiStore.update((currentState) => ({
      ...currentState,
      uploadList: arrayUpdate<UploadingFile[]>(currentState.uploadList, compareWith(uploadFile), { isUploading: true }),
    }));
    ImageURLClassifyPredictionPOST(uploadFile.name)
      .then((response: AxiosResponse<{ predictions: PredictionResponse[] }>) => {
        const round = (num: number) => Math.round(parseFloat(num.toFixed(4)));
        const bestPrediction = response.data.predictions.reduce((prev, curr) => ((round(curr.score) > round(prev.score)) ? curr : prev), response.data.predictions[0]);
        const newClassifiedFile: ClassifiedFile = { name: uploadFile.name, classification: response.data.predictions, bestPrediction };
        // If already available, update the classification. If not then add it to the list.
        const classificationAction = uiStore._value().classifiedFileList.some((file) => file.name === uploadFile.name)
          ? (currentState: UiState) => arrayUpdate<ClassifiedFile[]>(currentState.classifiedFileList, compareWith(uploadFile), newClassifiedFile)
          : (currentState: UiState) => arrayAdd<ClassifiedFile[]>(currentState.classifiedFileList, newClassifiedFile);
        // Update flags showing upload progress and the classified data.
        uiStore.update((currentState) => ({
          ...currentState,
          classifiedFileList: classificationAction(currentState),
          uploadList: arrayUpdate<UploadingFile[]>(currentState.uploadList, compareWith(uploadFile), { isUploading: false, isComplete: true }),
        }));
      })
      .finally(() => {
        uiStore.update((currentState) => ({
          ...currentState,
          uploadList: arrayUpdate<UploadingFile[]>(currentState.uploadList, compareWith(uploadFile), { isUploading: false }),
        }));
      })
      .catch((error: Error) => {
        let { message } = error;
        if (message.indexOf('401') > -1) {
          message = `${message}. Please add an authentication token for the API.`;
        }
        if (message.indexOf('Network') > -1) {
          message = `${message}. Please ensure that a CORS everywhere extenstion for your browser is enabled.`;
        }
        uiStore.update((currentState) => ({ ...currentState, error: { id: uuid.v4(), message } }));
      });
  });
}

const UiService = {
  AddUploadingFile, ClearUploadingFileList, SetUploadingFiles, UploadFiles, SetURLText, ClearClassifiedFileList,
};

export default UiService;
