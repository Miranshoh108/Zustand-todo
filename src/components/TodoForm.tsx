import { Input, Button, message, Form } from "antd";
import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleAdd = () => {
    if (!title.trim()) {
      message.warning("Please enter a todo!");
      return;
    }
    addTodo(title);
    message.success("Todo added successfully!");
    setTitle(""); // Agar so'zlarni inputda qolishini xohlasangiz, bu qatordan voz keching.
  };

  return (
    <Form layout="inline" style={{ marginBottom: 20 }}>
      <Form.Item style={{ flex: 1 }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new todo..."
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleAdd} size="large">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
