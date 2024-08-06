import "../../styles/Eojin/perform_readyRequest.css";
import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import axios from 'axios';

const ReadyRequest = ({ preStep, nextStep }) => {
    const [request, setRequest] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = 'http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081';
            const showId = 1;
            const endpoint = `/performer/${showId}/prepare`;

            // const token = localStorage.getItem('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjMyMDg3MDEzIiwiZXhwIjoxNzIyOTMwODI1fQ.a06BQyKx1BR1gh8uSJJ9VhoUnpUAAfHTQKQdJD3H0r7pNQwZh3zmz5DW8v-Sj5WV-4cQz2UJ8lU7i7igJVWgIg');

            try {
                const response = await axios.get(apiUrl + endpoint, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjMyMDg3MDEzIiwiZXhwIjoxNzIyOTMyNDE5fQ.SObShaA7p64yXuex_ue5yudQdfTz9YT7l5MyCbjbu-NExdi4mhaB-q5FX2dsuRrfZb4FhqDIOFZNLJbxz94UQA',
                    }
                });
                setRequest(response.data.request); // assuming response.data has the request field
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ReadyRequest">
            <div className="Request_content">
                <h4>요청사항</h4>
                <p>공연자가 추가적으로 요청한 사항입니다.</p>
                <div className="Request">
                    <p>{request}</p>
                </div>
            </div>
            <div className="Request_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    );
};

export default ReadyRequest;

