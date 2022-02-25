import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movie from "./routes/Movies/movies";
import NewMovie from "./routes/newMovie";
import Customers from "./routes/Customers/Customers";
import Rentals from "./routes/Rentals/rentals";
import MovieDetails from "./routes/movieDetails";
import NotFound from "./routes/notFound";
import Register from "./routes/register";
import Logout from "./routes/logout";
import { getUser } from "./services/authService";
import NavBar from "./components/navBar";
import { RequireAuth } from "./components/commun/requireAuth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import CustomersDetails from "./routes/CustomersDetails";
import RentalDetails from "./routes/RentalDetails";
import NewRental from "./routes/NewRental";
import CustomersProfile from "./routes/CustomersProfile/CustomersProfile";
import Me from "./routes/Me";
import Footer from "./components/Footer";

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
    <div >
      <ToastContainer />
      <NavBar {...props} />
      <div id="routes">
      <Routes>
        <Route path="/logout" element={<Logout {...props} />} />
        <Route element={<RequireAuth />}>
          <Route path="/movies/new" element={<NewMovie {...props} />} />
          <Route path="/movies/:id" element={<MovieDetails {...props} />} />
          <Route path="/customers/:id" element={<CustomersDetails />} />
          <Route path="/customers/new" element={<CustomersDetails />} />
          <Route path="/rentals/:id" element={<RentalDetails />} />
          <Route path="/rentals" element={<Rentals {...props} />} />
          <Route path="/customers" element={<Customers {...props} />} />
          <Route path="/rentals/new" element={<NewRental />} />
          <Route path="/:name" element={<Me/>} />
        </Route>
        <Route path="/customers/profile/:id" element={<CustomersProfile props={""}/>} />
        <Route path="/movies" element={<Movie {...props} />} />
        <Route path="/register" element={<Register {...props} />} />
        <Route path="/" element={<Movie {...props} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
