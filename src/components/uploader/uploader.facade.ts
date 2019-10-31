import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Subscription } from 'rxjs';
// eslint-disable-next-line no-unused-vars
import { UploadingFile, uiStore } from '../../store/ui/ui.store';
import UiService from '../../store/ui/ui.service';
import { OnEmit, IsLink } from '../../common';
import { UploadingFiles$, UrlText$ } from '../../store/ui/ui.query';

/**
 * Facade state for Uploading part of the application
 * @export
 * @interface UploaderFacadeState
 */
export interface UploaderFacadeState {
    uploadingFiles: UploadingFile[]
    mode: string,
    urlsText: string,
    error: string | null,
}

/**
 * Facade for the Uploading part of the application
 * @export
 * @returns Facade and helper functions
 */
export function useUploaderFacade() {
    // parsing urls from the user to individual links.
    /**
     * Assigns the uploading file list by clearing the previous values.
     * @param {string} nameText
     */
    const setUploadingFiles = (nameText: string) => {
        UiService.SetURLText(nameText);
        const nameList = `${nameText}\n`!.split('\n')
            .map((line) => line.trim())
            .filter((line) => line !== '' && IsLink(line));
        UiService.SetUploadingFiles(
            nameList
                .filter((item, index, list) => list.indexOf(item) === index) // removing duplicates
                .map((name) => ({
                    name,
                    isComplete: false,
                    isUploading: false,
                } as UploadingFile)),
        );
    };

    /**
     * Status of an individual file upload
     * @param {UploadingFile} uploadingFile
     * @returns The status as a string
     */
    const uploadingFileStatus = (uploadingFile: UploadingFile) => {
        if (uploadingFile.isComplete) {
            return 'Classified ✓';
        }
        if (uploadingFile.isUploading) {
            return 'Uploading...';
        }
        return 'Ready for upload';
    };
    const [state, setState] = useState<UploaderFacadeState>({
        uploadingFiles: uiStore._value().uploadList,
        mode: 'urls',
        urlsText: uiStore._value().urlText,
        error: null,
    });
    const isComponentURLMode = () => state.mode === 'urls';

    // setup subscriptions for data flow
    useEffect(() => {
        const subscriptions: Subscription[] = [
            OnEmit<UploadingFile[]>(UploadingFiles$, (uploadingFiles) => setState((currentState) => ({ ...currentState, uploadingFiles }))),
            OnEmit<string>(UrlText$, (urlText) => setState((currentState) => ({ ...currentState, urlText }))),
        ];
        return () => {
            uiStore.update((currentState) => ({ ...currentState, urlsText: state.urlsText }));
            subscriptions.map((subscription) => subscription.unsubscribe());
        };
    }, []);

    return { state, setState, setUploadingFiles, uploadingFileStatus, isComponentURLMode };
}
