import { gql, query, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const App = () => {
  const [title, setTitle] = useState("");
  const [id, setTodoId] = useState(null);
  const [editTodo, setEditTodo] = useState(false);
  const { loading, error, data } = useQuery(GetTodoQuery);
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
  const editButtonHandeler = (id,title) => {
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
  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Error..</h1>;
  return (
    <Container>
      <Typography align="center" variant="h3">
        Todo App
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
                <IconButton onClick={() => editButtonHandeler(item?.id,item?.title)}>
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
mutation DeteteTodo($id:Int!) {
  deleteTodo(id:$id) {
    message
  }
}
`;
export default App;
