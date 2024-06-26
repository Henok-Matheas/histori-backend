import { History, TempHistory } from "./history.model";

export async function createTempHistoryRepo({
    _id,
    title,
    country,
    start_year,
    end_year,
    content,
    categories,
    sources,
    image_url }) {
    try {
        const tempHistory = new TempHistory({
            _id,
            title,
            country,
            start_year,
            end_year,
            content,
            categories,
            sources,
            image: image_url
        });

        await tempHistory.save();

        return tempHistory;
    } catch (error) {
        throw error;
    }
}

export async function updateTempHistoryRepo({
    _id,
    title,
    country,
    start_year,
    end_year,
    content,
    categories,
    sources,
    image_url }) {
    try {
        const tempHistory = await TempHistory.findByIdAndUpdate(_id, {
            title,
            country,
            start_year,
            end_year,
            content,
            categories,
            sources,
            image: image_url
        });

        return tempHistory;
    } catch (error) {
        throw error;
    }
}

export async function deleteTempHistoryRepo({ _id }) {
    try {
        const tempHistory = await TempHistory.findByIdAndDelete(_id);

        return tempHistory;
    } catch (error) {
        throw error;
    }
}

export async function getTempHistoryRepo({ _id }) {
    try {
        const tempHistory = await TempHistory.findById(_id);

        return tempHistory;
    } catch (error) {
        throw error;
    }
}

export async function updateHistoryRepo({
    _id,
    title,
    country,
    start_year,
    end_year,
    content,
    categories,
    sources,
    image_url }) {
    try {
        const tempHistory = await History.findByIdAndUpdate(_id, {
            title,
            country,
            start_year,
            end_year,
            content,
            categories,
            sources,
            image: image_url
        });

        return tempHistory;
    } catch (error) {
        throw error;
    }
}