import { DefaultLayout } from 'layouts/DefaultLayout';
import { Contribute } from 'pages/Contribute';
import { PlinkoGamePage } from 'pages/Games/Plinko';
import { Gifts } from 'pages/Gifts';
import { LoginPage } from 'pages/Login';
import { ScoreBoardPage } from 'pages/ScoreBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated import

import { NotFound } from './components/NotFound';
import { RequireAuth } from './components/RequireAuth';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="scoreboard" element={<ScoreBoardPage />} />
          <Route path="plinko" element={<RequireAuth><PlinkoGamePage /></RequireAuth>} />
          <Route path="gifts" element={<RequireAuth><Gifts /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
