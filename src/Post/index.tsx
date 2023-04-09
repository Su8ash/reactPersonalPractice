import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../Home/home.css';
import { useNavigate, useParams } from 'react-router-dom';






const fetchPost = async (id: String | undefined) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
        return response;
    } catch (error) {
        throw Error("Unable to fetch data");
    }

}



const Post = () => {
    const { id } = useParams();

    console.log(id);

    const { data, isLoading, error, isError } = useQuery(["post", id],
        () => fetchPost(id), {
        keepPreviousData: true,
        onError: () => {
            alert("Error during data fetch");
        }
    });
    // console.log(data);

    return (
        <>
            {isLoading ? (<div>
                Loading
            </div>) :
                isError ? (
                    <div>

                    </div>
                ) :
                    (
                        <div>
                            <h1>Single Post</h1>
                            <div className='conatiner' key={data.data.id}>
                                <div className='container-row'>
                                    <div className='container-column'>
                                        <p>user: {data.data.user_id}</p>
                                        <h2>{data.data.title}</h2>
                                        <p>{data.data.body}</p>
                                    </div>

                                    <div>
                                        <p>{data.data.id}</p>
                                    </div>

                                </div>

                            </div>


                        </div>
                    )
            }
        </>
    )
}

export default Post