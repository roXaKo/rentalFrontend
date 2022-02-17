import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movie from "./routes/movies";
import NewMovie from "./routes/newMovie";
import Customers from "./routes/customers";
import Rentals from "./routes/rentals";
import MovieDetails from "./routes/movieDetails";
import NotFound from "./routes/notFound";
import Register from "./routes/register";
import Logout from "./routes/logout";
import { getUser } from "./services/authService";
import NavBar from "./components/navBar";
import { RequireAuth } from "./components/common/requireAuth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = getUser();
  const routes = ["movies", "customers", "rentals", "register"];
  const props = {
    location: useLocation(),
    navigate: useNavigate(),
    params: useParams(),
    routes,
    user,
  };

  return (
    <div>
      <ToastContainer />
      <NavBar {...props} />
      <Routes >
        <Route path="/logout" element={<Logout {...props} />} />
        <Route path="/movies" element={<Movie {...props} />} />
        <Route element={<RequireAuth />}>
          <Route path="/movies/new" element={<NewMovie {...props} />} />
          <Route path="/movies/:id" element={<MovieDetails {...props} />} />
        </Route>
        <Route path="/customers" element={<Customers {...props} />} />
        <Route path="/rentals" element={<Rentals {...props} />} />
        <Route path="/register" element={<Register {...props} />} />
        <Route path="/" element={<Movie {...props} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
