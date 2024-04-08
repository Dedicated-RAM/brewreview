import fbconfig from './firebase/FirebaseConfig';
import {initializeApp} from 'firebase/app';

const app = initializeApp(fbconfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
