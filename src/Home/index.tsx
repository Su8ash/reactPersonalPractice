import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './home.css';
import { useNavigate, useParams } from 'react-router-dom';






const fetchPosts = async (id: String | undefined) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users/836888/posts?page=${id}`);
        return response;
    } catch (error) {
        throw Error("Unable to fetch data");
    }

}



const Home = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    console.log(id);

    const { data, isLoading, error, isError } = useQuery(["posts", id],
        () => fetchPosts(id), {
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

                            <div className='container-row'>
                                <button
                                    disabled={data.headers['x-links-previous'] ? false : true}
                                    onClick={() => {
                                        // console.log(data.request);
                                        // console.log(data.headers['x-links-next'] != null);
                                        if (data.headers['x-links-previous']) {
                                            // console.log(data.headers['x-links-previous']);
                                            navigate(`/${Number(id) - 1}`);
                                        }
                                    }}>Previous</button>
                                <button onClick={() => {
                                    if (data.headers['x-links-next'])
                                        navigate(`/${Number(id) + 1}`);
                                }}>Next</button>
                            </div>

                            {
                                data?.data.map((post: any, index: number) => {
                                    return (
                                        <div className='conatiner' key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                                            <div className='container-row'>
                                                <div className='container-column'>
                                                    <p>user: {post.user_id}</p>
                                                    <h2>{post.title}</h2>
                                                    <p>{post.body}</p>
                                                </div>

                                                <div>
                                                    <p>{post.id}</p>
                                                </div>

                                            </div>

                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
            }
        </>
    )
}

export default Home