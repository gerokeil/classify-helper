import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Subscription } from 'rxjs';
// eslint-disable-next-line no-unused-vars
import { UploadingFile } from './ui.store';
import UiService from './ui.service';
import { OnEmit, IsLink } from '../../common';
import { UploadingFiles$ } from './ui.query';

export interface UploadingFilesFacadeState {
    uploadingFiles: UploadingFile[]
}
export function useUploadingFilesFacade() {
    const setUploadingFiles = (nameText: string) => {
        const nameList = `${nameText}\n`!.split('\n')
            .map((line) => line.trim())
            .filter((line) => line !== '' && IsLink(line));
        UiService.SetUploadingFiles(
            nameList.map((name) => ({
                name,
                isComplete: false,
                isUploading: false,
            } as UploadingFile)),
        );
    };
    const uploadingFileStatus = (uploadingFile: UploadingFile) => {
        if (uploadingFile.isComplete) {
            return 'Classified';
        }
        if (uploadingFile.isUploading) {
            return 'Uploading...';
        }
        return 'Ready for upload';
    };
    const [uploadingFilesState, setState] = useState<UploadingFilesFacadeState>({
        uploadingFiles: [],
    });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            OnEmit<UploadingFile[]>(UploadingFiles$, (uploadingFiles) => setState((currentState) => ({ ...currentState, uploadingFiles }))),
        ];
        return () => { subscriptions.map((subscription) => subscription.unsubscribe()); };
    }, []);

    return { uploadingFilesState, setUploadingFiles, uploadingFileStatus };
}
