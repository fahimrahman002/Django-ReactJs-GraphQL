import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const App = () => {
  const [title, setTitle] = useState("");
  const [id, setTodoId] = useState(null);
  const [editTodo, setEditTodo] = useState(false);
  const { loading, error, data } = useQuery(GetTodoQuery);
  const { loading: userloding, error: usererror, data: userdata } = useQuery(
    GET_USER_DATA
  );
  const [createTodo] = useMutation(AddTodoMutation, {
    onCompleted(data) {
      setTitle("");
    },
    refetchQueries: [{ query: GetTodoQuery }],
  });
  const [updateTodo] = useMutation(UpdateTodoMutation, {
    onCompleted(data) {
      setTitle("");
      setEditTodo(false)
    },
    refetchQueries: [{ query: GetTodoQuery }],
  });
  const [deleteTodo] = useMutation(DeleteTodoMutation, {
    onCompleted(data) {
      setTitle("");
      setEditTodo(false)
    },
    refetchQueries: [{ query: GetTodoQuery }],
  });
  const addNewTodo = () => {
    createTodo({ variables: { title: title } });
  };
  const editButtonHandler = (id,title) => {
    setTitle(title);
    setEditTodo(true);
    setTodoId(id);
  };
  const deleteButtonClick=(id)=>{
    deleteTodo({variables:{id}})
  }
  const updateATodo=()=>{
    updateTodo({variables:{id,title}});
  }
  const logoutNow = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Error..</h1>;
  return (
    <Container>
       <Typography align="center" variant="h3">
        Welcome to Todo App "{userdata?.user?.username}"
        <Button color="secondary" variant="contained" onClick={logoutNow}>
          Logout
        </Button>
      </Typography>
      <Box
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label={editTodo ? "Edit Todo" : "Add Todo.."}
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {editTodo ? (
          <Button 
          onClick={updateATodo}
          variant="contained" color="primary">
            Edit
          </Button>
        ) : (
          <Button
            onClick={addNewTodo}
            disabled={!title}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        )}
      </Box>
      <Box
        component="div"
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <List>
          {data?.todos?.map((item, i) => (
            <ListItem button key={i}>
              <ListItemIcon>
                <Avatar
                  style={{
                    backgroundColor: "blue",
                  }}
                >
                  {i + 1}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => editButtonHandler(item?.id,item?.title)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => deleteButtonClick(item?.id)} color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};
const GetTodoQuery = gql`
  {
    todos {
      id
      title
      date
    }
  }
`;
const AddTodoMutation = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      todo {
        id
        title
        date
      }
    }
  }
`;
const UpdateTodoMutation=gql`
mutation UpdateTodo($id:Int!,$title: String!) {
  updateTodo(id:$id,title: $title) {
    todo {
      id
      title
      date
    }
  }
}
`;
const DeleteTodoMutation=gql`
mutation DeleteTodo($id:Int!) {
  deleteTodo(id:$id) {
    message
  }
}
`;
const GET_USER_DATA = gql`
  {
    user {
      id
      username
    }
  }
`;
export default App;
