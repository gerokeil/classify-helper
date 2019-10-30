import { arrayAdd } from '@datorama/akita';
// eslint-disable-next-line no-unused-vars
import { uiStore, UploadingFile } from './ui.store';

function AddUploadingFile(uploadingFile: UploadingFile) {
  uiStore.update((state) => ({
    uploadList: arrayAdd(state.uploadList, uploadingFile),
  }));
}
function ClearUploadingFileList() {
  uiStore.update(() => ({
    uploadList: [],
  }));
}

function SetUploadingFiles(fileList: UploadingFile[]) {
  uiStore.update({ uploadList: fileList });
}

const UiService = {
  AddUploadingFile, ClearUploadingFileList, SetUploadingFiles,
};

export default UiService;
