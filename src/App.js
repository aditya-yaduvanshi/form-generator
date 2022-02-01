import React from "react";
import {Layout, Typography, Row, Col} from "antd";
import {Content} from "antd/lib/layout/layout";
import {Link, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import {Response, CreateForm, FillForm} from "./pages";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Layout
          style={{
            minHeight: "100vh",
            paddingBottom: "100px",
            backgroundColor: "#FFF5",
          }}
        >
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "gray",
              }}
            >
              <Link to="/">
                <Typography.Title
                  level={3}
                  style={{
                    color: "white",
                    marginBottom: "5px",
                    display: "inline-block",
                  }}
                >
                  Formsheat
                </Typography.Title>
              </Link>
            </Col>
          </Row>
          <Content style={{position: "relative"}}>
            <Routes>
              <Route index path="/" element={<CreateForm />} />
              <Route path="/response/:id" element={<Response />} />
              <Route path="/form/:id" element={<FillForm />} />
              <Route
                path="*"
                element={
                  <Typography.Title
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%)",
                    }}
                  >
                    404 NOT FOUND
                  </Typography.Title>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </React.StrictMode>
  );
}

export default App;
