import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice";
import { Avatar, Badge, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LoginIcon from '@mui/icons-material/Login';
import { Logout } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userstate);

  return (
    <>
      <Navbar style={{ backgroundColor: "#B08EAD" }} variant="light">
        <Container>
          <Navbar.Brand
            style={{
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "800",
              lineHeight: "30px",
              fontSize: "28px",
            }}
            as={Link}
            to="/"
          >
            ECOM
          </Navbar.Brand>
          <Nav className="ms-auto">
            
            <Nav.Link
              style={{ color: "white" }}
              className="mx-1"
              href="#features"
            >
               <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon/>
                </Badge>
            </Nav.Link>
            {!user && (
              <Nav.Link
                style={{ color: "white" }}
                as={Link}
                className="mx-1"
                to="/login"
              >
                <Button variant="contained" size="small " startIcon={<LoginIcon />}>Login</Button>
              </Nav.Link>
            )}
            {user && (
              <>
                <Nav.Link
                style={{ color: "white" }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                className="mx-3"
              >
                <Button variant="contained" size="small" startIcon={<Logout />}>Logout</Button>
              </Nav.Link>
              <Avatar sx={{
                bgcolor : "crimson"
              }}>{
                user.username.split(" ")[0].charAt(0).toUpperCase() 
                
                }</Avatar>
              </>
            )}

            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;