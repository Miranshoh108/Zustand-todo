import { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  Input,
  Progress,
  Spin,
  List,
  Typography,
} from "antd";
import { useTodoStore } from "../store/todoStore";
// import EditTodo from "./EditTodo";

const TodoList = () => {
  const {
    todos,
    loading,
    fetchTodos,
    updateTodo,
    deleteTodo,
    search,
    setSearch,
    editTodo,
  } = useTodoStore();

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const filtered = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const progress =
    (filtered.filter((t) => t.completed).length / filtered.length) * 100 || 0;

  return (
    <div>
      <Input
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="large"
        style={{ marginBottom: 20 }}
      />

      <Progress percent={Math.round(progress)} style={{ marginBottom: 20 }} />

      {loading ? (
        <Spin tip="Loading todos..." />
      ) : (
        <List
          dataSource={filtered}
          renderItem={(todo) => (
            <List.Item
              key={todo.id}
              actions={[
                editId === todo.id ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => {
                        editTodo(todo.id, editText); // save the edit
                        setEditId(null);
                      }}
                    >
                      Save
                    </Button>
                    <Button onClick={() => setEditId(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button
                    type="link"
                    onClick={() => {
                      setEditId(todo.id);
                      setEditText(todo.title);
                    }}
                  >
                    Edit
                  </Button>
                ),
                <Button type="link" danger onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>,
              ]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, !todo.completed)}
                />
                {editId === todo.id ? (
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onPressEnter={() => {
                      editTodo(todo.id, editText);
                      setEditId(null);
                    }}
                    size="middle"
                    style={{ flex: 1 }}
                  />
                ) : (
                  <Typography.Text
                    delete={todo.completed}
                    style={{ flex: 1, fontSize: 16 }}
                  >
                    {todo.title}
                  </Typography.Text>
                )}
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TodoList;
