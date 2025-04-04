import { Layout, Typography } from "antd";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header style={{ background: "#1890ff", padding: "0 20px" }}>
        <Title
          level={3}
          style={{ color: "#fff", lineHeight: "64px", margin: 0 }}
        >
          Zustand Todo App
        </Title>
      </Header>
      <Content style={{ padding: 20 }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <TodoForm />
          <TodoList />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
