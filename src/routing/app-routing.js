import { lazy } from 'react';

export const Home = () => lazy(() => import('../App'));
export const Layout = () => lazy(() => import('../components/layout/Layout'));
export const Login = () => lazy(() => import('../components/Auth/Login'));
export const AddEditBehaviour = () => lazy(() => import('../components/BehaviourEditor/AddEditBehaviour/AddEditBehaviour'));
export const Contacts = () => lazy(() => import('../components/contacts/Contacts'));
export const LoginVerification = () => lazy(() => import('../components/Auth/Login Verification/LoginVerification'));
