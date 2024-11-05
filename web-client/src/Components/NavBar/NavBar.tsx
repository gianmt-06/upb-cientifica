import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
// import { Menu, useContextMenu } from "react-contexify";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { GrStorage } from "react-icons/gr";
import { Auth } from "../../Models/Authentication";
import { FileModel } from "../../Models/FileModel";
import { useState } from "preact/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  CounterState,
  setIsAdmin,
  setUsedStorage,
} from "../../stores/UserSlice";
import toast from "react-hot-toast";

const OffcanvasExample = () => {
  const expand = "lg";
  // const [usedStorage, setUsedStorage] = useState(0);
  const navigate = useNavigate();

  const [maxStorage, setMaxStorage] = useState(0);

  const [isLogged, setIsLogged] = useState(false);

  const dispatch = useDispatch();
  const isAdmin = useSelector((state: CounterState) => state.isAdmin);
  const usedStorage = useSelector((state: CounterState) => state.usedStorage);

  new Auth().validate().then((value) => {
    setIsLogged(value.logged);    
    dispatch(setIsAdmin(value.role === "admin"));
  });

  new FileModel().getStorage().then((value) => {
    setMaxStorage(value.maxStorage);
    dispatch(setUsedStorage(value.usedStorage));
  });

  const logout = () => {
    new Auth()
      .logout()
      .then((success) => {
        if (success) {
          toast.success("Sesión cerrada con éxito");
          navigate("/");
        } else {
          toast.error("No es posible cerrar la sesión, inténtalo nuevamente");
        }
      })
      .catch((_err) => {
        toast.error("Ups! Algo salió mal");
      });
  };

  return (
    <Navbar expand={expand} className="navbar ">
      <Container className={"navbar-container"} fluid>
        <Navbar.Brand href="/" className={"brand"}>
          <img
            src="/assets/upb-cientifica-crop.webp"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />

          <span className="app-name-title">UPB-CIENTIFICA</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 links-container"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!isAdmin ? (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/album">Album</Nav.Link>
                <Nav.Link href="/shared">Shared</Nav.Link>
                {/* <Nav.Link href="/streaming">Streaming</Nav.Link> */}
                <Nav.Link href="/cluster">Cluster</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/register">Create User</Nav.Link>
            )}

            {/* <Link to={"/home"} className={"link"}>Home</Link>
            <Link to={"/album"}>Album</Link>
            <Link to={"/streaming"}>Streaming</Link>
            <Link to={"/cluster"}>Cluster</Link> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <div className="auth-container">
            {/* <Link to="/login" className="login">
              <FaUserAstronaut  size={17}/>
              <span className={"login-span"}>Log in</span>
              </Link> */}

            {isLogged ? (
              <>
                {!isAdmin && (
                  <div className="storage">
                    <GrStorage size={20} color="grey" />
                    <span className="storage-percentaje">
                      {((usedStorage * 100) / maxStorage).toFixed(3)}%
                    </span>
                    <span className="storage-mb">
                      {usedStorage.toFixed(3)}mb / {maxStorage}mb
                    </span>
                  </div>
                )}

                <Link to="/home" onClick={() => logout()} className="login">
                  <IoLogOutOutline size={20} />
                  <span>Log out</span>
                </Link>
              </>
            ) : (
              <Link to="/login" className="login signup-btn">
                <span>Log in</span>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default OffcanvasExample;
