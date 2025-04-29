import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { supabase } from "./api/supabaseClient.js";
import { setUser } from "./redux/slices/userSlice.js";
import MixpanelService from "./utils/mixpanel.js";
import { routes } from "./routes.jsx";
import { Toaster } from "react-hot-toast";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const MixpanelTracker = () => {
  const { user_id, email, name } = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    if (user_id && email && name) {
      MixpanelService.identifyUser(user_id, email, name);
    }

    // Get the current route name
    const currentRoute = routes.find(route => {
      if (route.path === location.pathname) return true;
      if (route.children) {
        return route.children.some(child => {
          if (child.path === location.pathname) return true;
          if (child.path?.includes(':')) {
            const pattern = new RegExp('^' + route.path + child.path.replace(/:[^/]+/g, '[^/]+') + '$');
            return pattern.test(location.pathname);
          }
          return false;
        });
      }
      return false;
    });

    if (currentRoute) {
      MixpanelService.trackPageView(currentRoute.name);
    }
  }, [location]);

  return null;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, email, full_name, plugin_installed_at')
          .eq('email', user.email)
          .single();

        if (userData) {
          const capitalizeWords = (str) =>
            str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
          
          const initialsFromName = userData.full_name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();

          const { data: teamData } = await supabase
            .from("teams")
            .select("id, name")
            .contains("user_ids", [userData.id])
            .single();
          
          if (teamData) {
            dispatch(setUser({
              user_id: userData.id,
              email: userData.email,
              name: capitalizeWords(userData.full_name),
              initials: initialsFromName,
              team_id: teamData.id, 
              team_name: teamData.name,
              plugin_installed_at: !!userData.plugin_installed_at
            }));
          }
        }
      }
    };

    getUserData();
  }, []);

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          index={route.index}
        />
      );
    });
  };

  return (
    <>
      <MixpanelTracker />
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {renderRoutes(routes)}
      </Routes>
    </>
  );
}

export default App;