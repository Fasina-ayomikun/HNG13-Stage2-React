import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, isAuthed } from "../../utils/auth";
import "./auth.css";
import Header from "../../components/Header";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthed()) nav("/dashboard", { replace: true });

  function validate() {
    const error = {};
    if (!form.email.trim()) error.email = "Email is required.";
    else if (!emailRe.test(form.email))
      error.email = "Enter a valid email (name@example.com).";
    if (!form.password.trim()) error.password = "Password is required.";
    return error;
  }

  function onChange(ev) {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const error = validate();
    setErrors(error);
    if (Object.keys(error).length) {
      setToast("Invalid credentials. Please check the errors.");
      setTimeout(() => setToast(""), 2200);
      return;
    }

    login(form.email);
    nav("/dashboard", { replace: true });
  }

  return (
    <section>
      <Header />
      <div className='auth-wrap'>
        <form
          className='auth-card'
          onSubmit={onSubmit}
          noValidate
          aria-labelledby='login-title'
        >
          <h1 id='login-title' className='auth-title'>
            Login
          </h1>
          <div className='auth-field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={form.email}
              onChange={onChange}
              aria-describedby={errors.email ? "email-err" : undefined}
            />
            {errors.email && (
              <p id='email-err' className='error'>
                {errors.email}
              </p>
            )}
          </div>
          <div className='auth-field'>
            <label htmlFor='password'>Password</label>
            <div className='password-wrap'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                autoComplete='current-password'
                required
                value={form.password}
                onChange={onChange}
                aria-describedby={errors.password ? "password-err" : undefined}
              />
              <button
                type='button'
                className='toggle-pass'
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p id='password-err' className='error'>
                {errors.password}
              </p>
            )}
          </div>

          <div className='auth-actions'>
            <button
              className='btn btn-primary'
              type='submit'
              aria-label='Sign in'
            >
              Sign In
            </button>
            <Link
              className='btn btn-ghost'
              to='/auth/signup'
              aria-label='Create a new account'
            >
              Create account
            </Link>
          </div>
        </form>

        {toast && (
          <div className='toast' role='status' aria-live='polite'>
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
