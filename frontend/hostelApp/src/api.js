import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/v1';

export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/users/register`, userData);
};

export const loginUser = (userData) => {
    return axios.post(`${API_BASE_URL}/users/login`, userData, {
        withCredentials: true,  // <-- Ensure credentials are included
    });
}

export const logoutUser = () => {
    return axios.post(`${API_BASE_URL}/users/logout`,{},{
        withCredentials: true,
    })
}

export const changePassword = (userData) => {
    return axios.post(`${API_BASE_URL}/users/change-password`, userData, {
        withCredentials: true,
    });
}

export const getAllHostels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hostels/get-all-hostels`, {
        withCredentials: true, // Include cookies in the request
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching hostels:', error.response ? error.response.data : error.message);
      throw error;
    }
};

export const getCurrentUser = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/users/get-current-user`, {
            withCredentials: true, // Include cookies in the request
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching hostels:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/* changes */

export const postHostel = async (formData) => {
    return axios.post(`${API_BASE_URL}/hostels/post-hostel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
};

export const getPostedHostels = async () => {
    return axios.get(`${API_BASE_URL}/hostels/get-all-posted-hostels`, {
        withCredentials: true, // Include cookies in the request
    });
}

export const getSingleHostel = async (id) => {
    return axios.get(`${API_BASE_URL}/hostels/get-single-hostel/${id}`, {
        withCredentials: true,
    });
}

export const postReview = async (reviewData, id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reviews/post-reviews/${id}`, reviewData, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.log('Error posting review:', error);
    }
};

export const getReviews = async(id) => {
    return axios.get(`${API_BASE_URL}/reviews/get-all-reviews/${id}`,{
        withCredentials: true,
    });
}

export const getAverageHostelRating = async(id) => {
    return axios.get(`${API_BASE_URL}/reviews/get-average-rating/${id}`, {
        withCredentials: true,
    });
}
/* changes */
export const uploadHostelPhotos = async(id) => {
    await axios.post(`${API_BASE_URL}/hostels/${id}/photos`, )
}