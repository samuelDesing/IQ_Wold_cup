import axios from 'axios';

// URL base de la API, según el documento
const API_BASE_URL = 'https://intranetiq.site/partidos-bak/api';

export const uploadExcel = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/upload.php`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/get_stats.php`);
    return response.data;
};

export const getPredictions = async () => {
    const response = await axios.get(`${API_BASE_URL}/get_predictions.php`);
    return response.data;
};
