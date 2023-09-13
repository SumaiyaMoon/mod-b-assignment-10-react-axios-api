
import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddProject() {
    const params = useParams();
    type dataListProps = {
        postId: number,
        id: number,
        body: string,
        name: string,
        email: string,
    }
    const [singlePostData, setSinglePostData] = useState({} as dataListProps)
    let getSingleData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
            .then((res) => {
                console.log(res.data)
                setSinglePostData({ ...res.data })
                // console.log(singlePostData)
            }).catch((err) => {
                console.log(err)

            })
    }
    // useEffect(() => {
    //     getSingleData();
    // }, [])
    // getSingleData(); //getting data directly

let updatePost =()=>{
    axios.put(`https://jsonplaceholder.typicode.com/comments/${params.id}`,singlePostData).then(
        (res)=>{
            console.log(res.data)
        }
    ).catch((err)=>{
        console.log(err)
    })
}
let submitPost =()=>{
singlePostData.postId =11

    axios.post(`https://jsonplaceholder.typicode.com/comments/${params.id}`,singlePostData).then(
        (res)=>{
            console.log(res.data)
        }
    ).catch((err)=>{
        console.log(err)
    })
}

useEffect(() => {
    if (params.id) {
      getSingleData();
    }
  }, []);

    return (
        <>
            <Typography>Edit or Submit Post</Typography>

            <Paper className="p-2 m-3 bg-warning-subtle rounded">


                <input className="m-2 p-2" value={singlePostData.name ?? ""} placeholder="name" onChange={(e) => setSinglePostData({ ...singlePostData, name: e.target.value })} /><br/>
                <textarea className="m-2 p-2" rows={5} cols={25} value={singlePostData.body ?? ""} placeholder="body" onChange={(e) => setSinglePostData({ ...singlePostData, body: e.target.value })} /><br/>

                {params.id ? (
                <button className="btn btn-success" onClick={updatePost}>Update</button>
                ) : (
                <button className="btn btn-success"  onClick={submitPost}>Add</button>
                )}
            </Paper>
        </>
    )
}