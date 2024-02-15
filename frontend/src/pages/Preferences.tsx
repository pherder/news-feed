import React, {useEffect, useState} from 'react';
import ApiClient from "../client/ApiClient";
import Select from 'react-select';

interface PreferredItem {
    [key: string]: number;
}

interface FeedSettings {
    preferredSources: PreferredItem;
    preferredAuthors: PreferredItem;
    preferredCategories: PreferredItem;
}

interface UserFeedSettings {
    preferredSources: number[];
    preferredAuthors: number[];
    preferredCategories: number[];
}

const Preferences: React.FC = () => {
    const [possibleSettings, setPossibleSettings] = useState<FeedSettings>({
        preferredSources: {},
        preferredAuthors: {},
        preferredCategories: {},
    });

    const [userSettings, setUserSettings] = useState<UserFeedSettings>({
        preferredSources: [],
        preferredAuthors: [],
        preferredCategories: [],
    });

    const [feedback, setFeedback] = useState({message: '', type: ''});
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        ApiClient.getUserFeedSettings()
            .then(response => {
                setUserSettings(response);
            });
    }, []);

    useEffect(() => {
        ApiClient.getAvailableFeedSettings()
            .then(response => {
                setPossibleSettings(response);
            });
    }, []);

    const handleSelectChange = (selectedOptions, settingType: keyof FeedSettings) => {
        setShowFeedback(false);
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setUserSettings(prevSettings => ({
            ...prevSettings,
            [settingType]: values,
        }));
    };

    const saveSettings = () => {
        ApiClient.setUserFeedSettings(userSettings)
            .then(() => {
                setFeedback({message: 'Settings saved successfully!', type: 'alert-success'});
                setShowFeedback(true);
            })
            .catch(() => {
                setFeedback({message: 'Error saving settings.', type: 'alert-danger'});
                setShowFeedback(true);
            });
    };

    const makeOptions = (setting: PreferredItem) => Object.keys(setting).map(key => ({
        label: key,
        value: setting[key],
    }));

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header fw-bold">Edit your feed preferences</div>
                        <div className="card-body">
                            {showFeedback && (
                                <div className={`alert ${feedback.type}`} role="alert">
                                    {feedback.message}
                                </div>
                            )}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                saveSettings();
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="preferredSources" className="form-label">Preferred Sources:</label>
                                    <Select
                                        id="preferredSources"
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={makeOptions(possibleSettings.preferredSources).filter(option => userSettings.preferredSources.includes(option.value))}
                                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'preferredSources')}
                                        options={makeOptions(possibleSettings.preferredSources)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preferredAuthors" className="form-label">Preferred Authors:</label>
                                    <Select
                                        id="preferredAuthors"
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={makeOptions(possibleSettings.preferredAuthors).filter(option => userSettings.preferredAuthors.includes(option.value))}
                                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'preferredAuthors')}
                                        options={makeOptions(possibleSettings.preferredAuthors)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preferredCategories" className="form-label">Preferred
                                        Categories:</label>
                                    <Select
                                        id="preferredCategories"
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={makeOptions(possibleSettings.preferredCategories).filter(option => userSettings.preferredCategories.includes(option.value))}
                                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'preferredCategories')}
                                        options={makeOptions(possibleSettings.preferredCategories)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Save Preferences</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
