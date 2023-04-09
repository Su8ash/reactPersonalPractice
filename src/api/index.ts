import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = process.env.REACT_APP_URL || "https://gorest.co.in/public/v2/";




const apiCall = axios.create({
    baseURL: URL,

    headers: {
        Authorization: process.env.REACT_APP_TOKEN,
    },
});

export const addNewPost = async ({ title, body }: any) => {
    try {
        const { data } = await apiCall.post(`users/860485/posts`, {
            title,
            body,
        },);

        console.log(data);
        return data;
    } catch (error: any) {
        throw Error(error.response.statusText);
    }
}

//
export const fetchPosts = async (id: String | undefined) => {
    try {
        const response = await apiCall.get(`users/860485/posts?page=${id}`
        );
        return response;
    } catch (error) {
        throw Error("Unable to fetch data");
    }

}


//
export const fetchPost = async (id: String | undefined) => {
    try {
        const response = await apiCall.get(`posts/${id}`);
        return response;
    } catch (error) {
        throw Error("Unable to fetch data");
    }

}
