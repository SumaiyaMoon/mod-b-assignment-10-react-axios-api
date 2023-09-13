import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Project(){
    type dataListProps={
        postId: number,
        id: number,
        body: string,
        name: string,
        email: string,
    }
    const [listData, setListData] = useState<dataListProps[]>([])

    const navigate = useNavigate();

    const deletePost = (id: any) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          console.log("Post Deleted Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    let getData = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          setListData([...res.data]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      getData();
    }, []);
        return(
            <>
     <div>
        <Typography variant="h2">Projects</Typography>
        <button className="btn btn-success"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add
        </button>
        {listData &&
          Array.isArray(listData) &&
          listData.length > 0 &&
          listData.map((x: any, i: any) => (
            <Paper className="p-2 m-3 border bg-warning-subtle rounded" key={i}>
              <h2>{x.title}</h2>
              <p>{x.body}</p>
              <p>{x.userId}</p>
              <IconButton
                onClick={() => deletePost(x.id)}
                color="error"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  navigate(`/add/${x.id}`);
                }}
                color="primary"
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>
            </Paper>
          ))}
      </div>
            </>
        )
    }