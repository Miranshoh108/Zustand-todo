import { useState } from "react";
import { Input, Button } from "antd";
import { useTodoStore } from "../store/todoStore";

interface Props {
  todoId: string;
  currentTitle: string;
  onClose: () => void;
}

const EditTodo = ({ todoId, currentTitle, onClose }: Props) => {
  const [title, setTitle] = useState(currentTitle);
  const editTodo = useTodoStore((s) => s.editTodo);

  const handleUpdate = async () => {
    await editTodo(todoId, title);
    onClose();
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1 }}
      />
      <Button type="primary" onClick={handleUpdate}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};

export default EditTodo;
