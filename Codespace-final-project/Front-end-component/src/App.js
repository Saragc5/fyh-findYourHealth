import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Web/Home/Home';
import Blog from './Pages/Web/Blog/Blog';
import AboutUs from './Pages/Web/AboutUs/AboutUs';
import Contact from './Pages/Web/Contact/Contact';
import NotFound from './Pages/Web/NotFound/NotFound';
import LoginForm from './Pages/Web/Login/LoginForm';
import RegisterForm from './Pages/Web/Register/RegisterForm'
import Rigths from './Pages/Web/FooterPages/Rigths';
import Cookies from './Pages/Web/FooterPages/Cookies';
import PrivacyPolicy from './Pages/Web/FooterPages/PrivacyPolicy';
import TermsAndConditions from './Pages/Web/FooterPages/TermsConditions';
import Article from './Components/ArticlesBlog/Article';
import Professionals from './Pages/Web/Professionals/Professionals';
import ProfessionalUser from './Components/ProfessionalUser/ProfessionalUser';
import LandingPageRegister from './Pages/Web/LandingPages/LandingPageRegister';
import LandingPageContact from './Pages/Web/LandingPages/LandingPageContact';
import ProfileClient from './Pages/Web/Profile/Profiles/ProfileClient';
import ProfileProf from './Pages/Web/Profile/Profiles/ProfileProf';
import ProfileAdmin from './Pages/Web/Profile/Profiles/ProfileAdmin';
import NewBlogArticlePage from './Pages/Web/NewBlogArticlePage/NewBlogArticlePage'
import LandingPageDelete from './Pages/Web/LandingPages/LandingPageDelete';
import LandingPagePublishedNewArticle from './Pages/Web/LandingPages/LandingPagePublishedNewArticle';
import LandingPageUserNotAuth from './Pages/Web/LandingPages/LandingPageUserNotAuth';
import { AuthProvider } from './Components/AuthContext';
import ModifyPassword from './Pages/Web/ModifyPassword/ModifyPassword';
import DeleteProfile from './Pages/Web/DeleteProfile/DeleteProfile';



function App() {
  
  return (  
    <div className="App">  

      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} /> 
         
          <Route path="login" element={<LoginForm />} /> 
          <Route path="profile/client" element={<AuthProvider><ProfileClient /></AuthProvider>} /> 
          <Route path="profile/prof" element={<AuthProvider><ProfileProf /></AuthProvider>} />
          <Route path="profile/admin" element={<AuthProvider><ProfileAdmin /></AuthProvider>} />
          <Route path="users" element={<AuthProvider ><Professionals /></AuthProvider>} />
          <Route path="users/:id" element={<AuthProvider><ProfessionalUser /></AuthProvider>} /> 
          <Route path="modifyPassword" element={<AuthProvider><ModifyPassword/></AuthProvider>} />          
          <Route path="blog/newBlogArticle" element={<AuthProvider><NewBlogArticlePage/></AuthProvider>}/>          
          <Route path="sureDelete" element={<AuthProvider><DeleteProfile/></AuthProvider>} />  
         
          <Route path="landingPublished" element={<LandingPagePublishedNewArticle/>} />
          <Route path="landingNotAuth" element={<LandingPageUserNotAuth/>} />
          <Route path="users/register" element={<RegisterForm />} />
          <Route path="landingRegister" element={<LandingPageRegister/>} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id/*" element={<Article />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="landingContact" element={<LandingPageContact />} />
          <Route path="landingDelete" element={<LandingPageDelete />} />
          <Route path="*" element={<NotFound />} />
          <Route path="rigths" element={<Rigths />} />r
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="termsandconditions" element={<TermsAndConditions />} />
          <Route path="cookies" element={<Cookies />} />
        </Route>  
      </Routes>       
    </div>
  );
}

export default App;
