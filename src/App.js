import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import {Link, Route, Routes} from "react-router-dom";
import {ShowForm, CreateForm, FillForm, MyForm} from "./pages";

function App() {
  return (
    <>
      <Layout>
        <Header>
          <Link to="/">Create</Link>
          <Link to="show/:id">Show</Link>
          <Link to="fill/:id">Fill</Link>
        </Header>
        <Content>
          <Routes>
            <Route index path="/" element={<MyForm/>} />
            <Route path="create" element={<CreateForm/>} />
            <Route path="show/:id" element={<ShowForm/>} />
            <Route path="fill/:id" element={<FillForm/>} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
}

export default App;
