/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { Subscription } from 'rxjs';
import { ClassifiedFile, initialState, PredictionResponse } from '../../store/ui/ui.store';
import { OnEmit } from '../../common';
import { ClassifiedFiles$ } from '../../store/ui/ui.query';
import UiService from '../../store/ui/ui.service';

export interface ClassifiedImagesFacadeState {
    /**
     * Facade state for Classified images.
     * @type {ClassifiedFile[]}
     * @memberof ClassifiedImagesFacadeState
     */
    classifiedImages: ClassifiedFile[]
}

/**
 * ClassifiedImages Facade for state manipulation and helper functions.
 * @export Function
 * @returns Facade
 */
export function useClassifiedImagesFacade() {
    const [state, setState] = useState<ClassifiedImagesFacadeState>({
        classifiedImages: initialState.classifiedFileList,
    });
    const getFormalLabelName = (predictionResponse: PredictionResponse) => {
        if (predictionResponse.label === 'kitchen') { return 'Kitchen'; }
        if (predictionResponse.label === 'bathroom') { return 'Bathroom'; }
        if (predictionResponse.label === 'living_room') { return 'Living Room'; }
        if (predictionResponse.label === 'dining_room') { return 'Dining Room'; }
        if (predictionResponse.label === 'bedroom') { return 'Bedroom'; }
        return '';
    };
    useEffect(() => {
        const subscriptions: Subscription[] = [
            OnEmit<ClassifiedFile[]>(ClassifiedFiles$, (files) => setState((currentState) => ({ ...currentState, classifiedImages: files }))),
        ];
        return () => { subscriptions.map((subscription) => subscription.unsubscribe()); };
    }, []);
    const clearList = UiService.ClearClassifiedFileList;
    return { state, setState, getFormalLabelName, clearList };
}
